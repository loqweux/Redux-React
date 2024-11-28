import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCoffees } from "../store/slice";
import { addToBasket } from "../store/basketSlice";
import { NavLink } from "react-router-dom";
import connect from "../../public/mobile/connect.png";
import wifi from "../../public/mobile/wifi.png";
import battery from "../../public/mobile/Battery.png";
import buy from "../../public/mobile/Buy.png";
import "./Order.scss";

function Order() {
  const { coffeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coffees = useSelector(selectCoffees);
  const coffee = coffees.find((c) => c.id === parseInt(coffeeId));

  const [quantity, setQuantity] = useState(1);
  const [ristretto, setRistretto] = useState("One");
  const [takeaway, setTakeaway] = useState("Onsite");
  const [volume, setVolume] = useState(350);
  const [prepareTime, setPrepareTime] = useState("18:10");
  const [timeToggle, setTimeToggle] = useState(false);

  const totalAmount = coffee ? (coffee.price * quantity).toFixed(2) : 0;

  useEffect(() => {
    if (coffee) {
      setQuantity(coffee.defaultQuantity);
      setRistretto(coffee.defaultRistretto);
      setTakeaway(coffee.defaultTakeaway);
      setVolume(coffee.defaultVolume);
    }
  }, [coffee]);

  const handleNext = async () => {
    const product = {
      name: coffee.name,
      image: coffee.image,
      price: coffee.price,
      quantity,
      ristretto,
      takeaway,
      volume,
    };

    dispatch(addToBasket(product));

    try {
      const response = await fetch("http://localhost:5000/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to save to basket");
      }

      navigate("/basket");
    } catch (error) {
      console.error("Error saving to basket: ", error);
    }
  };

  return (
    <div className="order">
      <div className="displayUp">
        <p>9:41</p>
        <div>
          <img src={connect} alt="connect" />
          <img src={wifi} alt="wifi" />
          <img src={battery} alt="battery" />
        </div>
      </div>
      <div className="order-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <h1>Order</h1>
        <NavLink to="/basket">
          <img src={buy} alt="buy" />
        </NavLink>
      </div>
      <div className="order-content">
        <div className="imgContent">
          <img
            className="coffee-image"
            src={`../../${coffee.image}`}
            alt={coffee.name}
          />
        </div>
        <div className="count-item">
          <p>{coffee.name}</p>
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <hr />

        <div className="option-group2">
          <label>Ristretto</label>
          <div className="option-buttons">
            <button
              className={ristretto === "One" ? "active" : ""}
              onClick={() => setRistretto("One")}
            >
              One
            </button>
            <button
              className={ristretto === "Two" ? "active" : ""}
              onClick={() => setRistretto("Two")}
            >
              Two
            </button>
          </div>
        </div>
        <hr />
        <div className="option-group3">
          <label>Onsite / Takeaway</label>
          <div className="option-buttons">
            <button
              className={takeaway === "Onsite" ? "active" : ""}
              onClick={() => setTakeaway("Onsite")}
            >
              Onsite
            </button>
            <button
              className={takeaway === "Takeaway" ? "active" : ""}
              onClick={() => setTakeaway("Takeaway")}
            >
              Takeaway
            </button>
          </div>
        </div>
        <hr />
        <div className="option-group4">
          <label>Volume, ml</label>
          <div className="option-buttons">
            <button
              className={volume === 250 ? "active" : ""}
              onClick={() => setVolume(250)}
            >
              250
            </button>
            <button
              className={volume === 350 ? "active" : ""}
              onClick={() => setVolume(350)}
            >
              350
            </button>
            <button
              className={volume === 450 ? "active" : ""}
              onClick={() => setVolume(450)}
            >
              450
            </button>
          </div>
        </div>
        <hr />
        <div className="option-group5">
          <label>Prepare by a certain time today?</label>
          <div className="toggle-container">
            <input
              type="checkbox"
              id="timeToggle"
              checked={timeToggle}
              onChange={() => setTimeToggle(!timeToggle)}
            />
            <label htmlFor="timeToggle" className="toggle-switch"></label>
          </div>
          {timeToggle && (
            <input
              type="time"
              value={prepareTime}
              onChange={(e) => setPrepareTime(e.target.value)}
            />
          )}
        </div>
        <hr />
        <div className="total-amount">
          <span>Total Amount</span>
          <span>BYN {totalAmount}</span>
        </div>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Order;
