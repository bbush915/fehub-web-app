import React, { useEffect, useRef, useState } from "react";

import { view } from "lib/unit-display/application";

import styles from "./index.module.scss";

const UnitDisplay: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(_initializeCanvas, []);

  return (
    <div className={styles["root"]} onClick={() => setShowOverlay(!showOverlay)} ref={root}>
      {showOverlay && (
        <img className={styles["overlay"]} src={`${process.env.PUBLIC_URL}/images/lucina_brave-princess.jpg`} />
      )}
    </div>
  );

  /* Effects */

  function _initializeCanvas(): void {
    if (!root?.current) {
      return;
    }

    view.id = "unit-display";

    root.current.appendChild(view);
  }
};

export default UnitDisplay;
