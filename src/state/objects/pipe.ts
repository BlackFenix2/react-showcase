import { makeAutoObservable } from "mobx";
import Sprite from "./sprite";

export default class Pipe {
  height = 240;

  width = 50;
  x: number;

  y: number;

  rotation: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
