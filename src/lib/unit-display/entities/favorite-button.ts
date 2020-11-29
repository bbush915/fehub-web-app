import { Texture } from "pixi.js";

import { FavoriteMarks } from "types";
import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseContainer from "./base-container";
import BaseSprite from "./base-sprite";

enum Assets {
  BUTTON = "2|button",
  BUTTON_PRESSED = "2|button_pressed",
  MARK_NONE = "2|favorite-mark_none",
  MARK_1 = "2|favorite-mark_1",
  MARK_2 = "2|favorite-mark_2",
  MARK_3 = "2|favorite-mark_3",
  MARK_4 = "2|favorite-mark_4",
  MARK_5 = "2|favorite-mark_5",
  MARK_6 = "2|favorite-mark_6",
  MARK_7 = "2|favorite-mark_7",
  MARK_8 = "2|favorite-mark_8",
}

class FavoriteButton extends BaseContainer {
  private readonly _buttonLayer: BaseSprite;
  private readonly _favoriteMarkLayer: BaseSprite;

  constructor(props: EntityProps) {
    super(props);

    this._buttonLayer = new BaseSprite(props);
    this.view.addChild(this._buttonLayer.view);

    this._favoriteMarkLayer = new BaseSprite(props);
    this.view.addChild(this._favoriteMarkLayer.view);

    this._buttonLayer.view.texture = getTexture(Assets.BUTTON);
    this._favoriteMarkLayer.view.texture = getTexture(Assets.MARK_1);

    this.view.interactive = true;
    this.view.buttonMode = true;

    this.view.on("pointerdown", () => {
      this._buttonLayer.view.texture = getTexture(Assets.BUTTON_PRESSED);
    });

    this.view.on("pointerup", () => {
      this._buttonLayer.view.texture = getTexture(Assets.BUTTON);
    });

    this.view.on("pointerout", () => {
      this._buttonLayer.view.texture = getTexture(Assets.BUTTON);
    });
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_FAVORITE_MARK"];
  }

  render(context: Context): void {
    const favoriteMark = context.state.favoriteMark;
    this._favoriteMarkLayer.view.texture = this._getTexture(favoriteMark);
  }

  private _getTexture(favoriteMark: FavoriteMarks): Texture {
    switch (favoriteMark) {
      case FavoriteMarks.NONE: {
        return getTexture(Assets.MARK_NONE);
      }

      case FavoriteMarks.MARK_1: {
        return getTexture(Assets.MARK_1);
      }

      case FavoriteMarks.MARK_2: {
        return getTexture(Assets.MARK_2);
      }

      case FavoriteMarks.MARK_3: {
        return getTexture(Assets.MARK_3);
      }

      case FavoriteMarks.MARK_4: {
        return getTexture(Assets.MARK_4);
      }

      case FavoriteMarks.MARK_5: {
        return getTexture(Assets.MARK_5);
      }

      case FavoriteMarks.MARK_6: {
        return getTexture(Assets.MARK_6);
      }

      case FavoriteMarks.MARK_7: {
        return getTexture(Assets.MARK_7);
      }

      case FavoriteMarks.MARK_8: {
        return getTexture(Assets.MARK_8);
      }

      default: {
        throw new Error(`Unexpected favorite mark encountered: [${favoriteMark}]`);
      }
    }
  }
}

export default FavoriteButton;
