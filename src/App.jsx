import { Suspense } from "react";
import {
  HomePage,
  PostTaskPage,
  BrowseTaskPage,
  LoginPage,
} from "./pages/pages";
import "react-datepicker/dist/react-datepicker.css";
import { ThreeDots } from "react-loader-spinner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "@fontsource/roboto/400.css";
import "./styles/responsive.css";
import "./styles/variables.css";
function App() {
  return (
    <Suspense
      fallback={() => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ThreeDots width={100} height={100} color="var(--primary-color)" />
        </div>
      )}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post_task" element={<PostTaskPage />} />
          <Route path="/tasks" element={<BrowseTaskPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
