import React from 'react'
import './About.css'
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="container1">
          <div className="content">
            <div className="about-section">
              <h1>Fruit.AI</h1>
              <p>
                Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
              </p>
              <button className="about-button">ABOUT</button>
            </div>
            
            <button className='back-btn' onClick={() =>{
                navigate("/Home");
            }}>Back</button>
          </div>
        </div>
      );
}

export default About