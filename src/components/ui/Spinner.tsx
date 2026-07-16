import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Wrap = styled.div<{ $fullScreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;

  ${(props) =>
    props.$fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      background-color: #23303e;
      z-index: 9999;
      gap: 24px;
    `}
`;

const Ring = styled.div<{
  $size: number;
  $borderWidth: number;
  $duration: number;
}>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  border: ${(props) => props.$borderWidth}px solid #6f7e96;
  border-top-color: #eee7dc;
  animation: ${spin} ${(props) => props.$duration}s linear infinite;
`;

const Label = styled.p<{ $fontSize: number; $duration: number }>`
  color: #6f7e96;
  font-size: ${(props) => props.$fontSize}px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: ${pulse} ${(props) => props.$duration}s ease-in-out infinite;
  margin: 0;
`;

/** Shared loading indicator; use fullScreen for page-level loads and the smaller inline defaults for in-place loads. */
export default function Spinner({
  text = "Loading",
  size = 48,
  fullScreen = false,
}: {
  text?: string;
  size?: number;
  fullScreen?: boolean;
}) {
  return (
    <Wrap $fullScreen={fullScreen}>
      <Ring
        $size={size}
        $borderWidth={fullScreen ? 4 : 3}
        $duration={fullScreen ? 0.9 : 0.8}
      />
      <Label $fontSize={fullScreen ? 14 : 12} $duration={fullScreen ? 1.8 : 1.6}>
        {text}
      </Label>
    </Wrap>
  );
}
