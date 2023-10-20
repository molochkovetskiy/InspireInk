import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../App';

import './Navbar.css';

const Navbar = () => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate()
    let username = '';

    if (token) {
        username = jwt_decode(token).username;
    }

    const handleLogout = async () => {
        try {
            const res = await axios.get('users/logout', {
                headers: {
                    'x-access-token': null,
                },
            });
            if (res.status === 200) {
                setToken(null);
                navigate('/login');
            }
        } catch (error) {
            setToken(null);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Home</Link>
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/feed">Feed</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/prompts">Prompts</Link>
                </li>
                {!token ? (
                    <>
                        <li className="navbar-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <li className="navbar-item">
                        {username} | <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
