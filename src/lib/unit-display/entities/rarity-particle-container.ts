import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseParticle from "./base-particle";
import BaseParticleContainer from "./base-particle-container";
import RarityParticle from "./rarity-particle";

export enum Assets {
  PARTICLE_WHITE = "2|rarity-particle_white",
  PARTICLE_GOLD = "2|rarity-particle_gold",
}

class RarityParticleContainer extends BaseParticleContainer {
  private readonly _width: number;
  private readonly _height: number;

  constructor(props: EntityProps) {
    super(props);

    if (props.layout.default.width === undefined) {
      throw new Error("Missing required layout parameter: [default.width]");
    }

    this._width = props.layout.default.width;

    if (props.layout.default.height === undefined) {
      throw new Error("Missing required layout parameter: [default.height]");
    }

    this._height = props.layout.default.height;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_RARITY"];
  }

  render(context: Context): void {
    const rarity = context.state.statistics.rarity;
    this.view.visible = rarity > 3;

    super.render(context);
  }

  protected _spawnParticle(context: Context): BaseParticle {
    const timeToLive = 90; // 1.5s

    const props = {
      layout: {
        default: {
          anchor: 0.5,
          position: {
            x: this._width * Math.random(),
            y: this._height * Math.random(),
          },
        },
      },
      tags: [],
      options: {
        velocityX: 0,
        velocityY: -(25 + 100 * Math.random()) / timeToLive,
        timeToLive,
      },
    };

    const particle = new RarityParticle(props);

    particle.view.texture =
      context.state.statistics.rarity === 4 ? getTexture(Assets.PARTICLE_WHITE) : getTexture(Assets.PARTICLE_GOLD);

    return particle;
  }
}

export default RarityParticleContainer;
