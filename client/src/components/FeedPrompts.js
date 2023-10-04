import { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedPrompts.css';

const FeedPrompts = () => {
    const [feedPrompts, setFeedPrompts] = useState([]);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/prompts/feed');
                setFeedPrompts(response.data);
            } catch (error) {
                console.error('Error fetching feed prompts:', error);
            }
        };

        fetchData();
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedPrompts;
