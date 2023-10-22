import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from "@mui/icons-material/Favorite";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './css/AnswerPage.css';
import Comments from './Comments';

const AnswerPage = () => {
  const [answerData, setAnswerData] = useState([]);
  const { token } = useContext(AppContext);
  const { id } = useParams();

  console.log(answerData[0]);

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
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Card sx={{ margin: 5 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                  {/* {answerData.username[0].toUpperCase()} */}
                </Avatar>
              }
              title={answerData.username}
              subheader={formatTimestamp(answerData.updated_at)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {answerData.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={3}>
                {answerData.answer}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {answerData.liked ? (
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorderIcon />}
                    checkedIcon={<Favorite sx={{ color: 'red' }} />}
                    onClick={() => handleLike(answerData.id, 'unlike')}
                  />
                </IconButton>
              ) : (
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorderIcon />}
                    checkedIcon={<Favorite sx={{ color: 'red' }} />}
                    onClick={() => handleLike(answerData.id, 'like')}
                  />
                </IconButton>
              )}
              {answerData.likes}
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Comments answerId={id} />

        </Box>
        <Button size="small" sx={{ marginLeft: '20px' }}>
          <Link to={`/feed`} style={{ textDecoration: 'none', color: 'inherit', marginLeft: '20px' }}>
            Back to Feed
          </Link>
        </Button>
      </Box>
    </>
  );
};

export default AnswerPage;