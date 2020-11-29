import { Context, EntityProps } from "../types";
import BaseContainer from "./base-container";
import Digit from "./digit";

const MAX_DIGITS = 4;
const DEFAULT_DIGIT_WIDTH = 34;
const DEFAULT_DIGIT_HEIGHT = 42;
const DEFAULT_DIGIT_SPACING = 28;

export enum NumberVariants {
  BLUE = "blue",
  GREEN = "green",
  RED = "red",
  WHITE = "white",
  YELLOW = "yellow",
}

export enum NumberAlignments {
  LEFT = "left",
  RIGHT = "right",
}

class Number extends BaseContainer {
  private readonly _alignment: NumberAlignments;
  private readonly _includePlus: boolean;

  private _variant: NumberVariants;
  private _value: number;
  private _shouldRender: boolean;

  constructor(props: EntityProps) {
    super(props);

    if (props.options.alignment === undefined) {
      throw new Error("Missing required option: [alignment]");
    }

    this._alignment = props.options.alignment;

    this._includePlus = props.options.includePlus ?? false;

    if (props.options.variant === undefined) {
      throw new Error("Missing required option: [variant]");
    }

    this._variant = props.options.variant;

    for (let i = 0; i < MAX_DIGITS; i++) {
      const digit = new Digit({
        layout: {
          default: {
            width: props.options.digitWidth ?? DEFAULT_DIGIT_WIDTH,
            height: props.options.digitHeight ?? DEFAULT_DIGIT_HEIGHT,
            position: {
              x: i * props.options.digitSpacing ?? DEFAULT_DIGIT_SPACING,
              y: 0,
            },
          },
        },
        tags: [],
        options: {
          variant: this._variant,
        },
      });

      this.children.push(digit);
      this.view.addChild(digit.view);
    }

    this._value = 0;
    this._shouldRender = true;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._shouldRender = this._shouldRender || value !== this._value;
    this._value = value;
  }

  set variant(variant: NumberVariants) {
    this._shouldRender = this._shouldRender || variant !== this._variant;
    this._variant = variant;
  }

  render(context: Context): void {
    if (!this._shouldRender) {
      return;
    }

    this._shouldRender = false;

    for (let i = 0; i < MAX_DIGITS; i++) {
      const digit = this.children[i] as Digit;

      digit.variant = this._variant;

      switch (this._alignment) {
        case NumberAlignments.LEFT: {
          if (i === 0 && this._includePlus) {
            digit.view.visible = true;
            digit.value = "plus";

            break;
          }

          const index = this._includePlus ? i - 1 : i;

          digit.view.visible = index === 0 || this._value >= Math.pow(10, index);
          digit.value = this._getDigit(this._value, index + 1, true);

          break;
        }

        case NumberAlignments.RIGHT: {
          digit.view.visible = i === MAX_DIGITS - 1 || this._value >= Math.pow(10, MAX_DIGITS - i - 1);
          digit.value = this._getDigit(this._value, MAX_DIGITS - i);
          break;
        }

        default: {
          throw new Error(`Unexpected number alignment encountered: [${this._alignment}]`);
        }
      }

      digit.render(context);
    }
  }

  private _getDigit(value: number, n: number, reverse = false): string {
    if (value === 0) {
      return "0";
    }

    const location = reverse ? Math.floor(Math.log10(value)) + 1 + 1 - n : n;
    return String(Math.floor((value / Math.pow(10, location - 1)) % 10));
  }
}

export default Number;
