import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";

const SkillPointsInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [skillPoints, setSkillPoints] = useState(Constants.MAX_SKILL_POINTS);

  return (
    <Form.Group>
      <Form.Label>Skill Points</Form.Label>
      <Form.Control
        as="input"
        min={0}
        max={Constants.MAX_SKILL_POINTS}
        onChange={_handleChange}
        type="number"
        value={String(skillPoints)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.min(Math.max(Number(event.target.value), 0), Constants.MAX_SKILL_POINTS);

    dispatch({ type: "SET_SKILL_POINTS", value });
    setSkillPoints(value);
  }
};

export default SkillPointsInput;
