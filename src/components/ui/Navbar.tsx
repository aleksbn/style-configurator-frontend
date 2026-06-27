import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { fade } from "../../animations/Fade";
import { useLocation, useNavigate } from "react-router-dom";
import { SlideLeft, SlideRight } from "../../animations/Slide";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";
import { useAppSelector } from "../../store/hooks";
import { getBackLink } from "../../constants/backRelations";

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

const BackContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
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

const CartContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

const NumberOfItems = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const handleCartClick = () => {
    if (cart.items.length === 0) return;
    localStorage.setItem("previousPath", location.pathname);
    navigate("/final");
  };
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
        <BackContainer>
          <BackButton
            as={motion.span}
            variants={SlideRight(0.5, 0, 0.5, 0.5, true)}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() =>
              navigate(
                getBackLink(
                  location.pathname,
                  localStorage.getItem("previousPath")!,
                ),
              )
            }
          >
            <IoChevronBackCircleOutline
              size={36}
              color="black"
              cursor="pointer"
            />
          </BackButton>
          <span>{`${location.pathname.includes("final") ? "New" : ""}`}</span>
        </BackContainer>
      )}
      <LogoContainer>
        <Logo src="./src/assets/images/logo_monochrome.png" alt="logo" />
      </LogoContainer>
      {location.pathname === "/" ? (
        <span></span>
      ) : (
        <CartContainer
          as={motion.div}
          variants={SlideLeft(0.5, 0, 0.5, 0.5, true)}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleCartClick}
        >
          {cart.items.length === 0 ? (
            <BsCart size={32} color="#263b58" />
          ) : (
            <BsFillCartFill size={32} color="#263b58" cursor="pointer" />
          )}
          <NumberOfItems>{cart.items.length}</NumberOfItems>
        </CartContainer>
      )}
    </Wrapp>
  );
}
