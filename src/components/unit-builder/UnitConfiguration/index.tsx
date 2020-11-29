import React from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import { RecoilRoot } from "recoil";

import { HeroConfiguration, SkillConfiguration, StatisticsConfiguration } from "./components";

const UnitConfiguration: React.FC = () => (
  <Card className="shadow-sm">
    <Tab.Container defaultActiveKey={0}>
      <Card.Header>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={0}>Hero</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={1}>Statistics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={2}>Skills</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <RecoilRoot>
          <Tab.Content>
            <Tab.Pane eventKey={0}>
              <HeroConfiguration />
            </Tab.Pane>
            <Tab.Pane eventKey={1}>
              <StatisticsConfiguration />
            </Tab.Pane>
            <Tab.Pane eventKey={2}>
              <SkillConfiguration />
            </Tab.Pane>
          </Tab.Content>
        </RecoilRoot>
      </Card.Body>
    </Tab.Container>
  </Card>
);

export default UnitConfiguration;
