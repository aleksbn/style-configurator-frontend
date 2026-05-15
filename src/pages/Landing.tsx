import React from "react";
import {
  BottomWrapp,
  Container,
  Desc,
  Title,
  TopWrapp,
} from "../components/style/Common.style";
import { motion } from "framer-motion";
import { Button } from "../components/style/Buttons.style";
import styled from "styled-components";
import { fade } from "../animations/Fade";
import { SlideUp } from "../animations/Slide";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LandingImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 512px;
  height: 512px;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

export default function Landing() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <div></div>
      <Container>
        <LandingImage
          as={motion.img}
          variants={fade(1, 0, 1, 1)}
          initial="initial"
          animate="animate"
          src="./src/assets/images/landing.png"
        />
        <TopWrapp>
          <Title>
            <motion.span
              variants={fade(1.3, 0, 1, 1)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Style Dial
            </motion.span>
          </Title>
          <Desc>
            <motion.span
              variants={fade(1.6, 0, 1, 1)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              The best cloth configurator
            </motion.span>
          </Desc>
        </TopWrapp>
        <BottomWrapp>
          <div style={{ overflow: "hidden" }}>
            <Button
              as={motion.div}
              variants={SlideUp(1.9, 0, 1, 1, true)}
              initial="initial"
              animate="animate"
              type="primary"
              onClick={() => navigate("/products")}
            >
              Start creating
            </Button>
          </div>
          <div className="desc">
            <motion.span
              variants={SlideUp(2.2, 0, 1, 1, true)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              You'll never buy from others again
            </motion.span>
          </div>
        </BottomWrapp>
      </Container>
    </Wrap>
  );
}
