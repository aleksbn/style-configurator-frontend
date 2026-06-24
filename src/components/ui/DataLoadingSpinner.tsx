import styled, { keyframes } from "styled-components";

const spin = keyframes`to { transform: rotate(360deg); }`;
const pulse = keyframes`0%,100%{opacity:1} 50%{opacity:0.35}`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const Ring = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #6f7e96;
  border-top-color: #eee7dc;
  animation: ${spin} 0.8s linear infinite;
`;

const Label = styled.span`
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6f7e96;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

export default function DataLoadingSpinner() {
  return (
    <Wrap>
      <Ring />
      <Label>Loading</Label>
    </Wrap>
  );
}
