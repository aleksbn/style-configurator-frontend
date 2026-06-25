import React, { useLayoutEffect, useState } from "react";
import { BackgroundOverlay } from "../../components/style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import styled from "styled-components";
import { fadeAndIncrease } from "../../animations/Fade";
import { Button } from "../../components/style/Buttons.style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: 80%;
  width: 40%;
  padding: 5%;
  background-color: rgba(240, 248, 255, 1);
  border-radius: 50px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 1px;
  position: absolute;
  top: 3%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  padding-bottom: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  padding-bottom: 30px;

  &.error {
    padding-bottom: 16px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 8px;
  font-size: 1rem;

  &.error {
    border-color: red;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 2px;
`;

const ModalButton = styled(Button)`
  background-color: #000;
  color: #fff;
  padding: 24px 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #fff;
    color: #000000;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default function DownloadDialog({
  onClose,
  transitionTime = 0.3,
  onClick,
}: {
  onClose: () => void;
  transitionTime?: number;
  onClick: (
    fullName: string,
    phone: string,
    email: string,
    fulladdress: string,
  ) => void;
}) {
  const [errors, setErrors] = useState({
    fullName: null,
    email: null,
    phone: null,
    fullAddress: null,
  });
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    fullAddress: "",
  });
  const [buttonWidth, setButtonWidth] = useState(50);

  useLayoutEffect(() => {
    setButtonWidth(document.querySelector("#fullName")?.offsetWidth || 50);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmed = value.trim();
    let emptyErrorText = "";
    let specificErrorText = "";
    switch (name) {
      case "fullName": {
        emptyErrorText = "Full name is required";
        specificErrorText =
          "Invalid name format - must have at least two words with no numbers";
        break;
      }
      case "email": {
        emptyErrorText = "Email is required";
        specificErrorText = "Invalid email format - must be a valid email";
        break;
      }
      case "phone": {
        emptyErrorText = "Phone number is required";
        specificErrorText =
          "Invalid phone number format - must have 7-15 numbers";
        break;
      }
      case "fullAddress": {
        emptyErrorText = "Address is required";
        specificErrorText = "Invalid address format - must have 10 letters";
        break;
      }
    }

    if (!trimmed || !checkIfItIs(name, trimmed)) {
      setErrors((prev) => ({
        ...prev,
        [name]: !trimmed ? emptyErrorText : specificErrorText,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const checkIfItIs = (type: string, value: string): boolean => {
    switch (type) {
      case "fullName":
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/.test(
          value.trim(),
        );
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      case "phone":
        return /^\+?[\d\s\-().]{7,15}$/.test(value.trim());
      case "fullAddress":
        return /^[a-zA-Z0-9\s,.''-]{10,}$/.test(value.trim());
      default:
        return false;
    }
  };

  const handleOnClick = () => {
    onClick(
      formValues.fullName,
      formValues.phone,
      formValues.email,
      formValues.fullAddress,
    );
  };

  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      onClick={onClose}
    >
      <Container
        as={motion.div}
        variants={fadeAndIncrease(0, 0, 0.3, 0.3)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <Title>We need some data for the receipt</Title>
        <InputContainer className={errors.fullName ? "error" : ""}>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            className={errors.fullName ? "error" : ""}
            id="fullName"
            name="fullName"
            type="text"
            maxLength={50}
            required
            autoFocus
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Error>{errors.fullName}</Error>
        </InputContainer>
        <InputContainer className={errors.fullAddress ? "error" : ""}>
          <Label htmlFor="fullAddress">Full address</Label>
          <Input
            className={errors.fullName ? "error" : ""}
            id="fullAddress"
            name="fullAddress"
            type="text"
            maxLength={100}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Error>{errors.fullAddress}</Error>
        </InputContainer>
        <InputContainer className={errors.phone ? "error" : ""}>
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            className={errors.fullName ? "error" : ""}
            id="phoneNumber"
            name="phone"
            type="tel"
            maxLength={15}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Error>{errors.phone}</Error>
        </InputContainer>
        <InputContainer className={errors.email ? "error" : ""}>
          <Label htmlFor="email">Email address</Label>
          <Input
            className={errors.fullName ? "error" : ""}
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Error>{errors.email}</Error>
        </InputContainer>
        <ModalButton
          style={{ width: buttonWidth }}
          onClick={handleOnClick}
          className={
            !formValues.fullName ||
            !formValues.phone ||
            !formValues.email ||
            !formValues.fullAddress ||
            errors.fullName ||
            errors.phone ||
            errors.email ||
            errors.fullAddress
              ? "disabled"
              : ""
          }
        >
          Download PDF
        </ModalButton>
      </Container>
    </BackgroundOverlay>
  );
}
