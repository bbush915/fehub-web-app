import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";

import Constants from "utilities/constants";
import UnitBuilderContext from "../../../../../context";

const HeroMeritInput: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [heroMerit, setHeroMerit] = useState(Constants.MAX_HERO_MERIT);

  return (
    <Form.Group>
      <Form.Label>Hero Merit</Form.Label>
      <Form.Control
        as="input"
        min={0}
        max={Constants.MAX_HERO_MERIT}
        onChange={_handleChange}
        type="number"
        value={String(heroMerit)}
      />
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = Math.min(Math.max(Number(event.target.value), 0), Constants.MAX_HERO_MERIT);

    dispatch({ type: "SET_HERO_MERIT", value });
    setHeroMerit(value);
  }
};

export default HeroMeritInput;
