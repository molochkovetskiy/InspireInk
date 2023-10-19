import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './AnswerPage.css';
import Comments from './Comments';

const AnswerPage = () => {
    const [answerData, setAnswerData] = useState([]);
    const { token } = useContext(AppContext);
    const { id } = useParams();

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }

    const fetchAnswerData = async () => {
        try {
            const response = await axios.get(`/users/answers/${id}`);
            const data = response.data[0];
            const likes = await fetchLikes(data.id);
            const liked = await fetchLikedStatus(data.id);
            setAnswerData({ ...data, likes, liked });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLikes = async (userAnswerId) => {
        try {
            const response = await axios.get(`/prompts/amount-likes?userAnswerId=${userAnswerId}`);
            const likesCount = response.data[0];
            return likesCount ? likesCount.count : 0;
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    const fetchLikedStatus = async (userAnswerId) => {
        try {
            const userId = jwt_decode(token).userId;
            const response = await axios.get(`/prompts/check-like?userId=${userId}&userAnswerId=${userAnswerId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching like status:', error);
            return false;
        }
    };

    const handleLike = async (userAnswerId, userLikedAnswer) => {
        try {
            const userId = jwt_decode(token).userId;

            if (userLikedAnswer === 'unlike') {
                await axios.delete('/prompts/unlike', {
                    params: {
                        userId,
                        userAnswerId
                    },
                });
            } else {
                await axios.post('/prompts/like', { userId, userAnswerId });
            }

            fetchAnswerData();
        } catch (error) {
            console.error('Error liking/unliking answer:', error);
        }
    };

    useEffect(() => {
        fetchAnswerData();
    }, [])

    return (
        <>
            <div className="answer-page-container">
                <div className="answer-section">
                    <div className="answer-card">
                        <p className="description">{answerData.description}</p>
                        <p className="answer-text">Answer: {answerData.answer}</p>
                        <p className="username">Username: {answerData.username}</p>
                        <p className="updated-at">Updated At: {formatTimestamp(answerData.updated_at)}</p>
                        {answerData.liked ? (
                            <div className="like-section">
                                <button className="heart-button" onClick={() => handleLike(answerData.id, 'unlike')}>
                                    ❤️
                                </button>
                                <span className="likes-count">{answerData.likes}</span>
                            </div>
                        ) : (
                            <div className="like-section">
                                <button className="heart-button" onClick={() => handleLike(answerData.id)}>
                                    🤍
                                </button>
                                <span className="likes-count">{answerData.likes}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="comments-section">
                    <Comments answerId={id} />
                </div>
            </div>
            <div className="back-to-feed">
                <Link to='/feed'>Back to Feed</Link>
            </div>
        </>
    );
};

export default AnswerPage;