import { motion } from "framer-motion";
import { Button } from "../components/style/Buttons.style";
import styled from "styled-components";
import { fade } from "../animations/Fade";
import { SlideUp } from "../animations/Slide";
import { useNavigate } from "react-router-dom";
import { LargeLogo, LargeImage } from "../helpers/imageImport";
import useBreakpoint from "../hooks/useBreakpoints";
import { RotateMessage } from "../components/style/Common.style";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const TopWrapp = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const BottomWrapp = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: center;
  position: absolute;
  bottom: 9.68svh;
`;

const Title = styled.h2`
  color: #191817;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 64px;
  letter-spacing: -0.5px;

  /* FOR ANIMATIONS */
  overflow: hidden;
  height: fit-content;
  width: fit-content;

  > span {
    display: inline-block;
  }
`;
const Desc = styled.div`
  color: #191817;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.2px;

  /* FOR ANIMATIONS */
  overflow: hidden;
  height: fit-content;
  width: fit-content;

  > span {
    display: inline-block;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LargeLogoTag = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 512px;
  height: 512px;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
`;

const Slogan = styled.h1`
  position: absolute;
  top: 50vh;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: bold;
  z-index: 2;
`;

const LargeImageContainer = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const LargeImageTag = styled.img`
  position: relative;
  z-index: 0;
`;

export default function Landing() {
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  return (
    <Wrap>
      <RotateMessage>Please rotate your device to portrait mode</RotateMessage>
      {breakpoint == "desktop" && (
        <LargeImageContainer>
          <Slogan
            as={motion.h1}
            variants={fade(2.5, 0, 1, 1)}
            initial="initial"
            animate="animate"
          >
            Style Dial — Tailored to Your Signature.
          </Slogan>
          <LargeImageTag src={LargeImage} />
        </LargeImageContainer>
      )}
      <Container>
        {breakpoint != "desktop" && (
          <LargeImageContainer>
            <LargeImageTag src={LargeImage} />
          </LargeImageContainer>
        )}
        <LargeLogoTag
          as={motion.img}
          variants={fade(1, 0, 1, 1)}
          initial="initial"
          animate="animate"
          src={LargeLogo}
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
              onClick={() => {
                void navigate("/products");
              }}
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
