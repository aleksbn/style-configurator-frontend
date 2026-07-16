import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import styled from "styled-components";
import Navbar from "./components/ui/Navbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchModels } from "./store/slices/modelSlice";
import Spinner from "./components/ui/Spinner";

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
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.models);

  useEffect(() => {
    void dispatch(fetchModels());
  }, [dispatch]);

  if (loading) return <Spinner fullScreen size={64} text="Loading all models" />;
  if (error) return <div>{error}</div>;

  return (
    <AppWrapper>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
