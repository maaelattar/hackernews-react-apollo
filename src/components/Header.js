import React, { useContext } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { UserContext } from "../providers/userProvider";
import { Nav, Navbar, Button, Container } from "react-bootstrap";

export default function Header() {
  let { authToken, logoutUser } = useContext(UserContext);

  const history = useHistory();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          HackerNews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/new/1">
              New
            </Nav.Link>

            <Nav.Link as={NavLink} exact to="/top">
              Top
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/search">
              Search
            </Nav.Link>
            {authToken && (
              <Nav.Link as={NavLink} exact to="/create">
                submit
              </Nav.Link>
            )}
          </Nav>
          <Nav className=" ">
            {authToken ? (
              <Nav.Link
                as={Button}
                variant={"link"}
                className="bg-none text-sm-left"
                onClick={() => {
                  logoutUser();
                  history.push(`/`);
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
