import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  text-align: center;
`;

const Illustration = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  max-width: 550px;
  line-height: 1.7;
  opacity: 0.75;
  margin-bottom: 3rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  font-size: 1rem;
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  border: 1px solid currentColor;
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Illustration>👕</Illustration>

      <Title>Oops!</Title>

      <Subtitle>This outfit doesn't exist.</Subtitle>

      <Description>
        The page you're looking for may have been moved, removed, or never
        stitched together.
      </Description>

      <Buttons>
        <Button onClick={() => navigate("/")}>Back Home</Button>

        <SecondaryButton onClick={() => navigate(-1)}>
          Start Designing
        </SecondaryButton>
      </Buttons>
    </Container>
  );
}
