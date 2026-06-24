import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { fade } from "../../animations/Fade";

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    &.right {
      justify-self: flex-end;
      margin-right: 50px;
    }
  }
`;

export default function Footer({ children }) {
  return (
    <StyledFooter
      as={motion.div}
      variants={fade(1.7, 0.2, 0.5, 0.5)}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </StyledFooter>
  );
}
