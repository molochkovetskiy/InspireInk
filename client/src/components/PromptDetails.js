import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import PromptSidebar from './PromptSidebar';

const PromptDetails = (props) => {
    const [promptInfo, setPromptInfo] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const { id } = useParams();
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
        fetchPromptInfo();
        fetchUserAnswer();
    }, [id])

    const fetchUserAnswer = async () => {
        const userId = jwt_decode(token).userId;

        try {
            const response = await axios.get(`/users/user-answer?userId=${userId}&promptId=${id}`);
            const userAnswerData = response.data;

            if (userAnswerData.length !== 0) {
                setUserAnswer(userAnswerData[0].answer);
            } else {
                setUserAnswer('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPromptInfo = async () => {
        try {
            const response = await axios.get(`/prompts/${id}`);
            const promptData = response.data;
            setPromptInfo(promptData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitAnswer = async () => {
        const userId = jwt_decode(token).userId;

        try {
            const response = await axios.post(`/users/record-answer`, {
                userId,
                promptId: id,
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
                    <p>{promptInfo.description}</p>
                </div>
                {userAnswer ? (
                    <div className="user-answer">
                        <p>Your Answer:</p>
                        <p>{userAnswer}</p>
                    </div>
                ) : (
                    <div className="answer-input">
                        <label>Your Answer:</label>
                        <textarea
                            rows="4"
                            cols="50"
                            value={userAnswer}
                            onChange={(event) => setUserAnswer(event.target.value)}
                        ></textarea>
                        <button onClick={handleSubmitAnswer}>Submit Answer</button>
                    </div>
                )}
                <Link to='/prompts'>Back to Prompts</Link>
            </div>
        </div>
    );
};

export default PromptDetails;