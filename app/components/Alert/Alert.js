"use client";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function PopoverPositionedExample({ children }) {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="left"
        placement="left"
        overlay={
          <Popover id={`popover-positioned-left`}>
            <Popover.Header as="h3">{`Popover left`}</Popover.Header>
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        }
      >
        {children}
      </OverlayTrigger>
    </>
  );
}

export default PopoverPositionedExample;
