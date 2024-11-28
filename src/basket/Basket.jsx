import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, removeFromBasket } from "../store/basketSlice";
import { useNavigate } from "react-router-dom";
import connect from "../../public/mobile/connect.png";
import wifi from "../../public/mobile/wifi.png";
import battery from "../../public/mobile/Battery.png";
import buy from "../../public/mobile/Buy.png";
import "./Basket.scss";

function Basket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const basketItems = useSelector(selectBasketItems);

  useEffect(() => {
    const fetchBasketItems = async () => {
      const response = await fetch("http://localhost:5000/basket");
      const data = await response.json();
      setItems(data);
    };

    fetchBasketItems();
  }, []);

  const handleRemove = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    dispatch(removeFromBasket(id));
    try {
      await fetch(`http://localhost:5000/basket/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing from basket: ", error);
      setItems(updatedItems);
    }
  };

  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="basket">
      <div className="displayUp">
        <p>9:41</p>
        <div>
          <img src={connect} alt="connect" />
          <img src={wifi} alt="wifi" />
          <img src={battery} alt="battery" />
        </div>
      </div>
      <div className="order-header">
        <button className="back-button" onClick={() => navigate("/")}>
          &larr;
        </button>
      </div>
      <h1>My Order</h1>
      {items.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        <div className="basket-items">
          {items.map((item) => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            return (
              <div key={item.id} className="basket-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <div className="wrapperInfo">
                    <div className="info">
                      <p>{item.ristretto} |</p>
                      <p>{item.takeaway} |</p>
                      <p>{item.volume} ml</p>
                    </div>
                    <div>
                      <p className="price">BYN {itemTotal}</p>
                    </div>
                  </div>
                  <h3>x{item.quantity}</h3>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            );
          })}

          <div className="total-price">
            <div className="infoprice">
              <span>Total Price</span>
              <h3>BYN {totalPrice}</h3>
            </div>
            <button className="next-button">
              <img src={buy} alt="buy" />
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;
