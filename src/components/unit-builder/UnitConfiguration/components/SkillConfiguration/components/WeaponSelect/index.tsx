import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useRecoilState, useRecoilValue } from "recoil";

import { ReactComponent as LockIcon } from "assets/Lock.svg";
import { ReactComponent as LockOpenIcon } from "assets/LockOpen.svg";
import UnitBuilderContext from "components/unit-builder/context";
import { fetchSkillById } from "components/unit-builder/UnitConfiguration/components/SkillConfiguration/gql";
import {
  heroSkillsState,
  overrideWeaponState,
  Skill,
  weaponState,
} from "components/unit-builder/UnitConfiguration/state";
import { WeaponRefineTypes } from "types";
import { queryWeaponsByName } from "./gql";
import { Refine, WeaponGroup } from "./types";

import styles from "./index.module.scss";

const WeaponSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [weapon, setWeapon] = useRecoilState(weaponState);
  const [overrideWeapon, setOverrideWeapon] = useRecoilState(overrideWeaponState);

  const heroSkills = useRecoilValue(heroSkillsState);

  const [loading, setLoading] = useState(false);
  const [weaponGroups, setWeaponGroups] = useState<WeaponGroup[]>([]);
  const [selectedWeaponGroup, setSelectedWeaponGroup] = useState<WeaponGroup[]>([]);

  const calculatedWeapon = useMemo(_calculatedWeapon, [overrideWeapon, weapon, heroSkills]);
  const refines = useMemo(_refines, [selectedWeaponGroup]);

  useEffect(_updateWeapon, [overrideWeapon, heroSkills]);
  useEffect(_initializeSelectedWeaponGroup, [calculatedWeapon]);

  return (
    <Fragment>
      <Form.Group>
        <Form.Label>Weapon</Form.Label>
        <InputGroup>
          <AsyncTypeahead
            disabled={!overrideWeapon}
            filterBy={() => true}
            id="weapon-skill-typeahead"
            isLoading={loading}
            labelKey="groupName"
            onChange={_handleWeaponGroupChange}
            onSearch={_handleSearch}
            options={weaponGroups}
            selected={selectedWeaponGroup}
          />
          <InputGroup.Append>
            <Button className={styles["override-button"]} onClick={() => setOverrideWeapon(!overrideWeapon)} size="sm">
              {overrideWeapon ? <LockOpenIcon /> : <LockIcon />}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Refine</Form.Label>
        <Form.Control
          as="select"
          disabled={!overrideWeapon || !refines.length}
          onChange={_handleRefineChange}
          value={calculatedWeapon?.id ?? undefined}
        >
          {refines.map((refine) => (
            <option key={refine.id} value={refine.id}>
              {refine.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Fragment>
  );

  /* Internal */

  async function _handleSearch(name: string): Promise<void> {
    setLoading(true);

    try {
      const weapons = await queryWeaponsByName(name);

      if (!weapons.length) {
        setWeaponGroups([]);

        setLoading(false);
        return;
      }

      const weaponGroups = _groupWeapons(weapons);
      setWeaponGroups(weaponGroups);
    } finally {
      setLoading(false);
    }
  }

  async function _handleWeaponGroupChange(value: WeaponGroup[]): Promise<void> {
    const weaponGroup = value[0];
    const refine = weaponGroup?.refines.find((x) => x.weaponRefineType === null);

    setSelectedWeaponGroup(value);

    if (weaponGroup && refine) {
      const weapon = await fetchSkillById(refine.id);

      _setWeapon(weapon);
    } else {
      _setWeapon(null);
    }
  }

  async function _handleRefineChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.value;

    if (id) {
      const weapon = await fetchSkillById(id);
      _setWeapon(weapon);
    } else {
      _setWeapon(null);
    }
  }

  function _groupWeapons(weapons: { id: string; groupName: string; weaponRefineType: number | null }[]): WeaponGroup[] {
    const weaponGroupMap = weapons
      .sort((x, y) => x.groupName.localeCompare(y.groupName))
      .reduce<Record<string, WeaponGroup>>((accumulator, weapon) => {
        if (accumulator[weapon.groupName]) {
          accumulator[weapon.groupName].refines.push(weapon);
        } else {
          accumulator[weapon.groupName] = {
            groupName: weapon.groupName,
            refines: [weapon],
          };
        }

        return accumulator;
      }, {});

    return Object.values(weaponGroupMap);
  }

  function _setWeapon(weapon: Skill | null): void {
    dispatch({
      type: "SET_WEAPON",
      value: {
        id: weapon?.id ?? null,
        name: weapon?.name ?? "",
        weaponRefineType: weapon?.weaponRefineType ?? WeaponRefineTypes.NONE,
      },
    });

    setWeapon(weapon);
  }

  /* Memos */

  function _calculatedWeapon(): Skill | null {
    return overrideWeapon ? weapon : heroSkills.weapon;
  }

  function _refines(): Refine[] {
    if (!selectedWeaponGroup.length) {
      return [];
    }

    return selectedWeaponGroup[0].refines
      .sort((x, y) => {
        const weaponRefineType1 = x.weaponRefineType ?? 0;
        const weaponRefineType2 = y.weaponRefineType ?? 0;

        return weaponRefineType1 - weaponRefineType2;
      })
      .map((refine, _, array) => {
        let label = "None";

        switch (refine.weaponRefineType) {
          case 1: {
            label = "+ Attack";
            break;
          }

          case 2: {
            label = "+ Speed";
            break;
          }

          case 3: {
            label = "+ Defense";
            break;
          }

          case 4: {
            label = "+ Resistance";
            break;
          }

          case 5: {
            if (array.find((x) => x.weaponRefineType === WeaponRefineTypes.EFFECT_2)) {
              label = "+ Effect (1)";
            } else {
              label = "+ Effect";
            }
            break;
          }

          case 6: {
            label = "+ Effect (2)";
            break;
          }
        }

        return {
          id: refine.id,
          label,
          weaponRefineType: refine.weaponRefineType,
        };
      });
  }

  /* Effects */

  function _updateWeapon(): void {
    if (overrideWeapon) {
      return;
    }

    const value = heroSkills.weapon;
    _setWeapon(value);
  }

  function _initializeSelectedWeaponGroup(): void {
    if (!calculatedWeapon) {
      return;
    }

    (async function () {
      const weapons = await queryWeaponsByName(calculatedWeapon.name);

      const weaponGroups = _groupWeapons(weapons);
      setWeaponGroups(weaponGroups);

      setSelectedWeaponGroup([weaponGroups[0]]);
    })();
  }
};

export default WeaponSelect;
