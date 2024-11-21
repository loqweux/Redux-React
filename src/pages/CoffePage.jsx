import React from "react";
import { useSelector } from "react-redux";
import { selectCoffees } from "../store/slice";

function CoffeePage() {
  const coffees = useSelector(selectCoffees);

  return (
    <div>
      <h1>Coffee Selection</h1>
      <div className="wrapperChoose">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="item">
            <img src={coffee.image} alt={coffee.name} />
            <p>{coffee.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoffeePage;
