import styled, { css } from "styled-components";

const type = {
  primary: css`
    color: #ffffff;
    background-color: #000000;

    &:hover {
      background-color: transparent;
      color: #000000;
    }
  `,

  secondary: css`
    color: #000000;
    background-color: transparent;

    &:hover {
      color: #ffffff;
      background-color: #000000;

      > span {
        transition: color 0.6s ease;
        color: #ffffff;
      }
    }
  `,

  tertiary: css`
    color: #000000;
    background-color: #00ffff;
    border: 2px solid #00ffff;

    &:hover {
      background-color: #ffffff;
    }
  `,

  quaternary: css`
    color: #000000;
    background-color: #ffffff;
    border: none;

    &:hover {
      color: #ffffff;
      background-color: #000000;
    }
  `,
};

type ButtonType = keyof typeof type;

interface ButtonProps {
  type?: ButtonType;
}

const Button = styled.div<ButtonProps>`
  border-radius: 40px;
  display: inline-flex;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  user-select: none;
  align-self: center;
  justify-self: center;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  border: 2px solid #000000;
  letter-spacing: 0.1px;
  cursor: pointer;

  transition-property: background-color, color;
  transition-duration: 0.6s;
  transition-timing-function: ease;
  transform-origin: center;
  height: fit-content;
  white-space: nowrap;

  > div:nth-child(even) {
    overflow: hidden;

    > span {
      display: inline-block;
    }
  }

  ${(props) => type[props.type ?? "primary"]}

  &.disabled,
  &:disabled {
    cursor: not-allowed;
    background-color: #aca69f;
    border: 2px solid #aca69f;
    color: #555;
    :hover {
      background-color: #aca69f;
      border: 2px solid #aca69f;
      color: #555;
    }
  }

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

Button.defaultProps = {
  type: "primary",
};

export { Button };
