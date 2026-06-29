import React from "react";
import styled from "styled-components";
import type { IOption } from "../../models/Model";

const Container = styled.div`
  padding-left: 20%;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);

  @media (max-width: 1280px) {
    padding-left: 0;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Option = styled.div`
  cursor: pointer;
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    font-weight: bold;
  }

  &.selected {
    font-weight: bold;
  }
`;

const Underline = styled.div`
  width: 0%;
  height: 2px;
  background-color: #000000;
  transition: width 0.3s ease-in-out;

  &.selected {
    width: 100%;
  }
`;

export default function Options({
  options,
  setSelectedOption,
  selectedOption,
}: {
  options: IOption[];
  setSelectedOption: React.Dispatch<React.SetStateAction<IOption | null>>;
  selectedOption: IOption | null;
}) {
  return (
    <Container>
      <OptionsContainer>
        {options.map((option) => (
          <OptionContainer>
            <Option
              key={option.code}
              onClick={() => setSelectedOption(option)}
              className={selectedOption?.code === option.code ? "selected" : ""}
            >
              {option.name}
            </Option>
            <Underline
              className={selectedOption?.code === option.code ? "selected" : ""}
            />
          </OptionContainer>
        ))}
      </OptionsContainer>
    </Container>
  );
}
