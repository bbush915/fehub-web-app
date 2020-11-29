import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";
import { mergesState } from "../../../../state";

const MergesInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [merges, setMerges] = useRecoilState(mergesState);

  return (
    <Form.Group>
      <Form.Label>Merges</Form.Label>
      <Form.Control
        as="input"
        min={0}
        max={Constants.MAX_MERGES}
        onChange={_handleChange}
        type="number"
        value={String(merges)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.min(Math.max(Number(event.target.value), 0), Constants.MAX_MERGES);

    dispatch({ type: "SET_MERGES", value });
    setMerges(value);
  }
};

export default MergesInput;
