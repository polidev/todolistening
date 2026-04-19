import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Header from "./components/layout/header/header.tsx";

const Home = lazy(() => import("./pages/home.tsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
