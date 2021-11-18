import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import PostDetail from "./pages/PostDetail";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/detail/:postId/*" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default Routers;
