import React from "react";
import { useSelector } from "react-redux";
import { selectCoffees } from "../../store/slice";
import "../Mobile.scss";
import nav1 from "../../../public/mobile/nav/nav1.png";
import nav2 from "../../../public/mobile/nav/nav2.png";
import nav3 from "../../../public/mobile/nav/nav3.png";

function MobileMain() {
  const coffees = useSelector(selectCoffees);
  return (
    <div className="main">
      <div className="mainChoose">
        <p>Select your coffee</p>
      </div>
      <div className="wrapperChoose">
        {coffees.map((coffee, index) => (
          <div key={index} className={`item${index + 1}`}>
            <img src={coffee.image} alt={coffee.name} />
            <p>{coffee.name}</p>
          </div>
        ))}
      </div>
      <div className="wrapperNav">
        <img src={nav1} alt="nav1" />
        <img src={nav2} alt="nav2" />
        <img src={nav3} alt="nav3" />
      </div>
    </div>
  );
}

export default MobileMain;
