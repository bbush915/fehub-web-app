import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import { getAssetUrl } from "utilities/asset-helpers";

import styles from "./index.module.scss";

const Header: React.FC = () => (
  <div className={styles["root"]}>
    <Navbar
      className={styles["navbar"]}
      style={{
        backgroundImage: `url(${getAssetUrl("miscellaneous/texture.png")})`,
      }}
    >
      <Navbar.Brand className={styles["brand"]}>
        <img src={getAssetUrl("miscellaneous/logo.png")} alt="The FEHub logo" width={42} height={42} />
      </Navbar.Brand>

      <Nav>
        <Nav.Link className={styles["link"]} href="/unit-builder">
          Unit Builder
        </Nav.Link>
      </Nav>

      <div className={styles["version"]}>v{process.env.REACT_APP_VERSION}</div>
    </Navbar>
  </div>
);

export default Header;
