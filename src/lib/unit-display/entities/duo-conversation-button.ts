import { Context, EntityProps, MessageTypes } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  BUTTON = "2|button_duo-conversation",
  BUTTON_PRESSED = "2|button_duo-conversation_pressed",
}

class DuoConversationButton extends BaseSprite {
  constructor(props: EntityProps) {
    super(props);

    this.view.texture = getTexture(Assets.BUTTON);
    this.view.visible = false;

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

  get subscriptions(): MessageTypes[] {
    return ["SET_DUO_HERO"];
  }

  render(context: Context): void {
    const isDuoHero = context.state.hero.isDuoHero;
    this.view.visible = isDuoHero;
  }
}

export default DuoConversationButton;
