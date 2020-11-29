import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { includeSkillBonusesState } from "../../state";
import {
  AssetSelect,
  AttackInput,
  DefenseInput,
  DragonflowersInput,
  FlawSelect,
  HeroMeritInput,
  HitPointsInput,
  LevelInput,
  MergesInput,
  RarityInput,
  ResistanceInput,
  SkillPointsInput,
  SpeedInput,
} from "./components";

const StatisticsConfiguration: React.FC = () => {
  const [includeSkillBonuses, setIncludeSkillBonuses] = useRecoilState(includeSkillBonusesState);

  return (
    <Container>
      <Row>
        <Col sm={6} xl={3}>
          <RarityInput />
        </Col>
        <Col sm={6} xl={3}>
          <LevelInput />
        </Col>
        <Col sm={6} xl={3}>
          <MergesInput />
        </Col>
        <Col sm={6} xl={3}>
          <DragonflowersInput />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <AssetSelect />
        </Col>
        <Col sm={6}>
          <FlawSelect />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <HitPointsInput />
          </Row>
          <Row>
            <AttackInput />
          </Row>
          <Row>
            <SpeedInput />
          </Row>
          <Row>
            <DefenseInput />
          </Row>
          <Row>
            <ResistanceInput />
          </Row>
          <Row>
            <Col className="d-flex justify-content-center pb-2">
              <Form.Check
                checked={includeSkillBonuses}
                label="Include Skill Bonuses"
                onChange={_handleChange}
                type="checkbox"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SkillPointsInput />
        </Col>
        <Col sm={6}>
          <HeroMeritInput />
        </Col>
      </Row>
    </Container>
  );

  /* Internal */

  function _handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const checked = event.target.checked;
    setIncludeSkillBonuses(checked);
  }
};

export default StatisticsConfiguration;
