import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #23303e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 9999;
`;

const SpinnerRing = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #6f7e96;
  border-top-color: #eee7dc;
  animation: ${spin} 0.9s linear infinite;
`;

const SpinnerText = styled.p`
  color: #6f7e96;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: ${pulse} 1.8s ease-in-out infinite;
  margin: 0;
`;

interface Props {
  text?: string;
}

function LoadingSpinner({ text = "Loading..." }: Props) {
  return (
    <Overlay>
      <SpinnerRing />
      <SpinnerText>{text}</SpinnerText>
    </Overlay>
  );
}

export default LoadingSpinner;
