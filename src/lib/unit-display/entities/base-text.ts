import { Text } from "pixi.js";

import { Context, EntityProps, IEntity } from "../types";
import { applyDefaultLayout } from "../utilities/layout-helpers";
import BaseEntiity from "./base-entity";

const DEFAULT_STROKE_THICKNESS = 8;

export enum TextVariants {
  BLUE = "blue",
  GREEN = "green",
  RED = "red",
  WHITE = "white",
}

const TextVariantFillMap = {
  [TextVariants.BLUE]: 0x9ddfe5,
  [TextVariants.GREEN]: 0x82f546,
  [TextVariants.RED]: 0xd695a9,
  [TextVariants.WHITE]: 0xffffff,
};

class BaseText extends BaseEntiity implements IEntity {
  private readonly _view: Text;
  private readonly _fontSize: number;
  private readonly _strokeThickness: number;

  private _variant: TextVariants;
  private _shouldRender: boolean;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.fontSize) {
      throw new Error("Missing required option: [fontSize]");
    }

    this._fontSize = props.options.fontSize;

    this._strokeThickness = props.options.strokeThickness || DEFAULT_STROKE_THICKNESS;

    if (!props.options.variant) {
      throw new Error("Missing required option: [variant]");
    }

    this._variant = props.options.variant;

    this._shouldRender = false;

    this._view = new Text(props.options.value ?? "", {
      fontFamily: "nintendoP_Skip-D_003",
      fontSize: this._fontSize,
      strokeThickness: this._strokeThickness,
      fill: TextVariantFillMap[this._variant],
    });

    this._view.roundPixels = false;

    applyDefaultLayout(this._view, props.layout);
  }

  get view(): Text {
    return this._view;
  }

  get alwaysRender(): boolean {
    return true;
  }

  set variant(variant: TextVariants) {
    this._shouldRender = variant !== this._variant;
    this._variant = variant;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    if (this._shouldRender) {
      this._shouldRender = false;

      this._view.style.fill = TextVariantFillMap[this._variant];
    }
  }
}

export default BaseText;
