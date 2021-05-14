import React from 'react';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

export default function AppNav() {

  const Styles = styled.div `
  .navbar {
    background-color: #0A0C0E;
    color: #fff;
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #fff;

    &:hover {
      color: green;
    }
  } `

    return (
        <Styles>
          <Navbar>
          <Navbar.Brand href="/">Crime in SC</Navbar.Brand>
        </Navbar>
      </Styles>
    )
}