import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import './Login.css'; // reuse same styling

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            // ✅ success → redirect to login
            navigate("/login");

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                <img src={logo} alt="Logo" className="auth-logo" />
                <h1 className="auth-title">Create account</h1>
                <p className="auth-subtitle">Sign up to get started</p>

                <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="auth-button" onClick={handleSignup}>
                    Sign up
                </button>

                {error && <p className="auth-error">{error}</p>}

            </div>
            </div>
        </div>
    );
}