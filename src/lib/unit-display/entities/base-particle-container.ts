import { Context, EntityProps, IEntity } from "../types";
import BaseContainer from "./base-container";
import BaseParticle from "./base-particle";

abstract class BaseParticleContainer extends BaseContainer implements IEntity {
  private readonly _spawnRate: number;

  private _timer: number;

  constructor(props: EntityProps) {
    super(props);

    if (props.options.spawnRate === undefined) {
      throw new Error("Missing required option: [spawnRate]");
    }

    this._spawnRate = props.options.spawnRate;

    this._timer = 0;
  }

  get alwaysRender(): boolean {
    return true;
  }

  render(context: Context): void {
    if (!this.view.visible) {
      this.children.splice(0);
      this.view.removeChildren();
    }

    this._timer += context.delta;

    if (this._timer > this._spawnRate) {
      this._timer = 0;

      const particle = this._spawnParticle(context);

      this.children.push(particle);
      this.view.addChild(particle.view);
    }

    const deadParticleIndices: number[] = [];

    for (let i = 0; i < this.children.length; i++) {
      const particle = this.children[i] as BaseParticle;

      particle.render(context);

      if (!particle.isAlive) {
        deadParticleIndices.push(i);
      }
    }

    for (const index of deadParticleIndices.reverse()) {
      this.view.removeChildAt(index);
      this.children.splice(index, 1);
    }
  }

  protected abstract _spawnParticle(context: Context): BaseParticle;
}

export default BaseParticleContainer;
