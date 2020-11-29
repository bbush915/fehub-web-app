import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { ReactComponent as LockIcon } from "assets/Lock.svg";
import { ReactComponent as LockOpenIcon } from "assets/LockOpen.svg";
import { Skill } from "../../../../../state";
import { fetchSkillById, querySkillsByNameAndSkillType } from "../../../gql";
import { Option } from "./types";

import styles from "./index.module.scss";

interface SkillSelectProps {
  id: string;
  label: string;
  skillType: number;
  value: Skill | null;
  onValueChange: (value: Skill | null) => void;
  hideOverride?: boolean;
  overrideValue?: boolean;
  onOverrideValueChange?: (overrideValue: boolean) => void;
}

const SkillSelect: React.FC<SkillSelectProps> = ({
  id,
  label,
  skillType,
  value,
  onValueChange,
  hideOverride = false,
  overrideValue,
  onOverrideValueChange,
}: SkillSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <AsyncTypeahead
          disabled={!hideOverride && !overrideValue}
          filterBy={() => true}
          id={`${id}-typeahead`}
          isLoading={loading}
          labelKey="name"
          onChange={_handleValueChange}
          onSearch={_handleSearch}
          options={options}
          selected={value ? [value] : []}
        />
        {!hideOverride && (
          <InputGroup.Append>
            <Button className={styles["override-button"]} onClick={_handleOverrideValueClick} size="sm">
              {overrideValue ? <LockOpenIcon /> : <LockIcon />}
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form.Group>
  );

  /* Internal */

  async function _handleSearch(name: string): Promise<void> {
    setLoading(true);

    try {
      const skills = await querySkillsByNameAndSkillType(name, skillType);

      const options = skills.sort((x, y) => x.name.localeCompare(y.name));

      setOptions(options);
    } finally {
      setLoading(false);
    }
  }

  async function _handleValueChange(options: Option[]): Promise<void> {
    const option = options[0];

    if (option?.id) {
      const skill = await fetchSkillById(option.id);
      onValueChange(skill);
    } else {
      onValueChange(null);
    }
  }

  function _handleOverrideValueClick() {
    onOverrideValueChange?.(!overrideValue);
  }
};

export default SkillSelect;
