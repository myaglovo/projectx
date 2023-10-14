"use client";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Ratio from "react-bootstrap/Ratio";

function CardSkeleton() {
  return (
    <Card
      className="col-lg-4 col-md-6 col-sm-12 m-2 flex-shrink-1 overflow-hidden"
      style={{ padding: "0px", maxWidth: "400px" }}
    >
      <Ratio key="16x9" aspectRatio="16x9">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder
            xs={6}
            style={{ height: "225px", width: "100%" }}
            bg="secondary"
          />
        </Placeholder>
      </Ratio>
      <Card.Body>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder xs={8} bg="secondary" />
        <Placeholder as={Card.Text} animation="wave"></Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={5} bg="secondary" />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={4} />
      </Card.Body>
    </Card>
  );
}
function CardSkeleton123() {
  return (
    <Card
      className="col-lg-4 col-md-6 col-sm-12 m-2 flex-shrink-1"
      style={{ padding: "0px", maxWidth: "400px" }}
    >
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} style={{ height: "200px", width: "100%" }} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  );
}

export default CardSkeleton;
