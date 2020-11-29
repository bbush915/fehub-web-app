import { EntityProps, IEntity } from "../types";
import Backdrop, { BackdropVariants } from "./backdrop";
import BaseContainer from "./base-container";
import BaseText from "./base-text";
import SpeechBubbleIcon from "./speech-bubble-icon";

class TapContainer extends BaseContainer {
  constructor(props: EntityProps) {
    super(props);

    this.view.interactive = true;
    this.view.buttonMode = true;

    this.view.on("pointerdown", () => {
      const backdrop = this._getChildByTag("tap-backdrop") as Backdrop;
      backdrop.variant = BackdropVariants.EMPTY_PRESSED;

      const speechBubble = this._getChildByTag("tap-speech-bubble") as SpeechBubbleIcon;
      speechBubble.isPressed = true;

      const text = this._getChildByTag("tap-text") as BaseText;
      text.view.text = "Speaking";

      setTimeout(() => {
        backdrop.variant = BackdropVariants.EMPTY;
        speechBubble.isPressed = false;
        text.view.text = "Tap!";
      }, 2.5 * 1000);
    });
  }

  private _getChildByTag(tag: string): IEntity {
    return this.children.find((x) => x.tags.includes(tag)) as IEntity;
  }
}

export default TapContainer;
