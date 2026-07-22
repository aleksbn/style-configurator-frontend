import { type Dispatch, type SetStateAction } from "react";
import styled from "styled-components";
import type { IOption } from "../../models/Model";
import { motion } from "framer-motion";
import { SlideRight } from "../../animations/Slide";
import { animated } from "../../animations/Motion";

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
  overflow: hidden;
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
  startingAnimationNumber,
}: {
  options: IOption[];
  setSelectedOption: Dispatch<SetStateAction<IOption | null>>;
  selectedOption: IOption | null;
  startingAnimationNumber: number;
}) {
  return (
    <Container>
      <OptionsContainer>
        {options.map((option, index) => {
          const slideIn = animated(
            SlideRight(startingAnimationNumber + index * 0.2, 0, 0.5, 0.5, true, 300),
          );
          return (
            <OptionContainer>
              <Option
                as={motion.div}
                {...slideIn}
                key={option.code}
                onClick={() => setSelectedOption(option)}
                className={
                  selectedOption?.code === option.code ? "selected" : ""
                }
              >
                {option.name}
              </Option>
              <Underline
                as={motion.div}
                {...slideIn}
                className={
                  selectedOption?.code === option.code ? "selected" : ""
                }
              />
            </OptionContainer>
          );
        })}
      </OptionsContainer>
    </Container>
  );
}
