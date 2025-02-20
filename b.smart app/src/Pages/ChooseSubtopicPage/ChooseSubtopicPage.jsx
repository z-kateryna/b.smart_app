import Header from "../../components/Header";
import "./ChooseSubtopicPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL; 

export default function ChooseSubtopicPage() {
  const location = useLocation();
  const subtopics = location.state?.subtopics || [];
  const [learningMaterials, setLearningMaterials] = useState([]);
  const navigate = useNavigate();  
  // console.log("Subtopics from state:", subtopics);

  const firstSubtopic = subtopics.subtopics.find(subtopic => subtopic);

  const handleOnClick = async (subtopic) => {
    try {
      const response = await axios.post(`${url}/api/openai/feed`, { subtopic: subtopic.name });
      const materialsData = response.data.materials.learningMaterials;  // Correctly access the learningMaterials array
      setLearningMaterials(materialsData);  // Store it in the state
      console.log("Learning materials received from API:", materialsData);

      // You may navigate or do other things with the learning materials here.
      navigate('/feed', { state: { materials: materialsData } });

    } catch (error) {
      console.error("Error fetching learning materials:", error);
    }
  };
  

  return (
    <section className="subtopics-page">
      <Header />
      <div className="subtopics-page__wrapper">
        <form className="subtopics-page__form">
          <label className="subtopics-page__label" key={firstSubtopic.id} >
            {`Great choice! ${firstSubtopic.topic} has so much to offer. What interests you in particular?`}
          </label>
          <input
            className="subtopics-page__input"
            type="text"
            placeholder="Search for what interests you"
          />
          <div className="subtopics-page__level-container">
            <div className="subtopics-page__level--default  subtopics-page__level--active">
              Beginner
            </div>
            <div className="subtopics-page__level--default">"Intermediate</div>
            <div className="subtopics-page__level--default">Advanced</div>
          </div>
        </form>
        <div className="subtopics-page__tiles-container">
          {subtopics.subtopics.length > 0 ? (
            subtopics.subtopics.map((subtopic) => {
              // console.log("Rendering subtopic:", subtopic);
              return (
                <div key={subtopic.id} className="subtopics-page__tile" onClick={() => handleOnClick(subtopic)}>
                  {subtopic.name}
                </div>
              );
            })
          ) : (
            <p className="subtopics-page__no-results">No subtopics available</p>
          )}
        </div>
      </div>
    </section>
  );
}
