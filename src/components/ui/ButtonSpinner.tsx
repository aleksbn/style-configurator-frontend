import styled from "styled-components";
const Wrapp = styled.div<{ width?: string; height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width ?? "32px"};
  height: ${(props) => props.height ?? "32px"};
`;

const Loader = styled.div<{ width?: string; height?: string }>`
  position: absolute;
  border-width: 2px;
  border-style: solid;
  border-color: #e5e5e5 #555555 #555555;
  border-image: initial;
  border-radius: 50%;
  width: ${(props) => props.width ?? "15px"};
  height: ${(props) => props.height ?? "15px"};
  animation: 2s linear 0s infinite normal none running spin;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ButtonSpinner = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <Wrapp width={width} height={height}>
      <Loader width={width} height={height}></Loader>
    </Wrapp>
  );
};

export default ButtonSpinner;
