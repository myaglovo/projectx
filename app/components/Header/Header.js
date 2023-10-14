"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiSolidUser } from "react-icons/bi";
import { RiSettings3Fill } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import "../../globals.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { data: session, status } = useSession();

  const handleOnSignOutClick = () => {
    localStorage.removeItem("authUser");
    signOut();
  };

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem("authUser", JSON.stringify(session.user));
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      localStorage.removeItem("authUser");
    }
  }, [status]);

  return (
    <div className="bg-primary">
      <Container className="container-sm">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-2" />
          <Navbar.Collapse
            className="align-items-start navbar-nav"
            id="basic-navbar-nav"
          >
            <Nav className="nav-item">
              <Link className="nav-link" href="/">
                О проекте
              </Link>
              <Link className="nav-link" href="/events">
                Календарь мероприятий
              </Link>
            </Nav>
            <Nav className="ms-auto grid gap-1" id="mobile-nav">
              {session && session?.user?.role != "teenager" ? (
                <Link
                  type="button"
                  className="btn btn-primary bordered"
                  href="/settings"
                >
                  <RiSettings3Fill size={18} />
                </Link>
              ) : (
                ""
              )}
              {isUserLoggedIn ? (
                <button
                  onClick={handleOnSignOutClick}
                  type="button"
                  className="btn btn-primary bordered"
                >
                  Выйти <HiLogout size={18} />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary bordered"
                    onClick={() => signIn()}
                  >
                    <BiSolidUser size={18} /> Войти
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};
export default Header;
