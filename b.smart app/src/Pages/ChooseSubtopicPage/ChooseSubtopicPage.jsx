import Header from "../../components/Header";
import "./ChooseSubtopicPage.scss";
import { useLocation } from "react-router-dom";

export default function ChooseSubtopicPage() {
  const location = useLocation();
  const subtopics = location.state?.subtopics || [];
  console.log("Subtopics from state:", subtopics);

  return (
    <section className="subtopics-page">
      <Header />
      <div className="subtopics-page__wrapper">
        <form className="subtopics-page__form">
          <label className="subtopics-page__label">
            Choose what you want to learn about
          </label>
          <input
            className="subtopics-page__input"
            type="text"
            placeholder="Search for subtopics you want to learn"
          />
        </form>
        <div className="subtopics-page__tiles-container">
          {subtopics.subtopics.length > 0 ? (
            subtopics.subtopics.map((subtopic) => {
              console.log("Rendering subtopic:", subtopic); 
              return (
                <div key={subtopic.id} className="subtopics-page__tile">
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
