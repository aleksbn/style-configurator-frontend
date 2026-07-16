import styled from "styled-components";

const PageWrap = styled.div`
  width: 100%;
  height: 100svh;
  margin-top: 70px;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/** Base for a full-height panel sliding in from the right edge (mobile config/price-breakdown panels). */
const SidePanelBase = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
  padding: 80px 20px 80px 60px;

  & .close-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }
`;

/** A compact inline label, e.g. next to a price or product name. */
const InlineLabel = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const RotateMessage = styled.div`
  display: none;
  @media (max-height: 500px) and (orientation: landscape) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #23303e;
    color: #eee7dc;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    z-index: 9999;
  }
`;

export { PageWrap, BackgroundOverlay, SidePanelBase, InlineLabel, RotateMessage };
