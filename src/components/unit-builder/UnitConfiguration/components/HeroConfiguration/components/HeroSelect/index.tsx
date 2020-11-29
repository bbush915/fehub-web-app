import React, { Fragment, useContext, useMemo, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Colors, Elements, LegendaryHeroBoostTypes, MovementTypes, MythicHeroBoostTypes, Weapons } from "types";
import UnitBuilderContext from "../../../../../context";
import { Artist, blessingState, Hero, heroState, HeroVoiceActor } from "../../../../state";
import { fetchHeroById, queryHeroesByName } from "./gql";
import { Alternate, HeroGroup } from "./types";

const HeroSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [hero, setHero] = useRecoilState(heroState);
  const setBlessing = useSetRecoilState(blessingState);

  const [loading, setLoading] = useState(false);
  const [heroGroups, setHeroGroups] = useState<HeroGroup[]>([]);
  const [selectedHeroGroup, setSelectedHeroGroup] = useState<HeroGroup>();

  const alternates = useMemo(_alternates, [selectedHeroGroup]);

  return (
    <Fragment>
      <Col sm={6}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <AsyncTypeahead
            filterBy={() => true}
            id="hero-typeahead"
            isLoading={loading}
            labelKey="name"
            onChange={_handleHeroGroupChange}
            onSearch={_handleSearch}
            options={heroGroups}
            selected={selectedHeroGroup ? [selectedHeroGroup] : []}
          />
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control as="select" disabled={!alternates.length} onChange={_handleAlternateChange} value={hero?.id}>
            {alternates.map((alternate) => (
              <option key={alternate.id} value={alternate.id}>
                {alternate.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Fragment>
  );

  /* Internal */

  async function _handleSearch(query: string): Promise<void> {
    setLoading(true);

    try {
      const heroes = await queryHeroesByName(query);

      if (!heroes.length) {
        setHeroGroups([]);

        setLoading(false);
        return;
      }

      const heroGroupMap = heroes
        .sort((x, y) => x.name.localeCompare(y.name))
        .reduce<Record<string, HeroGroup>>((accumulator, hero) => {
          if (accumulator[hero.name]) {
            accumulator[hero.name].alternates.push(hero);
          } else {
            accumulator[hero.name] = { name: hero.name, alternates: [hero] };
          }

          return accumulator;
        }, {});

      const heroGroups = Object.values(heroGroupMap);

      setHeroGroups(heroGroups);
    } finally {
      setLoading(false);
    }
  }

  async function _handleHeroGroupChange(value: HeroGroup[]): Promise<void> {
    const heroGroup = value[0];

    setSelectedHeroGroup(heroGroup);

    if (heroGroup) {
      const alternates = heroGroup.alternates
        .slice(0)
        .sort((x, y) => new Date(x.releaseDate).getTime() - new Date(y.releaseDate).getTime());

      const hero = await fetchHeroById(alternates[0].id);
      _setHero(hero);
    } else {
      _setHero(null);
    }
  }

  async function _handleAlternateChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const alternate = alternates.find((x) => x.id === event.target.value);

    if (!alternate) {
      return;
    }

    const hero = await fetchHeroById(alternate.id);
    _setHero(hero);
  }

  function _setHero(hero: Hero | null): void {
    dispatch({ type: "SET_HERO_ID", value: hero?.id ?? "" });
    dispatch({ type: "SET_HERO_NAME", value: hero?.name ?? "" });
    dispatch({ type: "SET_HERO_TITLE", value: hero?.title ?? "" });
    dispatch({ type: "SET_ARTIST", value: _getArtist(hero?.artist) });
    dispatch({ type: "SET_VOICE_ACTOR", value: _getVoiceActor(hero?.heroVoiceActors) });
    dispatch({
      type: "SET_LEGENDARY_HERO",
      value: {
        isLegendaryHero: hero?.isLegendaryHero ?? false,
        element: hero?.element ?? Elements.NONE,
        legendaryHeroBoostType: hero?.legendaryHeroBoostType ?? LegendaryHeroBoostTypes.NONE,
      },
    });
    dispatch({
      type: "SET_MYTHIC_HERO",
      value: {
        isMythicHero: hero?.isMythicHero ?? false,
        element: hero?.element ?? Elements.NONE,
        mythicHeroBoostType: hero?.mythicHeroBoostType ?? MythicHeroBoostTypes.NONE,
      },
    });
    dispatch({ type: "SET_DUO_HERO", value: { isDuoHero: hero?.isDuoHero ?? false } });
    dispatch({
      type: "SET_WEAPON_TYPE",
      value: { color: hero?.color ?? Colors.NONE, weapon: hero?.weapon ?? Weapons.NONE },
    });
    dispatch({ type: "SET_MOVEMENT_TYPE", value: hero?.movementType ?? MovementTypes.NONE });

    if (hero?.isLegendaryHero || hero?.isMythicHero) {
      dispatch({ type: "SET_BLESSING", value: Elements.NONE });
      setBlessing(Elements.NONE);
    }

    setHero(hero);
  }

  function _getArtist(artist?: Artist): string {
    if (!artist) {
      return "";
    }

    let text = artist.name;

    if (artist.nameKanji) {
      text += ` (${artist.nameKanji})`;
    }

    if (artist.company) {
      text += ` / ${artist.company}`;
    }

    return text;
  }

  function _getVoiceActor(heroVoiceActors?: HeroVoiceActor[]): string {
    if (!heroVoiceActors) {
      return "";
    }

    const text = heroVoiceActors
      .sort((x, y) => x.sort - y.sort)
      .map((x) => x.voiceActor.name)
      .filter((x) => x)
      .join(" + ");

    return text;
  }

  /* Memos */

  function _alternates(): Alternate[] {
    return selectedHeroGroup?.alternates.sort((x, y) => x.title.localeCompare(y.title)) ?? [];
  }
};

export default HeroSelect;
