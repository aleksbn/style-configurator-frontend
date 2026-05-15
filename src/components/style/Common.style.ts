import styled from "styled-components";
import { maxMobileWidth, maxTabletWidth } from "../../helpers/windowSize";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  > .bg-video {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .bg-video__content {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .bkc {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 40.67svh;
    max-width: 24.58vw;

    @media (max-width: ${maxMobileWidth}) {
      max-width: 296px;
      height: 305px;
    }
  }
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
  box-sizing: border-box;
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

  .desc {
    color: var(--grey);
    text-align: center;
    font-feature-settings:
      "liga" off,
      "clig" off;
    font-family: BeoSupreme;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.1px;

    /* FOR ANIMATIONS */
    overflow: hidden;
    height: fit-content;
    width: fit-content;

    > span {
      display: inline-block;
    }
  }
`;

const Title = styled.h2`
  color: var(--BeoBlack, #191817);
  text-align: center;
  font-feature-settings:
    "liga" off,
    "clig" off;

  /* [Desktop]/H2 Large */
  font-family: BeoSupreme;
  font-size: 48px;
  /* font-size: 3.5vw; */
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

  @media (max-width: ${maxTabletWidth}) {
    font-size: 36px;
    font-weight: 400;
    line-height: 48px;
  }

  @media (max-width: ${maxMobileWidth}) {
    font-size: 32px;
    line-height: 42px;
  }
`;
const Desc = styled.div`
  color: var(--BeoBlack, #191817);
  text-align: center;
  font-feature-settings:
    "liga" off,
    "clig" off;

  /* [Desktop]/B1 Default */
  font-family: BeoSupreme;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
  letter-spacing: 0.2px;

  /* FOR ANIMATIONS */
  overflow: hidden;
  height: fit-content;
  width: fit-content;

  > span {
    display: inline-block;
  }

  @media (max-width: ${maxTabletWidth}) {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
  }

  @media (max-width: ${maxMobileWidth}) {
    width: 301px;
  }
`;

export { Container, TopWrapp, BottomWrapp, Title, Desc };
