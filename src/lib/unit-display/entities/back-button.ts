import { EntityProps } from "../types";
import { getDefaultEntityProps } from "../utilities/entity-helpers";
import { getTexture } from "../utilities/texture-helpers";
import BaseContainer from "./base-container";
import BaseSprite from "./base-sprite";

enum Assets {
  BUTTON_1 = "2|button_back_1",
  BUTTON_2 = "2|button_back_2",
  BUTTON_PRESSED = "2|button_back_pressed",
}

class BackButton extends BaseContainer {
  private readonly _buttonLayer1: BaseSprite;
  private readonly _buttonLayer2: BaseSprite;

  private _isPressed: boolean;
  private _timer: number;

  constructor(props: EntityProps) {
    super(getDefaultEntityProps());

    this._isPressed = false;
    this._timer = 0;

    this._buttonLayer1 = new BaseSprite(props);
    this._buttonLayer1.view.texture = getTexture(Assets.BUTTON_1);

    this.children.push(this._buttonLayer1);
    this.view.addChild(this._buttonLayer1.view);

    this._buttonLayer2 = new BaseSprite(props);
    this._buttonLayer2.view.texture = getTexture(Assets.BUTTON_2);

    this.children.push(this._buttonLayer2);
    this.view.addChild(this._buttonLayer2.view);

    this.view.interactive = true;
    this.view.buttonMode = true;

    this.view.on("pointerdown", () => {
      this._isPressed = true;
      this._buttonLayer1.view.visible = false;
      this._buttonLayer2.view.texture = getTexture(Assets.BUTTON_PRESSED);
    });

    this.view.on("pointerup", () => {
      this._isPressed = false;
      this._buttonLayer1.view.visible = true;
      this._buttonLayer2.view.texture = getTexture(Assets.BUTTON_2);
    });

    this.view.on("pointerout", () => {
      this._isPressed = false;
      this._buttonLayer1.view.visible = true;
      this._buttonLayer2.view.texture = getTexture(Assets.BUTTON_2);
    });
  }

  get alwaysRender(): boolean {
    return true;
  }

  render(): void {
    if (this._isPressed) {
      this._buttonLayer2.view.alpha = 1;
    } else {
      this._buttonLayer2.view.alpha = 0.5 + 0.5 * Math.cos(this._timer);

      this._timer = (this._timer + 0.05) % (2 * Math.PI);
    }
  }
}

export default BackButton;
