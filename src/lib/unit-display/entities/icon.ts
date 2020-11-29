import { EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

class Icon extends BaseSprite {
  private readonly _asset: string;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.asset) {
      throw new Error("Missing required option: [asset]");
    }

    this._asset = props.options.asset;

    this.view.texture = getTexture(this._asset);
  }
}

export default Icon;
