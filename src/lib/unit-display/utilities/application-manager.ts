import { Application } from "pixi.js";

import {
  AccessoryTypes,
  AllySupportRanks,
  Colors,
  Elements,
  FavoriteMarks,
  LegendaryHeroBoostTypes,
  MovementTypes,
  MythicHeroBoostTypes,
  Statistics,
  SummonerSupportRanks,
  WeaponRefineTypes,
  Weapons,
} from "types";
import Constants from "utilities/constants";
import { Context, IEntity, Message, State } from "../types";
import MessageBus from "./message-bus";
import { parseTemplate } from "./template-helpers";

const initialState: State = {
  template: null,

  summonerSupportRank: SummonerSupportRanks.NONE,
  allySupportRank: AllySupportRanks.NONE,
  blessing: Elements.NONE,
  favoriteMark: FavoriteMarks.MARK_1,
  accessoryType: AccessoryTypes.NONE,

  hero: {
    id: null,
    name: "",
    title: "",
    artist: "",
    voiceActor: "",
    isLegendaryHero: false,
    isMythicHero: false,
    element: Elements.NONE,
    legendaryHeroBoostType: LegendaryHeroBoostTypes.NONE,
    mythicHeroBoostType: MythicHeroBoostTypes.NONE,
    isDuoHero: false,
    color: Colors.NONE,
    weapon: Weapons.NONE,
    movementType: MovementTypes.NONE,
  },

  statistics: {
    rarity: 5,
    level: Constants.MAX_LEVEL,
    merges: 0,
    dragonflowers: 0,
    asset: Statistics.NONE,
    flaw: Statistics.NONE,
    hitPoints: 0,
    hitPointsModifier: 0,
    attack: 0,
    attackModifier: 0,
    speed: 0,
    speedModifier: 0,
    defense: 0,
    defenseModifier: 0,
    resistance: 0,
    resistanceModifier: 0,
    skillPoints: Constants.MAX_SKILL_POINTS,
    heroMerit: Constants.MAX_HERO_MERIT,
  },

  skills: {
    weapon: {
      id: null,
      name: "",
      weaponRefineType: WeaponRefineTypes.NONE,
    },
    assist: {
      id: null,
      name: "",
    },
    special: {
      id: null,
      name: "",
    },
    passiveA: {
      id: null,
      name: "",
    },
    passiveB: {
      id: null,
      name: "",
    },
    passiveC: {
      id: null,
      name: "",
    },
    sacredSeal: {
      id: null,
      name: "",
    },
  },
};

class ApplicationManager {
  private readonly _application: Application;
  private readonly _messageBus: MessageBus;

  private _state: State;
  private _entities: IEntity[];
  private _messageQueue: Message[];

  constructor(application: Application) {
    this._application = application;

    this._state = initialState;
    this._messageBus = new MessageBus();

    this._entities = [];
    this._messageQueue = [];

    this._application.ticker.add((delta: number) => this._tick(delta));
  }

  dispatch(message: Message): void {
    this._messageQueue.push(message);
  }

  private _tick(delta: number): void {
    const context: Context = {
      state: this._state,
      delta,
    };

    for (const entity of this._entities) {
      if (entity.alwaysRender) {
        entity.render(context);
      }
    }

    for (const message of this._messageQueue) {
      this._handleMessage(message);

      this._messageBus.publish(message.type, context);
    }

    this._messageQueue = [];
  }

