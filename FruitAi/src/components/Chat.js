import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  // Fetch fruit names (FAQs) from the backend when the component mounts
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/api/faqs'); 
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []);

  // Handle fruit click to navigate to fruit details page
  const handleFruitClick = (id) => {
    navigate(`/fruit/${id}`);  // Navigate to the FruitDetails page
  };

  return (
    <div className="chat-container">
        <button className='back-btn' onClick={() =>{
            navigate("/Home")
        }}>Back</button>

        <h1>All Chats</h1>
      <div className="fruit-list">
        {faqs.map(faq => (
          <div key={faq._id} className="fruit-card" onClick={() => handleFruitClick(faq._id)}>
            <h3>{faq.fruitName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
