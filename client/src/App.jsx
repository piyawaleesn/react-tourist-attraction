import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState("");
  const [title, setTitle] = useState([]);

  const inputHandler = (e) => {
    setTextInput(e);
    getApi();
  };

  useEffect(() => {
    getApi();
  }, [textInput]);

  const getApi = async () => {
    try {
      const fetchData = await axios.get(
        `http://localhost:4001/trips?keywords=${textInput}`
      );
      console.log(fetchData);
      setTitle(fetchData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="header-text">
        <h1>เที่ยวไหนดี</h1>
      </div>

      <div className="search-section">
        <div className="title">ค้นหาที่เที่ยว</div>
        <div className="search-box">
          <label>
            <input
              type="text"
              placeholder="หาที่เที่ยวแล้วไปกัน..."
              onChange={(e) => {
                inputHandler(e.target.value);
              }}
            ></input>
          </label>
        </div>
      </div>

      <div className="displays">
        <ul>
          {title.map((item, index) => {
            const truncatedDescription =
              item.description.length > 100
                ? item.description.slice(0, 100) + "..."
                : item.description;
            return (
              <li key={index}>
                <div className="display-box">
                  <div className="images">
                    <img src={item.photos[1]} alt={item.title} />
                  </div>
                  <div className="display-text">
                    <h3>{item.title}</h3>
                    <div className="display-description">
                      {truncatedDescription}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      อ่านต่อ
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
