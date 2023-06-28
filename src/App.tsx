import React from "react";
import { Routes } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <React.Suspense fallback={<>Loading...</>}>
          <Routes></Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
