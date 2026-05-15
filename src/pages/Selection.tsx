import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 70px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

export default function Selection() {
  return <Wrap>Selection</Wrap>;
}
