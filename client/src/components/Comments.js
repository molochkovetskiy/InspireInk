import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import jwt_decode from 'jwt-decode';

import './Comments.css';

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const { token } = useContext(AppContext);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${props.answerId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = jwt_decode(token).userId;
            await axios.post(`/comments/${props.answerId}`, {
                userId,
                text: newComment
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="comments-container">
            <h3 className="comments-heading">Comments</h3>
            {comments.length === 0 ? (
                <p className="no-comments-text">No comments yet...</p>
            ) : (
                comments.map((comment, index) => (
                    <div key={index} className="comment-box">
                        <p className="comment-text">{comment.text}</p>
                        <p className="comment-info">By: {comment.username}</p>
                    </div>
                ))
            )}
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="comment-input"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Comments;
