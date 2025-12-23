import { BrowserRouter as Router, Route, Routes } from "react-router";
import paths from "./configs/path";
import DefaultLayout from "./layout/DefaultLayout";
import LoginPage from "./pages/Auth/Login";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import ActivityPage from "./pages/Activity";
import RegisterPage from "./pages/Auth/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* No Layout */}
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.register} element={<RegisterPage />} />

          {/* Default Layout pages */}
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path={paths.searchPage} element={<SearchPage />} />
            <Route path={paths.activityPage} element={<ActivityPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
