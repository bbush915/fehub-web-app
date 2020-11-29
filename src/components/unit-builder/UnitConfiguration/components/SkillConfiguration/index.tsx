import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import {
  AssistSelect,
  PassiveASelect,
  PassiveBSelect,
  PassiveCSelect,
  SacredSealSelect,
  SpecialSelect,
  WeaponSelect,
} from "./components";

const SkillConfiguration: React.FC = () => (
  <Container>
    <Row>
      <Col sm={6}>
        <WeaponSelect />
        <AssistSelect />
        <SpecialSelect />
      </Col>
      <Col sm={6}>
        <PassiveASelect />
        <PassiveBSelect />
        <PassiveCSelect />
        <SacredSealSelect />
      </Col>
    </Row>
  </Container>
);

export default SkillConfiguration;
