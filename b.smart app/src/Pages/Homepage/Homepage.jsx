import "./Homepage.scss";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL; 

export default function Homepage() {
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();  
  const [subtopics, setSubtopics] = useState([])

  useEffect(() => {
    const getAllTopics = async () => {
      try {
        const response = await axios.get(`${url}/topics`);
        // console.log("Topics Response:", response.data);
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    getAllTopics();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOnClick = async (topic) => {
    try {
      const response = await axios.post(`${url}/api/openai`, { topic: topic.name });
      const subtopicsData = response.data;
      setSubtopics(subtopicsData); 
  
      // console.log("Subtopics received from API:", subtopicsData);
  
      navigate('/choose-subtopic', {
        state: { subtopics: subtopicsData }
      });
  
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    }
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
            filteredTopics.map((topic) => (
              <div
                className="homepage__tile"
                key={topic.id}
                onClick={() => handleOnClick(topic)}  
              >
                <img
                  className="homepage__icon"
                  src={topic.icon}
                  alt={`${topic.name} icon`}
                />
                <p>{topic.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
