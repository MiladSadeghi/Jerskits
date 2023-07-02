import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout, Layout } from "./components";
import { SignIn, SignUp } from "./pages";
import "swiper/css";

function App() {
  return (
    <div>
      <main>
        <React.Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Layout />}></Route>
            <Route
              path="/sign-in"
              element={<AuthenticationLayout children={<SignIn />} />}
            />
            <Route
              path="/sign-up"
              element={<AuthenticationLayout children={<SignUp />} />}
            />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
