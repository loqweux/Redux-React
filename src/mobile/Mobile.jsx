import React from "react";
import { NavLink } from "react-router-dom";
import connect from "../../public/mobile/connect.png";
import wifi from "../../public/mobile/wifi.png";
import battery from "../../public/mobile/Battery.png";
import buy from "../../public/mobile/Buy.png";
import man from "../../public/mobile/Profile.svg";
import MobileMain from "./main/MobileMain";
import "./Mobile.scss";

function Mobile(props) {
  return (
    <div className="mobile">
      <div className="header">
        <div className="displayUp">
          <p>9:41</p>
          <div>
            <img src={connect} alt="connect" />
            <img src={wifi} alt="wifi" />
            <img src={battery} alt="battery" />
          </div>
        </div>
        <div className="welcome">
          <div className="pWelcome">
            <p>Welcome!</p>
            <span>Alex</span>
          </div>
          <div className="shopWelcome">
            <img src={buy} alt="buy" />
            <img src={man} alt="man" />
          </div>
        </div>
      </div>
      <MobileMain />
      <div className="navigation">
        <NavLink to="/coffees" activeClassName="active-link">
          Coffees
        </NavLink>
        <NavLink to="/desserts" activeClassName="active-link">
          Desserts
        </NavLink>
        <NavLink to="/snacks" activeClassName="active-link">
          Snacks
        </NavLink>
      </div>
    </div>
  );
}

export default Mobile;
