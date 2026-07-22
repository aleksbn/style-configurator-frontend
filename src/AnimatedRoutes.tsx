import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "./animations/Fade";
import { animated } from "./animations/Motion";
import Selection from "./pages/Selection";
import MainCompose from "./pages/MainCompose";
import Final from "./pages/Final";
import NotFound from "./pages/NotFound";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              {...animated(fade(0, 0, 1, 1))}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Landing />
            </motion.div>
          }
        />
        <Route
          path="/products"
          element={
            <motion.div
              {...animated(fade(0, 0, 1, 1))}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Selection />
            </motion.div>
          }
        />
        <Route
          path="/compose"
          element={
            <motion.div
              {...animated(fade(1, 0, 1, 1))}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <MainCompose />
            </motion.div>
          }
        />
        <Route
          path="/final"
          element={
            <motion.div
              {...animated(fade(1, 0, 1, 1))}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Final />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              {...animated(fade(1, 0, 1, 1))}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
