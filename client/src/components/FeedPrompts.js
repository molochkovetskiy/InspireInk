import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './css/FeedPrompts.css';

const FeedPrompts = () => {
    const [feedPrompts, setFeedPrompts] = useState([]);

    const { token } = useContext(AppContext);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }

    const fetchFeedPrompts = async () => {
        try {
            const response = await axios.get('/prompts/feed');
            const feedData = response.data;
            const updatedFeedData = await Promise.all(feedData.map(async (prompt) => {
                const likes = await fetchLikes(prompt.id);
                const liked = await fetchLikedStatus(prompt.id);
                return { ...prompt, likes, liked };
            }));
            setFeedPrompts(updatedFeedData);
        } catch (error) {
            console.error('Error fetching feed prompts:', error);
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

            fetchFeedPrompts();
        } catch (error) {
            console.error('Error liking/unliking answer:', error);
        }
    };

    useEffect(() => {
        fetchFeedPrompts();
    }, []);

    return (
        <div className="feed-prompts">
            <h2>Last User Answers</h2>
            <ul>
                {feedPrompts.map((prompt, index) => (
                    <li key={index} className="feed-prompt-item">
                        <p>{prompt.description}</p>
                        <p className="answer">Answer: {prompt.answer}</p>
                        <p className="username">Username: {prompt.username}</p>
                        <p className="updated-at">Updated At: {formatTimestamp(prompt.updated_at)}</p>
                        {prompt.liked ? (
                            <>
                                <button
                                    className="heart-button"
                                    onClick={() => handleLike(prompt.id, 'unlike')}
                                >
                                    ❤️
                                </button>
                                {prompt.likes}
                            </>
                        ) : (
                            <>
                                <button
                                    className="heart-button"
                                    onClick={() => handleLike(prompt.id)}
                                >
                                    🤍
                                </button>
                                {prompt.likes}
                            </>
                        )}
                        <br />
                        <Link to={`/answers/${prompt.id}`}>See...</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedPrompts;
