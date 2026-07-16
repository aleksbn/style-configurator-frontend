import styled from "styled-components";
import { motion } from "framer-motion";
import { SlideUp } from "../../animations/Slide";
import { Button } from "../../components/style/Buttons.style";
import ModalBackdrop from "../../components/ui/ModalBackdrop";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  gap: 8px;
  position: absolute;
  bottom: 0;
  left: 0;

  > .button {
    width: 50svw;
  }

  @media (max-width: 480px) {
    > .button {
      width: 75svw;
    }
  }
`;

export default function MobileMore({
  onClose,
  actions,
}: {
  onClose: () => void;
  actions: { label: string; onClick: () => void }[];
}) {
  return (
    <ModalBackdrop onClose={onClose}>
      <Container
        as={motion.div}
        variants={SlideUp(0, 0, 0.5, 0.5, false, 400)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            type="secondary"
            onClick={action.onClick}
            className="button"
          >
            {action.label}
          </Button>
        ))}
      </Container>
    </ModalBackdrop>
  );
}
