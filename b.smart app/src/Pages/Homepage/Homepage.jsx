import Header from "../../components/Header";
import "./Homepage.scss";
import computerIcon from "../../assets/icons/computer-icon.svg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  const getAllTopics = async () => {
    try {
      const allTopicsResponse = await axios.get(`http://localhost:8080/topics`);
      setTopics(allTopicsResponse.data);
    } catch (error) {
      console.error("No topics were found", error);
    }
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); 
  };

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
            value={searchQuery}
            onChange={handleSearchChange} 
            placeholder="Search for topics you want to learn"
          />
        </form>
        <div className="homepage__tiles-container">
          {filteredTopics.length === 0 ? (
            <p>No topics found</p>
          ) : (
            filteredTopics.map((topic) => {
              return (
                <div className="homepage__tile" key={topic.id}>
                  <img
                    src={topic.icon}
                    alt={`${topic.name} icon`} 
                  />
                  <p>{topic.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
