import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import {
  AccessoryTypeSelect,
  AllySupportSelect,
  BlessingSelect,
  FavoriteMarkSelect,
  HeroSelect,
  SummonerSupportSelect,
} from "./components";

const HeroConfiguration: React.FC = () => (
  <Container>
    <Row>
      <HeroSelect />
    </Row>
    <Row>
      <Col sm={6} xl={4}>
        <SummonerSupportSelect />
      </Col>
      <Col sm={6} xl={4}>
        <AllySupportSelect />
      </Col>
      <Col xl={4}>
        <BlessingSelect />
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        <FavoriteMarkSelect />
      </Col>
      <Col sm={6}>
        <AccessoryTypeSelect />
      </Col>
    </Row>
  </Container>
);

export default HeroConfiguration;
