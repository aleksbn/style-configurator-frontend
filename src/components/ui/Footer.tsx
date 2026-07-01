import React from "react";
import { motion } from "framer-motion";
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

      @media (max-width: 1024px) {
        margin-right: 15px;
      }
    }
  }

  @media (max-width: 575px) {
    &.final-footer {
      display: none;
    }
  }
`;

export default function Footer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <StyledFooter
      className={className}
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
