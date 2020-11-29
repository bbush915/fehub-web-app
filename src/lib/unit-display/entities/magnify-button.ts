import { EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  BUTTON = "2|button_magnify",
  BUTTON_PRESSED = "2|button_magnify_pressed",
}

class MagnifyButton extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);

    this.view.texture = getTexture(Assets.BUTTON);

    this.view.interactive = true;
    this.view.buttonMode = true;

    this.view.on("pointerdown", () => {
      this.view.texture = getTexture(Assets.BUTTON_PRESSED);
    });

    this.view.on("pointerup", () => {
      this.view.texture = getTexture(Assets.BUTTON);
    });

    this.view.on("pointerout", () => {
      this.view.texture = getTexture(Assets.BUTTON);
    });
  }
}

export default MagnifyButton;
