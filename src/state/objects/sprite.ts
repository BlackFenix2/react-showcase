export default class Sprite {
  x: number;

  y: number;

  rotation: number;

  width: number;

  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }
}
