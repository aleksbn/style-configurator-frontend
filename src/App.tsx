import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import styled from "styled-components";
import Navbar from "./components/ui/Navbar";
import { useEffect } from "react";
import Api from "./Api/ApiHelper";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchModels } from "./store/slices/modelSlice";

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
  const { models, loading, error } = useAppSelector((state) => state.models);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
