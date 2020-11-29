import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Header } from "components/common";
import UnitBuilder from "./unit-builder";

import styles from "./index.module.scss";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />

      <Container className={styles["container"]} fluid>
        <Switch>
          <Route path="/unit-builder" component={UnitBuilder} />
          <Redirect to="/unit-builder" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Routes;
