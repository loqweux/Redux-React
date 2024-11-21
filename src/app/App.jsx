import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setData } from "../store/slice";
import Mobile from "../mobile/Mobile";
import CoffeePage from "../pages/CoffePage";
import DessertPage from "../pages/DesertsPage";
import SnackPage from "../pages/SnakPage";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:5000/coffees"),
          fetch("http://localhost:5000/desserts"),
          fetch("http://localhost:5000/snacks"),
        ]);
        if (!responses.every((response) => response.ok)) {
          throw new Error("One or more network responses were not ok.");
        }

        const [coffees, desserts, snacks] = await Promise.all(
          responses.map((response) => response.json())
        );
        dispatch(
          setData({
            coffees,
            desserts,
            snacks,
          })
        );
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
        <Route path="/coffees" element={<CoffeePage />} />
        <Route path="/desserts" element={<DessertPage />} />
        <Route path="/snacks" element={<SnackPage />} />
      </Routes>
    </div>
  );
}

export default App;
