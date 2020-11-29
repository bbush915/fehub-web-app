import React, { useContext, useEffect, useState } from "react";

import { AccessoryTypes, Enumeration } from "types";
import UnitBuilderContext from "../../../../../context";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchAccessoryTypes } from "./gql";

const AccessoryTypeSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [accessoryTypes, setAccessoryTypes] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessoryType, setAccessoryType] = useState(AccessoryTypes.NONE);

  useEffect(_fetchAccessoryTypes, []);

  return (
    <EnumerationSelect
      disabled={loading}
      label="Accessory Type"
      onChange={_handleChange}
      options={accessoryTypes}
      value={accessoryType}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_ACCESSORY_TYPE", value });
    setAccessoryType(value);
  }

  /* Effects */

  function _fetchAccessoryTypes(): void {
    (async function () {
      const accessoryTypes = await fetchAccessoryTypes();
      setAccessoryTypes(accessoryTypes);

      setLoading(false);
    })();
  }
};

export default AccessoryTypeSelect;
