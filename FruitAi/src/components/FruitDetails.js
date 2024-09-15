import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './FruitDetails.css';

const FruitDetails = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();  // Get the ID from the URL
  const [fruit, setFruit] = useState(null);

  useEffect(() => {
    const fetchFruitDetails = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+`/api/faqs/${id}`);  // Fetch fruit details using ID
        setFruit(response.data);
      } catch (error) {
        console.error('Error fetching fruit details:', error);
      }
    };

    fetchFruitDetails();
  }, [id]);

  return (
    <div className="fruit-details">
        <button className='back-btn' onClick={() =>{
            navigate("/Chat");
        }}>Back</button>
      {fruit ? (
        <div>
          <h2>{fruit.fruitName}</h2>
          <p><strong>Question:</strong> {fruit.question}</p>
          <p><strong>Answer:</strong> {fruit.answer}</p>
        </div>
      ) : (
        <p>Loading fruit details...</p>
      )}
    </div>
  );
};

export default FruitDetails;
