import styled from "styled-components";
import { maxMobileWidth, maxTabletWidth } from "../../helpers/windowSize";

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

const PageWrap = styled.div`
  width: 100%;
  height: 100svh;
  margin-top: 70px;
`;

export { Container, TopWrapp, BottomWrapp, Title, Desc, PageWrap };
