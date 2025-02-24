import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/Homepage/Homepage";
import ChooseSubtopicPage from "./Pages/ChooseSubtopicPage/ChooseSubtopicPage";
import FeedPage from "./Pages/FeedPage/FeedPage";
import Loading from "./components/Loading";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/choose-subtopic" element={<ChooseSubtopicPage />}/>
        <Route path="/feed" element={<FeedPage />}/>
        <Route path="/loading" element={<Loading/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
