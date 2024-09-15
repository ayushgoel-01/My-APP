import React, { useState } from 'react'
import './Translator.css'
import { useNavigate } from 'react-router-dom'

const Translator = () => {

    const navigate = useNavigate();
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");


    return (
        <div>
            <div>
                From: 
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>

                To: 
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>

            <div>
                <textarea cols='50' rows='8'></textarea>
            </div>
            <div>
                <textarea cols='50' rows='8'></textarea>
            </div>

            <button>Translate</button>
        </div>
      );
}

export default Translator;