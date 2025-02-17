import Header from "../../components/Header";
import "./Homepage.scss";

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
            value={""}
            onChange={""}
          />
        </form>
        <ul className="homepage__tiles-container">
          <li className="homepage__tile">
            <img />
            <p>Coding</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
