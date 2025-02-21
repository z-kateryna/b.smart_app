import Header from "../../components/Header";
import "./ChooseSubtopicPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export default function ChooseSubtopicPage() {
  const location = useLocation();
  const subtopics = location.state?.subtopics || [];
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [query, setQuery] = useState(""); 
  const [result, setResult] = useState(""); 
  const [level, setLevel] = useState("Beginner"); 
  const navigate = useNavigate();

  const firstSubtopic = subtopics.subtopics.find((subtopic) => subtopic);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // const defaultSubtopicsLevel = async (query, level) => {
  //   try {
  //     const response = await axios.post(`${url}/api/openai/search`, {
  //       query,
  //       level,  
  //     });

  //     const searchData = response.data.query.query;

  //     setResult(searchData);
  //     console.log(searchData);
  //   } catch (error) {
  //     console.error("Error fetching the results:", error);
  //   }
  // }

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    // defaultSubtopicsLevel(newLevel);  
  };

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const response = await axios.post(`${url}/api/openai/search`, {
        query,
        level,  
      });

      const searchData = response.data.query.query;
      setResult(searchData);
      console.log(searchData);
    } catch (error) {
      console.error("Error fetching the results:", error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);  
    }
  }, [query, level]); 

  const handleOnClick = async (subtopic) => {
    try {
      const response = await axios.post(`${url}/api/openai/feed`, {
        subtopic: subtopic.name || query,
      });
      const materialsData = response.data.materials.learningMaterials;
      setLearningMaterials(materialsData);
      navigate("/feed", { state: { materials: materialsData } });
    } catch (error) {
      console.error("Error fetching learning materials:", error);
    }
  };

  return (
    <section className="subtopics-page">
      <Header />
      <div className="subtopics-page__wrapper">
        <form
          className="subtopics-page__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
        >
          <label className="subtopics-page__label" key={firstSubtopic.id}>
            {`Great choice! ${firstSubtopic.topic} is an interesting topic. Anything in particular you would like to learn more about?`}
          </label>
          <input
            className="subtopics-page__input"
            type="text"
            placeholder="Search for what interests you"
            onChange={handleInputChange}
          />
          <div className="subtopics-page__level-container">
            <div
              className={`subtopics-page__level--default ${level === "Beginner" ? "subtopics-page__level--active" : ""}`}
              onClick={() => handleLevelChange("Beginner")}
            >
              Beginner
            </div>
            <div
              className={`subtopics-page__level--default ${level === "Intermediate" ? "subtopics-page__level--active" : ""}`}
              onClick={() => handleLevelChange("Intermediate")}
            >
              Intermediate
            </div>
            <div
              className={`subtopics-page__level--default ${level === "Advanced" ? "subtopics-page__level--active" : ""}`}
              onClick={() => handleLevelChange("Advanced")}
            >
              Advanced
            </div>
          </div>
        </form>
        <div className="subtopics-page__tiles-container">
          {result ? (
            result.length > 0 ? (
              result.map((item, index) => (
                <div
                  key={index}
                  className="subtopics-page__tile"
                  onClick={() => handleOnClick(item)}
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="subtopics-page__no-results">No results found for your query</p>
            )
          ) : subtopics.subtopics.length > 0 ? (
            subtopics.subtopics.map((subtopic) => (
              <div
                key={subtopic.id}
                className="subtopics-page__tile"
                onClick={() => handleOnClick(subtopic)}
              >
                {subtopic.name}
              </div>
            ))
          ) : (
            <p className="subtopics-page__no-results">No subtopics available</p>
          )}
        </div>
      </div>
    </section>
  );
}
