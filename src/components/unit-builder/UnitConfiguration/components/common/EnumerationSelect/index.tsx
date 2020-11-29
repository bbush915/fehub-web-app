import React from "react";
import { Form } from "react-bootstrap";

import Enumeration from "types/enumeration";

export type EnumerationSelectProps<T> = {
  label: string;
  options: T[];
  value: number;
  onChange(value: number): void;
  disabled?: boolean;
};

type EnumerationSelect<T extends Enumeration> = React.FC<EnumerationSelectProps<T>>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EnumerationSelect = <T extends Enumeration>({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: EnumerationSelectProps<T>) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" disabled={disabled} onChange={_handleChange} value={String(value)}>
        <option key={0} />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const option = options.find((x) => String(x.value) === event.target.value);
    onChange(option?.value ?? 0);
  }
};

export default EnumerationSelect;
