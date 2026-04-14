import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import './Login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
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

            // Store the token in localStorage
            localStorage.setItem('token', data.token);

            // ✅ success → redirect to humanize
            navigate("/humanize");


            console.log("TOKEN:", data.token);

        } catch (err) {
            console.error(err);
            setError("Something has gone wrong");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                    <img src={logo} alt="Logo" className="auth-logo" />
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to your account</p>

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

                    <button className="auth-button" onClick={handleLogin}>
                        Login
                    </button>

                    {error && <p className="auth-error">{error}</p>}

                </div>
            </div>
        </div>
    );
}
