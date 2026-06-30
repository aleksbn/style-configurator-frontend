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

export { PageWrap, BackgroundOverlay, RotateMessage };
