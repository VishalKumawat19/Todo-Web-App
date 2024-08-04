
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import PageNotFound from "./pages/PageNotFound";
import LoadingPage from "./pages/LoadingPage";


function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo/data/:id" element={<EditTodo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<AddTodo />} />
          {/* <Route path="/loading" element={<LoadingPage />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
