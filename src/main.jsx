import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./components/Theme/context";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ReduxProvider>,
);
