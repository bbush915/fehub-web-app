import { Context, EntityProps, MessageTypes } from "../types";
import BaseText from "./base-text";

class VoiceActor extends BaseText {
  constructor(props: EntityProps) {
    super(props);
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_VOICE_ACTOR"];
  }

  render(context: Context): void {
    const voiceActor = context.state.hero.voiceActor;
    this.view.text = voiceActor;
  }
}

export default VoiceActor;
