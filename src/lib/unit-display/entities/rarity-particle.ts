import { Context, EntityProps } from "../types";
import BaseParticle from "./base-particle";

class RarityParticle extends BaseParticle {
  constructor(props: EntityProps) {
    super(props);
  }

  render(context: Context): void {
    super.render(context);

    const t = this._timer / this._timeToLive;
    this.view.scale.set(3 * Math.sin(Math.PI * t));
  }
}

export default RarityParticle;
