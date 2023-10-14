"use client";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

import Table from "react-bootstrap/Table";

function TableSkeleton() {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </th>
          <th>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </th>
          <th>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </th>
          <th>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </th>
          <th>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, index) => (
          <tr>
            {Array.from({ length: 5 }).map((_, index) => (
              <td>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function CardSkeleton() {
  return (
    <Card
      className="col-lg-4 col-md-6 col-sm-12 m-2 flex-shrink-1"
      style={{ padding: "0px", maxWidth: "400px" }}
    >
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
          <Placeholder xs={6} />
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  );
}

export default TableSkeleton;
