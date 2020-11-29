import React, { useContext, useMemo } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { MovementTypes } from "types";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";
import { dragonflowersState, heroState } from "../../../../state";

const DragonflowersInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const hero = useRecoilValue(heroState);
  const [dragonflowers, setDragonflowers] = useRecoilState(dragonflowersState);

  const maxDragonflowers = useMemo(_maxDragonflowers, [hero]);

  return (
    <Form.Group>
      <Form.Label>Dragonflowers</Form.Label>
      <Form.Control
        as="input"
        min={0}
        max={maxDragonflowers}
        onChange={_handleChange}
        type="number"
        value={String(dragonflowers)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.min(Math.max(Number(event.target.value), 0), maxDragonflowers);

    dispatch({ type: "SET_DRAGONFLOWERS", value });
    setDragonflowers(value);
  }

  /* Memos */

  function _maxDragonflowers(): number {
    if (!hero) {
      return Constants.MAX_DRAGONFLOWERS_DEFAULT;
    }

    return hero.movementType === MovementTypes.INFANTRY &&
      new Date(hero.releaseDate) <= new Date(Constants.DRAGONFLOWER_CUTOFF_DATE)
      ? Constants.MAX_DRAGONFLOWERS_SPECIAL
      : Constants.MAX_DRAGONFLOWERS_DEFAULT;
  }
};

export default DragonflowersInput;
