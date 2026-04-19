export const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  SPACE: 32,
  ENTER: 13,
  P: 80,
  mouseClick: 100,
};

export default class InputUtility {
  keys: boolean[] = [];

  private target: Element | null = null;

  velY = 0;

  velX = 0;

  readonly speed = 1;

  readonly friction = 0.95;

  /**
   *  add key listeners for input
   *
   * @memberof InputUtility
   */
  listen(target: Element) {
    this.dispose();
    this.target = target;
    target.addEventListener("pointerdown", this.handleBindMouse);
    target.addEventListener("pointerup", this.handleUnBindMouse);
    target.addEventListener("pointerleave", this.handleUnBindMouse);
    window.addEventListener("keydown", this.handleBindKeys);
    window.addEventListener("keyup", this.handleUnBindKeys);
  }

  /**
   *  remove key listeners for input
   *
   * @memberof InputUtility
   */
  dispose() {
    if (this.target) {
      this.target.removeEventListener("pointerdown", this.handleBindMouse);
      this.target.removeEventListener("pointerup", this.handleUnBindMouse);
      this.target.removeEventListener("pointerleave", this.handleUnBindMouse);
      this.target = null;
    }

    window.removeEventListener("keydown", this.handleBindKeys);
    window.removeEventListener("keyup", this.handleUnBindKeys);
  }

  reset() {
    this.velY = 0;
    this.velX = 0;
    this.keys = [];
  }

  private handleBindMouse = () => {
    this.keys[KEY.mouseClick] = true;
  };

  private handleUnBindMouse = () => {
    this.keys[KEY.mouseClick] = false;
  };

  private handleBindKeys = (e: KeyboardEvent) => {
    if (Object.values(KEY).includes(e.keyCode)) {
      e.preventDefault();
    }
    this.keys[e.keyCode] = true;
  };

  private handleUnBindKeys = (e: KeyboardEvent) => {
    e.preventDefault();
    this.keys[e.keyCode] = false;
  };
}
