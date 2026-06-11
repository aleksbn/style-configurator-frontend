import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { fade } from "../../animations/Fade";
import { useLocation, useNavigate } from "react-router-dom";
import { SlideRight } from "../../animations/Slide";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { BsCartDash } from "react-icons/bs";

const Wrapp = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 39px 26px 44px;
  position: relative;
  align-items: center;
  height: 70px;
  z-index: 3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
`;

const LogoContainer = styled.div`
  display: flex;
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  position: absolute;
  height: 96px;
  width: 96px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const BackButton = styled.div``;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Wrapp
      as={motion.div}
      variants={fade()}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {location.pathname === "/" ? (
        <span></span>
      ) : (
        <BackButton
          as={motion.span}
          variants={SlideRight(0.5, 0, 0.5, 0.5, true)}
          initial="initial"
          animate="animate"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackCircleOutline
            size={36}
            color="black"
            cursor="pointer"
          />
        </BackButton>
      )}
      <LogoContainer>
        <Logo src="./src/assets/images/logo_monochrome.png" alt="logo" />
      </LogoContainer>
      <BsCartDash size={32} color="black" cursor="pointer" />
    </Wrapp>
  );
}
