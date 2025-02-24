import Header from "../../components/Header";
import "./FeedPage.scss";
import thumbsUp from "../../assets/icons/Thumbs up.svg";
import thumbsDowm from "../../assets/icons/Thumbs down.svg";
import { useLocation } from "react-router-dom";

export default function FeedPage() {
  const location = useLocation();
  const materials = location.state?.materials || [];

  return (
    <section className="feed">
      <Header />
      <div className="feed__wrapper">
        {materials.length > 0 ? (
          materials.map((material, index) => (
            <div className="feed__card-container" key={index}>
              <div className="feed__card">
                {/* <h3>{material.name}</h3> */}
                <p>{material.content}</p>
              </div>
              <div className="feed__icons-container">
                <div className="feed__container--left">
                  <p className="feed__copy">Got it</p>
                  <img
                    className="feed__icon--left"
                    src={thumbsUp}
                    alt="thumbs up icon"
                  />
                </div>
                <div className="feed__container--right">
                  <p className="feed__copy">Confused</p>
                  <img
                    className="feed__icon--right"
                    src={thumbsDowm}
                    alt="thumbs down icon"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No material was found</p>
        )}
      </div>
    </section>
  );
}
