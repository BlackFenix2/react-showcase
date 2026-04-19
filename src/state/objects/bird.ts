import { makeAutoObservable } from "mobx";

export default class Bird {
  height = 30;

  width = 40;

  x: number;

  y: number;

  rotation = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
