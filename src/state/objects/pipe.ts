import { makeAutoObservable } from "mobx";

export default class Pipe {
  height = 240;

  width = 50;
  x: number;

  y: number;

  rotation = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
