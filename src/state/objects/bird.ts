import { makeAutoObservable } from "mobx";
import Sprite from "./sprite";

export default class Bird {
  height = 30;

  width = 40;

  x: number;

  y: number;

  rotation: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
