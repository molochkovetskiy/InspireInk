import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AppContext } from '../App';

function LoginRegister(props) {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const { setToken } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (props.title === 'Register') {
            try {
                const response = await fetch('/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.status === 200) {
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await fetch('/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setToken(data.token);
                    navigate('/prompts');
                } else {
                    // Handle login failure
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <h2>{props.title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <button type="submit">{props.title}</button>
            </form>
        </div>
    );
};

export default LoginRegister;
