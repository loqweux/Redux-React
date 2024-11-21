import React from "react";
import { useSelector } from "react-redux";
import { selectSnacks } from "../store/slice";

function SnackPage() {
  const snacks = useSelector(selectSnacks);

  return (
    <div>
      <h1>Snack Selection</h1>
      <div className="wrapperChoose">
        {snacks.map((snack) => (
          <div key={snack.id} className="item">
            <img src={snack.image} alt={snack.name} />
            <p>{snack.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SnackPage;
