import { Texture } from "pixi.js";

import { Context, EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseNineSlicePlane from "./base-nine-slice-plane";

enum Assets {
  BLUE = "2|backdrop_blue",
  BUTTON = "2|backdrop_button",
  BUTTON_PRESSED = "2|backdrop_button_pressed",
  EMPTY = "2|backdrop_empty",
  EMPTY_PRESSED = "2|backdrop_empty_pressed",
  GREEN = "2|backdrop_green",
  PURPLE = "2|backdrop_purple",
  RED = "2|backdrop_red",
  WINDOW_BLUE = "2|backdrop_window_blue",
  YELLOW = "2|backdrop_yellow",
}

export enum BackdropVariants {
  BLUE = "blue",
  BUTTON = "button",
  BUTTON_PRESSED = "button_pressed",
  EMPTY = "empty",
  EMPTY_PRESSED = "empty_pressed",
  GREEN = "green",
  PURPLE = "purple",
  RED = "red",
  WINDOW_BLUE = "window_blue",
  YELLOW = "yellow",
}

class Backdrop extends BaseNineSlicePlane {
  private _variant: BackdropVariants;
  private _shouldRender: boolean;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.variant) {
      throw new Error("Missing required option: [variant]");
    }

    this._variant = props.options.variant;

    this._shouldRender = false;

    this.view.texture = this._getTexture(this._variant);

    if (this._variant === BackdropVariants.BUTTON) {
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

  get alwaysRender(): boolean {
    return true;
  }

  set variant(variant: BackdropVariants) {
    this._shouldRender = this._shouldRender || variant !== this._variant;
    this._variant = variant;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    if (this._shouldRender) {
      this._shouldRender = false;

      this.view.texture = this._getTexture(this._variant);
    }
  }

  private _getTexture(variant: BackdropVariants): Texture {
    switch (variant) {
      case BackdropVariants.BLUE: {
        return getTexture(Assets.BLUE);
      }

      case BackdropVariants.BUTTON: {
        return getTexture(Assets.BUTTON);
      }

      case BackdropVariants.EMPTY: {
        return getTexture(Assets.EMPTY);
      }

      case BackdropVariants.EMPTY_PRESSED: {
        return getTexture(Assets.EMPTY_PRESSED);
      }

      case BackdropVariants.GREEN: {
        return getTexture(Assets.GREEN);
      }

      case BackdropVariants.PURPLE: {
        return getTexture(Assets.PURPLE);
      }

      case BackdropVariants.RED: {
        return getTexture(Assets.RED);
      }

      case BackdropVariants.WINDOW_BLUE: {
        return getTexture(Assets.WINDOW_BLUE);
      }

      case BackdropVariants.YELLOW: {
        return getTexture(Assets.YELLOW);
      }

      default: {
        throw new Error(`Unexpected backdrop variant encountered: [${variant}]`);
      }
    }
  }
}

export default Backdrop;
