"use client";
import { makeAutoObservable } from "mobx";
import Bird from "@/state/objects/bird";

import { interval, Timer } from "d3-timer";
import Pipe from "@/state/objects/pipe";
import InputUtility, { KEY } from "@/state/utility/inputUtility";
import { createContext } from "react";

export const BIRD_BOARD_WIDTH = 600;
export const BIRD_BOARD_HEIGHT = 400;
const FLAP_LIFT = 5.2;

interface PipeColumn {
  NorthPipe: Pipe;
  SouthPipe: Pipe;
  scored: boolean;
}

class BirdStore {
  Bird: Bird = new Bird(30, 300);

  Pipe: Pipe = new Pipe(0, 0);

  PipeList: PipeColumn[] = [
    {
      NorthPipe: new Pipe(300, 0),
      SouthPipe: new Pipe(300, 350),
      scored: false,
    },
  ];

  timer: Timer | null = null;

  input = new InputUtility();

  gameStart = false;

  gameOver = false;

  score = 0;

  bestScore = 0;

  status = "Press start, then click or tap to flap.";

  gap = 90;

  constructor() {
    makeAutoObservable(this);
    this.initial();
  }

  Reset = () => {
    this.timer?.stop();
    this.timer = null;
    this.input.dispose();
    this.initial();
    this.status = "Game reset. Press start when ready.";
  };

  startGameLoop(target: Element) {
    if (!this.gameStart) {
      this.gameStart = true;
      this.gameOver = false;
      this.status = "Fly clean. Avoid the pipes.";
      this.input.listen(target);
      this.timer = interval(() => this.gameStep(), 1000 / 60); // ~16.67ms
    }
  }

  initial() {
    this.PipeList.length = 1;
    this.PipeList[0].NorthPipe.x = 300;
    this.PipeList[0].NorthPipe.y = 0;
    this.PipeList[0].SouthPipe.x = 300;
    this.PipeList[0].SouthPipe.y = 350;
    this.PipeList[0].scored = false;
    this.Bird.x = 10;
    this.Bird.y = 300;
    this.Bird.rotation = 0;
    this.gameStart = false;
    this.gameOver = false;
    this.score = 0;
    this.input.reset();
  }

  stopGame = () => {
    this.timer?.stop();
    this.timer = null;
    this.gameStart = false;
    this.gameOver = true;
    this.bestScore = Math.max(this.bestScore, this.score);
    this.status = `Crashed out on score ${this.score}. Press start to try again.`;
    this.input.dispose();
  };

  unMountGame = () => {
    if (this.timer) {
      this.timer.stop();
      this.timer = null;
    }

    this.input.dispose();
  };

  protected MovePipe = (index: number, x: number) => {
    this.PipeList[index].SouthPipe.x -= x;
    this.PipeList[index].NorthPipe.x -= x;
  };

  protected setPipe = (x = 600) => {
    // set random with max height
    const random = Math.floor(Math.random() * 190);
    this.PipeList.push({
      NorthPipe: new Pipe(x, -random),
      SouthPipe: new Pipe(x, -random + this.Pipe.height + this.gap),
      scored: false,
    });
  };

  protected MoveBird = (x: number, y: number) => {
    this.Bird.x += x;
    this.Bird.y -= y;
    this.Bird.rotation = y <= 2 ? y : 2;
  };

  // draw frames for game, called in interval
  protected gameStep = () => {
    const { keys, speed } = this.input;
    const gravity = 2;
    // check for input

    // space key to flap bird, incease speed to offset gravity
    if (keys[KEY.SPACE] || keys[KEY.mouseClick]) {
      this.input.velY = Math.min(speed + gravity * 2, FLAP_LIFT);
      this.input.keys[KEY.SPACE] = false;
      this.input.keys[KEY.mouseClick] = false;
    }

    // set bird velocity
    this.input.velY *= this.input.friction;
    this.input.velX *= this.input.friction;

    // prevent bird from going out of bounds
    if (this.Bird.y <= 0) {
      this.Bird.y = 0;
    }

    this.MoveBird(this.input.velX, this.input.velY - gravity);

    // check each pipe in array for bird crash and pipe movement
    this.PipeList.forEach((PipeColumn, index) => {
      // move pipe
      this.MovePipe(index, 3);

      if (!PipeColumn.scored && PipeColumn.NorthPipe.x + PipeColumn.NorthPipe.width < this.Bird.x) {
        PipeColumn.scored = true;
        this.score += 1;
        this.bestScore = Math.max(this.bestScore, this.score);
        this.status = `Flying. Score ${this.score}.`;
      }

      if (PipeColumn.NorthPipe.x + PipeColumn.NorthPipe.width <= 0) {
        // set new pipe Column
        this.setPipe();
        // delete out of bounds pipe Column
        this.PipeList.splice(0, 1);
      }

      // stop game if bird crashes

      // check one and two ensure bird is inside the pipes X axis

      const one = this.Bird.x + this.Bird.width >= PipeColumn.NorthPipe.x;
      const two = this.Bird.x <= PipeColumn.SouthPipe.x + PipeColumn.SouthPipe.width;

      // check if the bird collided with the topmost pipe
      const northCollide = this.Bird.y <= PipeColumn.NorthPipe.y + PipeColumn.NorthPipe.height;

      // check if the bird collided with the bottommost pipe
      const southCollide = this.Bird.y + this.Bird.height >= PipeColumn.SouthPipe.y;

      if (one && two && (northCollide || southCollide)) {
        this.stopGame();
      }

      if (this.Bird.y >= BIRD_BOARD_HEIGHT - this.Bird.height) {
        this.stopGame();
      }
    });
  };
}

export default createContext(new BirdStore());
