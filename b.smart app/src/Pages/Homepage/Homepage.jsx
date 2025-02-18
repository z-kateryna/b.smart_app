import Header from "../../components/Header";
import "./Homepage.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [topics, setTopics] = useState([]);

  const getAllTopics = async () => {
    try {
      const allTopicsResponse = await axios.get(`http://localhost:8080/topics`);
      setTopics(allTopicsResponse.data);
    } catch(error) {
      console.error("no topics were found", error);
    }
  }

  useEffect(() => {
    getAllTopics();
  }, []);

  return (
    <section className="homepage">
      <Header />
      <div className="homepage__wrapper">
        <form className="homepage__form">
          <label className="homepage__label">
            Choose what you want to learn about
          </label>
          <input
            className="homepage__input"
            type="text"
            name=""
            placeholder="Search for topics you want to learn"
            // value={""}
            // onChange={""}
          />
        </form>
        <div className="homepage__tiles-container">
          {topics.map((topic) => {
            return (
              <div className="homepage__tile" key={topic.id}> {/* Ensure you have a unique key */}
                <img src={topic.icon} alt={`${topic.name} icon`} className="homepage__tile--icon" />
                <p>{topic.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
