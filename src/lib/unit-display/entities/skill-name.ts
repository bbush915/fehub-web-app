import { SkillTypes, WeaponRefineTypes } from "types";
import { Context, EntityProps, MessageTypes, State } from "../types";
import BaseText, { TextVariants } from "./base-text";

class SkillName extends BaseText {
  private readonly _skillType: SkillTypes;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.skillType) {
      throw new Error("Missing required option: [skillType]");
    }

    this._skillType = props.options.skillType;
  }

  get subscriptions(): MessageTypes[] {
    return [
      "SET_ASSIST",
      "SET_PASSIVE_A",
      "SET_PASSIVE_B",
      "SET_PASSIVE_C",
      "SET_SACRED_SEAL",
      "SET_SPECIAL",
      "SET_WEAPON",
    ];
  }

  get alwaysRender(): boolean {
    return false;
  }

  render(context: Context): void {
    const skill = this._getSkill(context.state);

    this.view.text = this._getText(skill);

    if (this._skillType === SkillTypes.WEAPON) {
      const weapon = skill as State["skills"]["weapon"];
      this.variant = weapon.weaponRefineType === WeaponRefineTypes.NONE ? TextVariants.WHITE : TextVariants.GREEN;
    }

    super.render(context);
  }

  private _getSkill({ skills }: State): State["skills"][keyof State["skills"]] {
    switch (this._skillType) {
      case SkillTypes.WEAPON: {
        return skills.weapon;
      }

      case SkillTypes.ASSIST: {
        return skills.assist;
      }

      case SkillTypes.SPECIAL: {
        return skills.special;
      }

      case SkillTypes.PASSIVE_A: {
        return skills.passiveA;
      }

      case SkillTypes.PASSIVE_B: {
        return skills.passiveB;
      }

      case SkillTypes.PASSIVE_C: {
        return skills.passiveC;
      }

      case SkillTypes.SACRED_SEAL: {
        return skills.sacredSeal;
      }

      default: {
        throw new Error(`Unexpected skill type encountered: [${this._skillType}]`);
      }
    }
  }

  private _getText(skill: State["skills"][keyof State["skills"]]): string {
    return skill.id ? skill.name : "-";
  }
}

export default SkillName;
