import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import styled from "styled-components";
import Navbar from "./components/ui/Navbar";

const AppWrapper = styled.div`
  height: 100%;
  margin: auto;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppWrapper>
      <Navbar />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
