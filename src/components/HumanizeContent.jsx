import React from 'react';
import { useState } from 'react';
import './HumanizeContent.css';

export default function HumanizeContent() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const errorMessages = {
        TEXT_REQUIRED: "Please enter some text",
        TEXT_TOO_SHORT: "Text is too short (min 250 characters)",
        TEXT_TOO_LONG: "Text is too long (max 10,000 characters)",
        UNAUTHORIZED: "You should be logged in to use this feature"
    };

    const handleCopy = async () => {
        if (!outputText) return;

        try {
            await navigator.clipboard.writeText(outputText);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const displayContent = async() => {

        if (!inputText.trim()) {
            setError("Please enter some text");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/humanize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: JSON.stringify({ text: inputText })
            });
            const data = await response.json();
            if (data.error) {
                setError(errorMessages[data.error]||'Something went wrong');
                setOutputText("");
                return;
            }

            setOutputText(data.result);
        
        } catch (error) {
            console.error('Error humanizing content:', error);
            setError('An error occurred while processing your request. Please try again later.');
            setOutputText("");
            
        } finally {
            setIsLoading(false);
        }

    };
    return (
        <section className='humanize-container'>
            {error && (
                        <p className='humanize__error'>{error}</p>
                    )}
            <section className="humanize">
            <section className='humanize__input-section'>
                <textarea className='humanize__input' placeholder='Insert text here' value={inputText} onChange={(e) => setInputText(e.target.value)}>
                </textarea>
            </section> 
            <section className='humanize__output' placeholder='Your humanized text will appear here'>
                {isLoading ? (
                        <div className="loading">
                        <span className="spinner"></span>
                        <h3>Humanizing your text...</h3>
                        </div>
                    ) : (
                        <>
                               {outputText && (
                                <button className="copy-btn" onClick={handleCopy}>
                                    Copy
                                </button>
                        )}
                           <p className="humanize__output-text">
                                {outputText || "Your humanized text will appear here..."}
                            </p>
                        </>
                    )}
            </section> 
            </section>
            <button className='humanize__btn' onClick={displayContent}>
                {isLoading ? 'Humanizing...' : 'Humanize'}
            </button>
        </section>
    );
}
