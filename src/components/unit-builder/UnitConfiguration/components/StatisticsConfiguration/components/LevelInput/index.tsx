import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";
import { levelState } from "../../../../state";

const LevelInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [level, setLevel] = useRecoilState(levelState);

  return (
    <Form.Group>
      <Form.Label>Level</Form.Label>
      <Form.Control
        as="input"
        min={1}
        max={Constants.MAX_LEVEL}
        onChange={_handleChange}
        type="number"
        value={String(level)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = Math.min(Math.max(Number(event.target.value), 1), Constants.MAX_LEVEL);

    dispatch({ type: "SET_LEVEL", value });
    setLevel(value);
  }
};

export default LevelInput;
