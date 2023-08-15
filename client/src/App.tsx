import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout, Layout } from "./components";
import { SignIn, SignUp } from "./pages";
import Profile from "./pages/Profile/Profile";
import "swiper/css";
import Edit from "./pages/Profile/components/Edit/Edit";
import Favorites from "./pages/Profile/components/Favorites";
import Orders from "./pages/Profile/components/Orders";
import Setting from "./pages/Profile/components/Setting";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<Profile />}>
              <Route path="edit" element={<Edit />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="orders" element={<Orders />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Route>
          <Route
            path="/sign-in"
            element={<AuthenticationLayout children={<SignIn />} />}
          />
          <Route
            path="/sign-up"
            element={<AuthenticationLayout children={<SignUp />} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
