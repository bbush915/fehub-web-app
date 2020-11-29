import { Graphics } from "pixi.js";

import { EntityProps } from "../types";
import BaseContainer from "./base-container";

class ExperienceBar extends BaseContainer {
  constructor(props: EntityProps) {
    super(props);

    const graphics = new Graphics();

    graphics.beginFill(0x000000);

    graphics.drawRect(0, 0, props.layout.default.width ?? 0, props.layout.default.height ?? 0);

    graphics.alpha = 0.5;

    this.view.addChild(graphics);
  }
}

export default ExperienceBar;
