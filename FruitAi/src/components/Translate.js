import React, { useState, useEffect } from "react";
import countries from "../data";
import './Translate.css';
import { useNavigate } from "react-router-dom";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("hi-IN");
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs only on initial render to populate language options
  }, []);

  const handleTranslate = async () => {
    if (!fromText.trim()) return;
    setToText("Translating...");
    const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setToText(data.responseData.translatedText || "Translation failed");
    } catch (error) {
      setToText("Translation error");
    }
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeech = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/Home")}>Back</button>
      <div className="container1">
        <div className="wrapper1">
          <h1>Text Translator</h1>
          <div className="text-input">
            <textarea
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
              placeholder="Enter text"
              className="from-text"
            />
            <textarea
              value={toText}
              readOnly
              placeholder="Translation"
              className="to-text"
            />
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i
                  className="fas fa-volume-up"
                  onClick={() => handleSpeech(fromText, fromLanguage)}
                ></i>
                <i
                  className="fas fa-copy"
                  onClick={() => handleCopy(fromText)}
                ></i>
              </div>
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
              >
                {Object.keys(countries).map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countries[countryCode]}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange">
              <i className="fas fa-exchange-alt" onClick={handleExchange}></i>
            </li>
            <li className="row to">
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
              >
                {Object.keys(countries).map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countries[countryCode]}
                  </option>
                ))}
              </select>
              <div className="icons">
                <i
                  className="fas fa-volume-up"
                  onClick={() => handleSpeech(toText, toLanguage)}
                ></i>
                <i
                  className="fas fa-copy"
                  onClick={() => handleCopy(toText)}
                ></i>
              </div>
            </li>
          </ul>
          <button onClick={handleTranslate}>Translate Text</button>
        </div>
      </div>
    </>
  );
};

export default Translate;
