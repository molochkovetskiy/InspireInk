import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import PromptSidebar from './PromptSidebar';
import Comments from './Comments';

const PromptDetails = (props) => {
    const [promptInfo, setPromptInfo] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [userAnswerId, setUserAnswerId] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [aiAdvice, setAiAdvice] = useState('');
    const { id } = useParams();
    const { token } = useContext(AppContext);

    const location = useLocation();

    useEffect(() => {
        fetchPromptInfo();
        fetchUserAnswer();
        setUserAnswerId('');
        setAiAdvice('');
    }, [id, location.key])

    const fetchUserAnswer = async () => {
        const userId = jwt_decode(token).userId;

        try {
            const response = await axios.get(`/users/user-answer?userId=${userId}&promptId=${id}`);
            const userAnswerData = response.data;

            if (userAnswerData.length !== 0) {
                setUserAnswer(userAnswerData[0].answer);
                setUserAnswerId(userAnswerData[0].id);
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
                answer: newAnswer,
            });

            if (response.status === 201) {
                const answerId = response.data[0].id;
                setUserAnswer(newAnswer);
                setNewAnswer('');
                setUserAnswerId(answerId);
            } else {
                console.error('Failed to submit answer');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetAiAdvice = async () => {
        try {
            const response = await axios.post('/ai/get-ai-advice', {
                prompt: promptInfo.description,
                answer: userAnswer,
            });

            if (response.status === 200) {
                setAiAdvice(response.data.data);
            } else {
                console.error('Failed to get AI advice');
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
                        <button className="ai-advice-button" onClick={handleGetAiAdvice}>
                            Get AI advice
                        </button>
                        {aiAdvice && <div className="ai-advice">{aiAdvice}</div>}
                    </div>
                ) : (
                    <div className="answer-input">
                        <label>Your Answer:</label>
                        <textarea
                            className="answer-textarea"
                            rows="4"
                            cols="100"
                            value={newAnswer}
                            onChange={(event) => setNewAnswer(event.target.value)}
                        ></textarea>
                        <button className="submit-button-answer" onClick={handleSubmitAnswer}>
                            Submit Answer
                        </button>
                    </div>
                )}
                <Link to='/prompts'>Back to Prompts</Link>
            </div>
            {userAnswerId && <Comments answerId={userAnswerId} />}
        </div>
    );
};

export default PromptDetails;