import React from 'react';
import './FruitList.css';

const FruitList = ({ fruits, onFruitClick }) => {
  return (
    <div className="fruit-list">
      {fruits.map(fruit => (
        <div key={fruit._id} className="fruit-card" onClick={() => onFruitClick(fruit._id)}>
          <img src={fruit.image} alt={fruit.name} />
          <h3>{fruit.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default FruitList;
