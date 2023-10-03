import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import PromptSidebar from './PromptSidebar';

const PromptDetails = (props) => {
    const [prompt, setPrompt] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const param = useParams();

    const { token } = useContext(AppContext);

    // function formatTimestamp(timestamp) {
    //     const date = new Date(timestamp);

    //     const day = date.getDate();
    //     const month = date.toLocaleString('default', { month: 'short' });
    //     const year = date.getFullYear();
    //     const hours = date.getHours().toString().padStart(2, '0');
    //     const minutes = date.getMinutes().toString().padStart(2, '0');

    //     return `${day} ${month} ${year}, ${hours}:${minutes}`;
    // }

    useEffect(() => {
        getPromptInfo();
    }, [param.id])

    const getPromptInfo = async () => {
        try {
            const response = await axios.get(`/prompts/${param.id}`);
            const data = response.data;
            setPrompt(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitAnswer = async () => {
        const userId = jwt_decode(token).userId;
        const promptId = param.id;

        try {
            const response = await axios.post(`/users/record-answer`, {
                userId,
                promptId,
                answer: userAnswer,
            });

            if (response.status === 201) {
                console.log('Answer submitted successfully!');
            } else {
                console.error('Failed to submit answer');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="prompt-details-page">
            <div className="sidebar-container">
                <PromptSidebar />
            </div>
            <div className="prompt-detail">
                <h2>Prompt Details</h2>
                <div className="prompt-content">
                    <p>{prompt.description}</p>
                </div>
                <div className="answer-input">
                    <label>Your Answer:</label>
                    <textarea
                        rows="4"
                        cols="50"
                        onChange={(event) => setUserAnswer(event.target.value)}
                    ></textarea>
                </div>
                <button onClick={handleSubmitAnswer}>Submit Answer</button>
                <Link to='/prompts'>Back to Prompts</Link>
            </div>
        </div>
    );
}

export default PromptDetails;