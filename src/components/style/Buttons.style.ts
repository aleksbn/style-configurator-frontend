import styled, { css } from "styled-components";

const type = {
  primary: css`
    color: #e3dcd1;
    background-color: #0d1d32;

    &:hover {
      background-color: #e3dcd1;
      color: #0d1d32;
    }
  `,

  secondary: css`
    color: #0d1d32;
    background-color: transparent;

    &:hover {
      color: #e3dcd1;
      background-color: #0d1d32;

      > span {
        transition: color 0.6s ease;
        color: #e3dcd1;
      }
    }
  `,

  tertiary: css`
    width: 100%;
    background-color: #0d1d32;
    color: #e3dcd1;
    padding: 24px 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #cfc9bf;
      color: #0d1d32;
    }
  `,

  quaternary: css`
    width: 100%;
    background-color: #e3dcd1;
    color: #0d1d32;
    padding: 24px 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #112742;
      color: #e3dcd1;
    }
  `,

  dark: css`
    background-color: #000;
    color: #fff;
    padding: 24px 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #000;
    }
  `,
};

type ButtonType = keyof typeof type;

interface ButtonProps {
  type?: ButtonType;
}

const Button = styled.div<ButtonProps>`
  border-radius: 30px;
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  user-select: none;
  align-self: center;
  justify-self: center;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  border: 1.5px solid #0d1d32;
  letter-spacing: 0.1px;
  cursor: pointer;

  transition-property: background-color, color;
  transition-duration: 0.4s;
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
