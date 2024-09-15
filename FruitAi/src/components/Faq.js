import React, { useState, useEffect } from 'react';
import './Faq.css';
import fruitImg from '../images/fruit.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Faq = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [editFAQ, setEditFAQ] = useState(null);
  const [newFAQ, setNewFAQ] = useState({ fruitName: '', question: '', answer: '' });
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const result = await axios.get(`${apiBaseUrl}/api/faqs`);
        setFaqs(result.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, [apiBaseUrl]);

  // Handle input change
  const handleChange = (e) => {
    setNewFAQ({ ...newFAQ, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a new FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/api/faqs`, newFAQ);
      setNewFAQ({ fruitName: '', question: '', answer: '' });  // Clear form after submission
      const result = await axios.get(`${apiBaseUrl}/api/faqs`);
      setFaqs(result.data);  // Refresh FAQs after submission
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  // Handle FAQ Updation
  const handleEdit = (id) => {
    const faqToEdit = faqs.find(faq => faq._id === id);
    setEditFAQ(faqToEdit);
  };

  const handleEditChange = (e) => {
    setEditFAQ({ ...editFAQ, [e.target.name]: e.target.value });
  };
  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiBaseUrl}/api/faqs/${editFAQ._id}`, editFAQ);
      setFaqs(faqs.map(faq => faq._id === editFAQ._id ? editFAQ : faq));
      setEditFAQ(null);  // Hide the update form after submission
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };
  
  const cancelEdit = () => {
    setEditFAQ(null);
  };
  

  // Handle FAQ deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/api/faqs/${id}`);
      if (response.status === 200) { 
        setFaqs(faqs.filter(faq => faq._id !== id));  // Update FAQs after deletion
      } else {
        console.error('Error deleting FAQ: ', response);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="faq-container">
        <button className='back-btn' onClick={() =>{
            navigate("/Home")
        }}>Back</button>
      <h1 className="faq-header">FAQ Section</h1>
  
      <form onSubmit={handleSubmit} className="faq-form">
        <input
          type="text"
          name="fruitName"
          value={newFAQ.fruitName}
          onChange={handleChange}
          placeholder="Fruit Name"
          required
        />
        <input
          type="text"
          name="question"
          value={newFAQ.question}
          onChange={handleChange}
          placeholder="Question"
          required
        />
        <textarea
          name="answer"
          value={newFAQ.answer}
          onChange={handleChange}
          placeholder="Answer"
          required
        />
        <button type="submit">Add FAQ</button>
      </form>
  
      <div className="faq-cards">

        {faqs.map(faq => (

          <div className="faq-card" key={faq._id}>

            <div className="faq-card-image">
              <img src={fruitImg} alt={faq.fruitName} />
              <p className="fruit-name">{faq.fruitName}</p>
            </div>
            
            <div className="faq-card-content">
              <h2 className="faq-card-question">{faq.question}</h2>
              <p className="faq-card-answer">{faq.answer}</p>
            </div>
            <div className="faq-card-actions">
              <button 
                onClick={() => handleEdit(faq._id)} 
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(faq._id)} 
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
          
        ))}

      </div>
  

      {editFAQ && (
        <form onSubmit={handleUpdateSubmit} className="faq-form update-form">
          <input
            type="text"
            name="fruitName"
            value={editFAQ.fruitName}
            onChange={handleEditChange}
            placeholder="Fruit Name"
            required
          />
          <input
            type="text"
            name="question"
            value={editFAQ.question}
            onChange={handleEditChange}
            placeholder="Question"
            required
          />
          <textarea
            name="answer"
            value={editFAQ.answer}
            onChange={handleEditChange}
            placeholder="Answer"
            required
          />
          <button type="submit">Update FAQ</button>
          <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
      )}
    </div>
  );
  
};

export default Faq;
