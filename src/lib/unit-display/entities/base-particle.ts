import { Context, EntityProps } from "../types";
import BaseSprite from "./base-sprite";

class BaseParticle extends BaseSprite {
  private readonly _velocityX: number;
  private readonly _velocityY: number;

  protected readonly _timeToLive: number;

  protected _timer: number;

  constructor(props: EntityProps) {
    super(props);

    if (props.options.velocityX === undefined) {
      throw new Error("Missing required option: [velocityX]");
    }

    this._velocityX = props.options.velocityX;

    if (props.options.velocityY === undefined) {
      throw new Error("Missing required option: [velocityY]");
    }

    this._velocityY = props.options.velocityY;

    if (props.options.timeToLive === undefined) {
      throw new Error("Missing required option: [timeToLive]");
    }

    this._timeToLive = props.options.timeToLive;

    this._timer = 0;
  }

  get isAlive(): boolean {
    return this._timer < this._timeToLive;
  }

  render(context: Context): void {
    this._timer += context.delta;

    if (this._timer >= this._timeToLive) {
      this._timer = Math.min(this._timer, this._timeToLive);
      return;
    }

    this.view.position.x += context.delta * this._velocityX;
    this.view.position.y += context.delta * this._velocityY;
  }
}

export default BaseParticle;
