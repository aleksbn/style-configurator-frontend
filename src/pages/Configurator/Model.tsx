import React from "react";
import type { IModel } from "../../models/Model";
import styled from "styled-components";
import { ReactSVG } from "react-svg";

const StyledModel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 240px);
  padding: 35px;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  & svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default function Model({ model }: { model: IModel | null }) {
  return (
    <StyledModel>
      <ReactSVG src={model?.url} alt={model?.name} />
    </StyledModel>
  );
}
