import React from "react";
import Link from "next/link";

const NavLink = ({ text, href }) => {
  return (
    <li className="nav-item">
      <Link type="button" className="nav-link" href={`/settings/${href}`}>
        {text}
      </Link>
    </li>
  );
};

export default NavLink;
