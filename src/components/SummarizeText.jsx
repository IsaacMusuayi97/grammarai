import {Link} from 'react-router-dom';
import React from 'react';
import './HumanizeText.css';

export default function SummarizeText() {
    return (
        <section className="humanize-text">
          <h1>Summarize <strong>your Text</strong></h1>
          <p className='bypass_text'>Turn long content into clear, concise summaries in seconds.</p>
          <p className='transform'>  Extract the key ideas from articles, documents, or AI-generated text without losing meaning. 
            Get clean, easy-to-read summaries that save time and help you focus on what matters most.
          </p>
        </section>
    );
}