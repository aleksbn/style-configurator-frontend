import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "./animations/Fade";
import Selection from "./pages/Selection";
import MainCompose from "./pages/MainCompose";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location.pathname} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={fade(0, 0, 1, 1)}
              initial="initial"
              animate="animate"
              exit="exit"
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
              variants={fade(0, 10, 1, 1)}
              initial="initial"
              animate="animate"
              exit="exit"
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
              variants={fade(0, 10, 1, 1)}
              initial="initial"
              animate="animate"
              exit="exit"
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
      </Routes>
    </AnimatePresence>
  );
}
