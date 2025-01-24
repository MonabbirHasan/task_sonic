import { Suspense } from "react";
import { HomePage, PostTaskPage, BrowseTaskPage } from "./pages/pages";
import { ThreeDots } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import "./styles/variables.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
function App() {
  return (
    <Suspense
      fallback={() => (
        <div>
          <ThreeDots width={100} height={50} color="orangered" />
        </div>
      )}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post_task" element={<PostTaskPage />} />
        <Route path="/tasks" element={<BrowseTaskPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
