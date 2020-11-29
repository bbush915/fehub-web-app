import { Context, EntityProps } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  ICON = "2|icon_speech-bubble",
  ICON_PRESSED = "2|icon_speech-bubble_pressed",
}

class SpeechBubbleIcon extends BaseSprite {
  private readonly _initialY: number;

  private _shouldRender: boolean;
  private _isPressed: boolean;
  private _timer: number;

  constructor(props: EntityProps) {
    super(props);

    this._initialY = props.layout.default.position?.y ?? 0;

    this._shouldRender = false;
    this._isPressed = false;
    this._timer = 0;

    this.view.texture = getTexture(Assets.ICON);
  }

  set isPressed(value: boolean) {
    this._isPressed = value;

    this.view.texture = this._isPressed ? getTexture(Assets.ICON_PRESSED) : getTexture(Assets.ICON);

    if (this._isPressed) {
      this._shouldRender = true;
    } else {
      this._shouldRender = false;

      this.view.position.y = this._initialY;
      this._timer = 0;
    }
  }

  get alwaysRender(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    if (this._shouldRender) {
      this.view.position.y = this._initialY - 3 * (1 - Math.cos(this._timer));
      this._timer = (this._timer + 0.2) % (2 * Math.PI);
    }
  }
}

export default SpeechBubbleIcon;
