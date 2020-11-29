import React, { Fragment } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

import { ReactComponent as LockIcon } from "assets/Lock.svg";
import { ReactComponent as LockOpenIcon } from "assets/LockOpen.svg";

import styles from "./index.module.scss";

interface StatisticInputProps {
  label: string;
  value: number;
  onValueChange(value: number): void;
  overrideValue: boolean;
  onOverrideValueChange(overrideValue: boolean): void;
  modifier: number;
  onModifierChange(modifier: number): void;
}

const StatisticInput: React.FC<StatisticInputProps> = ({
  label,
  value,
  onValueChange,
  overrideValue,
  onOverrideValueChange,
  modifier,
  onModifierChange,
}: StatisticInputProps) => {
  return (
    <Fragment>
      <Col sm={6}>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <InputGroup>
            <Form.Control
              as="input"
              disabled={!overrideValue}
              min={0}
              onChange={_handleValueChange}
              type="number"
              value={String(value)}
            />
            <InputGroup.Append>
              <Button className={styles["override-button"]} onClick={_handleOverrideValueClick} size="sm">
                {overrideValue ? <LockOpenIcon /> : <LockIcon />}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group>
          <Form.Label>Modifier</Form.Label>
          <Form.Control as="input" onChange={_handleModifierChange} type="number" value={String(modifier)} />
        </Form.Group>
      </Col>
    </Fragment>
  );

  /* Internal */

  function _handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    onValueChange(value);
  }

  function _handleOverrideValueClick() {
    onOverrideValueChange(!overrideValue);
  }

  function _handleModifierChange(event: React.ChangeEvent<HTMLInputElement>) {
    const modifier = Number(event.target.value);
    onModifierChange(modifier);
  }
};

export default StatisticInput;
