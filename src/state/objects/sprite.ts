import { makeAutoObservable } from "mobx";

export default class Sprite {
  x: number;

  y: number;

  rotation = 0;

  width = 0;

  height = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
