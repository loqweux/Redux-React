import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setData } from "../store/slice";
import Mobile from "../mobile/Mobile";
import Order from "../order/Order";
import Basket from "../basket/Basket";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/coffees");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const coffees = await response.json();
        dispatch(setData({ coffees }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Mobile />} />
        <Route path="/order/:coffeeId" element={<Order />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default App;
