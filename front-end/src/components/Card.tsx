import React from "react";
import { CardProps } from "../interfaces/Card.interface";

const Card: React.FC<CardProps> = ({ title, count }) => {
  return (
    <div className="card">
      <p className="card-count">{count}</p>
      <h2 className="card-title">{title}</h2>
    </div>
  );
};

export default Card;
