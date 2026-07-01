import React from "react";
import styled from "styled-components";
import type { IModel } from "../../models/Model";
import { motion } from "framer-motion";
import { SlideUp } from "../../animations/Slide";

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: safe center;
  position: absolute;
  top: 69px;
  width: 100%;
  left: 0;
  right: 0;
  overflow-x: auto;
  gap: 12px;
  padding: 0 20px;
  box-sizing: border-box;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OptionListItem = styled.div`
  font-size: 24px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  :last-child {
    left: 0;
  }

  > .ruler {
    margin-top: 6px;
    height: 2px;
    width: 0;
    background-color: #000000;
    transition: width 0.5s cubic-bezier(0.8, 0, 0.2, 1);
  }

  &.active {
    color: #000000;
    > .ruler {
      width: 100%;
    }
  }

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export default function MobileOptions({
  model,
  selectedOptionKey,
  setSelectedOptionKey,
}: {
  model: IModel | null;
  selectedOptionKey: string;
  setSelectedOptionKey: (key: string) => void;
}) {
  return (
    <OptionList>
      {Object.values(model?.options ?? {}).map((option, index) => {
        const key_string = model?.options[option.type_name].type_name;
        return (
          <OptionListItem
            className={`part ${selectedOptionKey == key_string ? "active" : ""}`}
            key={index}
            onClick={() => setSelectedOptionKey(key_string!)}
            as={motion.div}
            variants={SlideUp(1.35 + index * 0.1)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span>{option.name}</span>
            <span className="ruler">&nbsp;</span>
          </OptionListItem>
        );
      })}
    </OptionList>
  );
}
