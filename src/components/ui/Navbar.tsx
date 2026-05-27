import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { fade } from "../../animations/Fade";

const Wrapp = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 39px 26px 44px;
  position: relative;
  align-items: center;
  z-index: 3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
`;

const Logo = styled.img`
  position: absolute;
  height: 96px;
  width: 96px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function Navbar() {
  const location = window.location;
  return (
    <Wrapp
      as={motion.div}
      variants={fade()}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {location.pathname === "/" ? <span></span> : <div>Back</div>}
      <Logo src="./src/assets/images/logo_monochrome.png" alt="logo" />
      <div>Cart</div>
    </Wrapp>
  );
}
