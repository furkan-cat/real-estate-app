import { useEffect, useState } from "react";
import img from "./assets/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg";
import axios from "axios";
import "./App.scss";

function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(6);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeHandler = (e) => {
    if (filteredData != "" && filteredData.length >= 3) {
      var input = e.target.value;
      const newData = data.filter((item) =>
        item.title
          .toString()
          .toLowerCase()
          .includes(input.toString().toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  const showHandler = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://603e38c548171b0017b2ecf7.mockapi.io/homes"
      );
      const data = response.data.map((item) => {
        return {
          ...item,
          img,
        };
      });
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const imgContainerClasses = (type) => {
    return type == "IndependentLiving" ? (
      <div className="img-container__subitem green">{type}</div>
    ) : (
      <div className="img-container__subitem orangered">{type}</div>
    );
  };

  return (
    <div className="wrapper">
      {isLoading ? (
        <div className="isLoading-container">
          <h1 className="isLoading-container__item">
            Please wait when fetching proses is loading!
          </h1>
        </div>
      ) : (
        <div>
          <div className="header">
            <h1>Our Latests Developments</h1>
          </div>
          <div className="filter-container">
            <span className="filter">Filter:</span>
            <input type="text" className="input" onChange={changeHandler} />
          </div>

          <div className="content">
            {filteredData.slice(0, visible).map((item, i) => (
              <div className="card" key={item.id}>
                <div className="img-container">
                  <img src={item.img} className="img-container__item" />
                  {imgContainerClasses(item.type)}
                </div>
                <div className="card-body">
                  <h5 className="card-body__title">{item.title}</h5>
                  <p className="card-body__address">{item.address}</p>
                  <p className="card-body__text">
                    New Properties for Sale from
                    <span className="card-body__price"> £{item.price}</span>
                  </p>
                  <p className="card-body__subtext">
                    Shared Ownership Available
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-container">
            <button onClick={showHandler}>See More</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
