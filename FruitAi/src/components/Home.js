import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () =>{

  const navigate = useNavigate();

  return (
    <div className="app">

      <div className="header">
        <h1>Fruit.AI</h1>
        <p className='home-para'>"Be Healthy!"</p>
      </div>

      <div className="grid">

        <div className="box chat" onClick={() =>{
          navigate("/Chat");
        }}>
          Chat.
        </div>

        <div className="box blank1"> </div>
        <div className="box blank2"> </div>

        <div className="box translate" onClick={() =>{
          navigate("/Translate");
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg" alt="Translate" className="translate-icon" />
        </div>

        <div className="box faqs" onClick={() =>{
          navigate("/Faq");
        }}>
          FAQs
        </div>

        <div className="box about" onClick={() =>{
         navigate("/About");
        }}>
          About
        </div>

      </div>

    </div>
  );
}

export default Home;
