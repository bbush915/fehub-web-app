import React, { useEffect, useRef } from "react";

import { view } from "lib/unit-display/application";

import styles from "./index.module.scss";

const UnitDisplay: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(_initializeCanvas, []);

  return <div className={styles["root"]} ref={root} />;

  /* Effects */

  function _initializeCanvas(): void {
    if (!root?.current) {
      return;
    }

    root.current.appendChild(view);
  }
};

export default UnitDisplay;
