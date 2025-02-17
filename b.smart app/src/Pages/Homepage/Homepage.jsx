import Header from "../../components/Header";
import "./Homepage.scss";
import computerIcon from "../../assets/icons/computer-icon.svg"

export default function Homepage() {
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
          <div className="homepage__tile">
            <img src={computerIcon} alt="computer icon"/>
            <p>Coding</p>
          </div>
        </div>
      </div>
    </section>
  );
}
