import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2;
  height: calc(100vh - 64px);
  font-size: 16px;
`;

const Button = styled.button`
  margin: 8px;
  color: #fff;
  background-color: #1976d2;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  min-width: 64px;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const NotFound = () => {
  return (
    <Container>
      <h2>Error 404</h2>
      <div>
        Sorry we couldn&apos;t find the page/records you&apos;re looking for
      </div>
      <br />
      <Button onClick={() => (window.location.href = "/")}>
        Home
      </Button>
    </Container>
  );
};

export default NotFound;
