import { BrowserRouter as Router, Route, Routes } from "react-router";
import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/Auth/Login";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import ActivityPage from "./pages/Activity";
import RegisterPage from "./pages/Auth/Register";
import ForgotPasswordPage from "./pages/Auth/ForgotPassword";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
import ProfilePage from "./pages/Profile";
import PostDetail from "./pages/Post/PostDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* No Layout */}
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.register} element={<RegisterPage />} />
          <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
          <Route path={paths.resetPassword} element={<ResetPasswordPage />} />

          {/* Default Layout pages */}
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path={paths.searchPage} element={<SearchPage />} />
            <Route path={paths.activityPage} element={<ActivityPage />} />
            <Route path={paths.profilePage} element={<ProfilePage />} />

            {/* More pages */}
            <Route path={paths.postDetail} element={<PostDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
