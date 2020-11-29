import { Texture } from "pixi.js";

import { SkillTypes, WeaponRefineTypes } from "types";
import { getAssetUrl } from "utilities/asset-helpers";
import { Context, EntityProps, MessageTypes, State } from "../types";
import { getTexture } from "../utilities/texture-helpers";
import BaseSprite from "./base-sprite";

enum Assets {
  ICON_WEAPON = "2|icon_skill_weapon",
  ICON_REFINE_ATTACK = "2|icon_skill_refine_attack",
  ICON_REFINE_SPEED = "2|icon_skill_refine_speed",
  ICON_REFINE_DEFENSE = "2|icon_skill_refine_defense",
  ICON_REFINE_RESISTANCE = "2|icon_skill_refine_resistance",
  ICON_EMPTY_PASSIVE = "2|icon_skill_empty_passive",
  ICON_EMPTY_SACRED_SEAL = "2|icon_skill_empty_sacred-seal",
}

class SkillIcon extends BaseSprite {
  private readonly _skillType: SkillTypes;

  constructor(props: EntityProps) {
    super(props);

    if (!props.options.skillType) {
      throw new Error("Missing required option: [skillType]");
    }

    this._skillType = props.options.skillType;

    this.view.texture = this._getTexture(null);
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

  render(context: Context): void {
    const skill = this._getSkill(context.state);
    this.view.texture = this._getTexture(skill);
  }

  private _getSkill({ skills }: State): State["skills"][keyof State["skills"]] {
    switch (this._skillType) {
      case SkillTypes.WEAPON: {
        return skills.weapon;
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

  private _getTexture(skill: State["skills"][keyof State["skills"]] | null): Texture {
    switch (this._skillType) {
      case SkillTypes.WEAPON: {
        if (!skill?.id) {
          return getTexture(Assets.ICON_WEAPON);
        }

        const weapon = skill as State["skills"]["weapon"];

        switch (weapon.weaponRefineType) {
          case WeaponRefineTypes.NONE: {
            return getTexture(Assets.ICON_WEAPON);
          }

          case WeaponRefineTypes.ATTACK: {
            return getTexture(Assets.ICON_REFINE_ATTACK);
          }

          case WeaponRefineTypes.SPEED: {
            return getTexture(Assets.ICON_REFINE_SPEED);
          }

          case WeaponRefineTypes.DEFENSE: {
            return getTexture(Assets.ICON_REFINE_DEFENSE);
          }

          case WeaponRefineTypes.RESISTANCE: {
            return getTexture(Assets.ICON_REFINE_RESISTANCE);
          }

          case WeaponRefineTypes.EFFECT_1:
          case WeaponRefineTypes.EFFECT_2: {
            break;
          }

          default: {
            throw new Error(`Unexpected weapon refine type encountered: [${weapon.weaponRefineType}]`);
          }
        }

        break;
      }

      case SkillTypes.PASSIVE_A:
      case SkillTypes.PASSIVE_B:
      case SkillTypes.PASSIVE_C: {
        if (!skill?.id) {
          return getTexture(Assets.ICON_EMPTY_PASSIVE);
        }

        break;
      }

      case SkillTypes.SACRED_SEAL: {
        if (!skill?.id) {
          return getTexture(Assets.ICON_EMPTY_SACRED_SEAL);
        }

        break;
      }

      default: {
        throw new Error(`Unexpected skill type encountered: [${this._skillType}]`);
      }
    }

    return Texture.from(getAssetUrl(`skills/${skill.id}/icon.png`));
  }
}

export default SkillIcon;
