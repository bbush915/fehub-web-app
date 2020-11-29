import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { UnitBuilderProvider, UnitConfiguration, UnitDisplay } from "components/unit-builder";

const UnitBuilder: React.FC = () => {
  useEffect(() => {
    document.title = "FEHub - Unit Builder";
  }, []);

  return (
    <Row>
      <Col className="pb-3" lg={6} xs={12}>
        <UnitBuilderProvider>
          <UnitConfiguration />
        </UnitBuilderProvider>
      </Col>
      <Col className="pb-3" lg={6} xs={12}>
        <UnitDisplay />
      </Col>
    </Row>
  );
};

export default UnitBuilder;
