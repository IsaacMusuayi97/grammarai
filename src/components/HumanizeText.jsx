import {Link} from 'react-router-dom';
import React from 'react';
import './HumanizeText.css';

export default function HumanizeText() {
    return (
        <section className="humanize-text">
          <h1>Humanize <strong>AI Text</strong></h1>
          <p className='bypass_text'>Bypass AI detection and make your content sound truly human.</p>
          <p className='transform'>Transform robotic generated content from ChaGPT, Claude, or Gemini into natural,
            undetectable prose that resonates with real readers and search engines.
          </p>
        </section>
    );
}