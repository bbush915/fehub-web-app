import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";
import { rarityState } from "../../../../state";

const RarityInput: React.FC = () => {
  const [rarity, setRarity] = useRecoilState(rarityState);
  const { dispatch } = useContext(UnitBuilderContext);

  return (
    <Form.Group>
      <Form.Label>Rarity</Form.Label>
      <Form.Control
        as="input"
        min={1}
        max={Constants.MAX_RARITY}
        onChange={_handleChange}
        type="number"
        value={String(rarity)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.min(Math.max(Number(event.target.value), 1), Constants.MAX_RARITY);

    dispatch({ type: "SET_RARITY", value });
    setRarity(value);
  }
};

export default RarityInput;
