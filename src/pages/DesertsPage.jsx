import React from "react";
import { useSelector } from "react-redux";
import { selectDesserts } from "../store/slice";

function DessertPage() {
  const desserts = useSelector(selectDesserts);

  return (
    <div>
      <h1>Dessert Selection</h1>
      <div className="wrapperChoose">
        {desserts.map((dessert) => (
          <div key={dessert.id} className="item">
            <img src={dessert.image} alt={dessert.name} />
            <p>{dessert.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DessertPage;