  private _handleMessage(message: Message): void {
    switch (message.type) {
      case "SET_ACCESSORY_TYPE": {
        this._state.accessoryType = message.value;
        break;
      }

      case "SET_ALLY_SUPPORT_RANK": {
        this._state.allySupportRank = message.value;
        break;
      }

      case "SET_ARTIST": {
        this._state.hero.artist = message.value;
        break;
      }

      case "SET_ASSET": {
        this._state.statistics.asset = message.value;
        break;
      }

      case "SET_ASSIST": {
        this._state.skills.assist.id = message.value.id;
        this._state.skills.assist.name = message.value.name;

        break;
      }

      case "SET_ATTACK": {
        this._state.statistics.attack = message.value;
        break;
      }

      case "SET_ATTACK_MODIFIER": {
        this._state.statistics.attackModifier = message.value;
        break;
      }

      case "SET_BLESSING": {
        this._state.blessing = message.value;
        break;
      }

      case "SET_DEFENSE": {
        this._state.statistics.defense = message.value;
        break;
      }

      case "SET_DEFENSE_MODIFIER": {
        this._state.statistics.defenseModifier = message.value;
        break;
      }

      case "SET_DRAGONFLOWERS": {
        this._state.statistics.dragonflowers = message.value;
        break;
      }

      case "SET_DUO_HERO": {
        this._state.hero.isDuoHero = message.value.isDuoHero;
        break;
      }

      case "SET_FAVORITE_MARK": {
        this._state.favoriteMark = message.value;
        break;
      }

      case "SET_FLAW": {
        this._state.statistics.flaw = message.value;
        break;
      }

      case "SET_HERO_ID": {
        this._state.hero.id = message.value;
        break;
      }

      case "SET_HERO_MERIT": {
        this._state.statistics.heroMerit = message.value;
        break;
      }

      case "SET_HERO_NAME": {
        this._state.hero.name = message.value;
        break;
      }

      case "SET_HERO_TITLE": {
        this._state.hero.title = message.value;
        break;
      }

      case "SET_HIT_POINTS": {
        this._state.statistics.hitPoints = message.value;
        break;
      }

      case "SET_HIT_POINTS_MODIFIER": {
        this._state.statistics.hitPointsModifier = message.value;
        break;
      }

      case "SET_LEGENDARY_HERO": {
        this._state.hero.isLegendaryHero = message.value.isLegendaryHero;
        this._state.hero.element = message.value.element;
        this._state.hero.legendaryHeroBoostType = message.value.legendaryHeroBoostType;

        break;
      }

      case "SET_LEVEL": {
        this._state.statistics.level = message.value;
        break;
      }

      case "SET_MERGES": {
        this._state.statistics.merges = message.value;
        break;
      }

      case "SET_MOVEMENT_TYPE": {
        this._state.hero.movementType = message.value;
        break;
      }

      case "SET_MYTHIC_HERO": {
        this._state.hero.isMythicHero = message.value.isMythicHero;
        this._state.hero.element = message.value.element;
        this._state.hero.mythicHeroBoostType = message.value.mythicHeroBoostType;

        break;
      }

      case "SET_PASSIVE_A": {
        this._state.skills.passiveA.id = message.value.id;
        this._state.skills.passiveA.name = message.value.name;

        break;
      }

      case "SET_PASSIVE_B": {
        this._state.skills.passiveB.id = message.value.id;
        this._state.skills.passiveB.name = message.value.name;

        break;
      }

      case "SET_PASSIVE_C": {
        this._state.skills.passiveC.id = message.value.id;
        this._state.skills.passiveC.name = message.value.name;

        break;
      }

      case "SET_RARITY": {
        this._state.statistics.rarity = message.value;
        break;
      }

      case "SET_RESISTANCE": {
        this._state.statistics.resistance = message.value;
        break;
      }

      case "SET_RESISTANCE_MODIFIER": {
        this._state.statistics.resistanceModifier = message.value;
        break;
      }

      case "SET_SACRED_SEAL": {
        this._state.skills.sacredSeal.id = message.value.id;
        this._state.skills.sacredSeal.name = message.value.name;

        break;
      }

      case "SET_SKILL_POINTS": {
        this._state.statistics.skillPoints = message.value;
        break;
      }

      case "SET_SPECIAL": {
        this._state.skills.special.id = message.value.id;
        this._state.skills.special.name = message.value.name;

        break;
      }

      case "SET_SPEED": {
        this._state.statistics.speed = message.value;
        break;
      }

      case "SET_SPEED_MODIFIER": {
        this._state.statistics.speedModifier = message.value;
        break;
      }

      case "SET_STATE": {
        this._state = message.value;

        const context: Context = {
          state: this._state,
          delta: 0,
        };

        for (const entity of this._entities) {
          entity.render(context);
        }

        break;
      }

      case "SET_SUMMONER_SUPPORT_RANK": {
        this._state.summonerSupportRank = message.value;
        break;
      }

      case "SET_TEMPLATE": {
        this._setTemplate(message.value);
        break;
      }

      case "SET_VOICE_ACTOR": {
        this._state.hero.voiceActor = message.value;
        break;
      }

      case "SET_WEAPON": {
        this._state.skills.weapon.id = message.value.id;
        this._state.skills.weapon.name = message.value.name;
        this._state.skills.weapon.weaponRefineType = message.value.weaponRefineType;

        break;
      }

      case "SET_WEAPON_TYPE": {
        this._state.hero.color = message.value.color;
        this._state.hero.weapon = message.value.weapon;

        break;
      }
    }
  }

  private _setTemplate(name: string): void {
    this._state.template = name;

    this._application.stage.removeChildren();
    this._messageBus.reset();

    const context: Context = {
      state: this._state,
      delta: 0,
    };

    this._entities = parseTemplate(this._application.stage, name);

    for (const entity of this._entities) {
      for (const messageType of entity.subscriptions) {
        this._messageBus.subscribe(messageType, entity);
      }

      entity.render(context);
    }
  }
}

export default ApplicationManager;
