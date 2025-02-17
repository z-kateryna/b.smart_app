import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/Homepage/Homepage";
import ChooseSubtopicPage from "./Pages/ChooseSubtopicPage/ChooseSubtopicPage";
import FeedPage from "./Pages/FeedPage/FeedPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/subtopic" element={<ChooseSubtopicPage />}/>
        <Route path="/feed" element={<FeedPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
