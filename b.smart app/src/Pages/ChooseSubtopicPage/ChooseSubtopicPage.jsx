import Header from "../../components/Header";
import "./ChooseSubtopicPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading"; 

const url = import.meta.env.VITE_API_URL;

export default function ChooseSubtopicPage() {
  const location = useLocation();
  const subtopics = location.state?.subtopics || [];
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [level, setLevel] = useState("beginner");
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  console.log("These are subtopics", subtopics);
  const firstSubtopic = subtopics.subtopics?.[0];

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      setLoading(true);  
      const response = await axios.post(`${url}/api/openai/search`, {
        query,
        level,
      });

      const searchData = response.data.query.query;
      setResult(searchData);
      console.log(searchData);
    } catch (error) {
      console.error("Error fetching the results:", error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query, level]);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  const handleOnClick = async (subtopic) => {
    try {
      setLoading(true);  
      const response = await axios.post(`${url}/api/openai/feed`, {
        subtopic: subtopic.name || query,
      });
      const materialsData = response.data.materials.learningMaterials;
      setLearningMaterials(materialsData);
      navigate("/feed", { state: { materials: materialsData } });
    } catch (error) {
      console.error("Error fetching learning materials:", error);
    } finally {
      setLoading(false);  
    }
  };

  const handleOtherTileClick = () => {
    setIsFormVisible((prevState) => !prevState);  
  };

  return (
    <section className="subtopics-page">
      <Header />
      <div className="subtopics-page__wrapper">
        {loading ? (
          <Loading />  
        ) : (
          <>
            <h1 className="subtopics-page__label" key={firstSubtopic?.id}>
              {`Great choice! ${firstSubtopic?.topic} is an interesting topic. Anything in particular you would like to learn more about? Feel free to adjust complexity level.`}
            </h1>
            <div className="subtopics-page__level-container">
              <div
                className={`subtopics-page__level--default ${
                  level === "beginner" ? "subtopics-page__level--active" : ""
                }`}
                onClick={() => handleLevelChange("beginner")}
              >
                Beginner
              </div>
              <div
                className={`subtopics-page__level--default ${
                  level === "intermediate" ? "subtopics-page__level--active" : ""
                }`}
                onClick={() => handleLevelChange("intermediate")}
              >
                Intermediate
              </div>
              <div
                className={`subtopics-page__level--default ${
                  level === "advanced" ? "subtopics-page__level--active" : ""
                }`}
                onClick={() => handleLevelChange("advanced")}
              >
                Advanced
              </div>
            </div>
            <div className="subtopics-page__tiles-container">
              {subtopics.subtopics?.length > 0 ? (
                <>
                  {subtopics.subtopics.map((subtopic) => {
                    const isLevelMatch = subtopic.level === level;
                    return (
                      <div
                        key={subtopic.id}
                        className={`subtopics-page__tile ${isLevelMatch ? "active" : "hidden"}`}
                        onClick={() => handleOnClick(subtopic)}
                      >
                        {subtopic.name}
                      </div>
                    );
                  })}
                  <div
                    className="subtopics-page__tile"
                    onClick={handleOtherTileClick} 
                  >
                    Other
                  </div>
                </>
              ) : (
                <p className="subtopics-page__no-results">No subtopics available</p>
              )}
            </div>

            {isFormVisible && (
              <form
                className="subtopics-page__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(query);
                }}
              >
                <label className="subtopics-page__header">
                  {`Could not find what you are looking for? Try searching for it instead!`}
                </label>
                <input
                  className="subtopics-page__input"
                  type="text"
                  placeholder="Search for what interests you"
                  onChange={handleInputChange}
                />
              </form>
            )}

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
              ) : null}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
