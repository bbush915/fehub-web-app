import React, { useContext, useEffect, useState } from "react";

import { Enumeration, FavoriteMarks } from "types";
import UnitBuilderContext from "../../../../../context";
import EnumerationSelect from "../../../common/EnumerationSelect";
import { fetchFavoriteMarks } from "./gql";

const FavoriteMarkSelect: React.FC = () => {
  const { dispatch } = useContext(UnitBuilderContext);

  const [favoriteMarks, setFavoriteMarks] = useState<Enumeration[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteMark, setFavoriteMark] = useState(FavoriteMarks.MARK_1);

  useEffect(_fetchFavoriteMarks, []);

  return (
    <EnumerationSelect
      disabled={loading}
      label="Favorite Mark"
      onChange={_handleChange}
      options={favoriteMarks}
      value={favoriteMark}
    />
  );

  /* Internal */

  function _handleChange(value: number): void {
    dispatch({ type: "SET_FAVORITE_MARK", value });
    setFavoriteMark(value);
  }

  /* Effects */

  function _fetchFavoriteMarks(): void {
    (async function () {
      const favoriteMarks = await fetchFavoriteMarks();
      setFavoriteMarks(favoriteMarks);

      setLoading(false);
    })();
  }
};

export default FavoriteMarkSelect;
