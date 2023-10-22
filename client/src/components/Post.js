import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Favorite from "@mui/icons-material/Favorite";

import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

const Post = () => {
    const [feedPrompts, setFeedPrompts] = useState([]);

    const { token } = useContext(AppContext);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
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
        <>
            {feedPrompts.map((prompt, index) => (
                <Card sx={{ margin: 5 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                {prompt.username[0].toUpperCase()}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={prompt.username}
                        subheader={formatTimestamp(prompt.updated_at)}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {prompt.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={3}>
                            {prompt.answer}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {prompt.liked ? (
                            <IconButton aria-label="add to favorites">
                                <Checkbox
                                    icon={<FavoriteBorderIcon />}
                                    checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                    onClick={() => handleLike(prompt.id, 'unlike')}
                                />
                            </IconButton>
                        ) : (
                            <IconButton aria-label="add to favorites">
                                <Checkbox
                                    icon={<FavoriteBorderIcon />}
                                    checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                    onClick={() => handleLike(prompt.id, 'like')}
                                />
                            </IconButton>
                        )}
                        {prompt.likes}
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                    <Button size="small">
                        <Link to={`/answers/${prompt.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit', marginLeft: '20px'}}>
                            Explore
                        </Link>
                    </Button>
                </Card>
            ))}
        </>
    )
};

export default Post;