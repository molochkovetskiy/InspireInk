import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
} from "@mui/material";

import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex' }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', margin: 5 }}>
                        <CardHeader
                            title='Prompt Details'
                            subheader={promptInfo.description}
                        />
                        <CardContent >
                            <Typography sx={{ width: 600 }} variant="body2" color="text.secondary" mt={3}>
                                {userAnswer ? (
                                    <Typography>
                                        Your Answer:
                                        {userAnswer}
                                        <Box display="flex" mt={2}>
                                            <Button variant="contained" sx={{ marginRight: '20px' }} onClick={handleGetAiAdvice}>
                                                Get AI advice
                                            </Button>
                                            <Button size="small">
                                                <Link to={'/prompts'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    Back to Prompts
                                                </Link>
                                            </Button>
                                        </Box>
                                        {aiAdvice && <div className="ai-advice">{aiAdvice}</div>}
                                    </Typography>
                                ) : (
                                    <Typography className="answer-input">
                                        Your Answer:
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="standard-multiline-static"
                                            multiline
                                            rows={4}
                                            placeholder="What's on your mind?"
                                            variant="standard"
                                            value={newAnswer}
                                            onChange={(event) => setNewAnswer(event.target.value)}
                                        />
                                        <Box display="flex" mt={2}>
                                            <Button onClick={handleSubmitAnswer} variant="contained" size="large" sx={{ marginRight: '20px' }}>
                                                Submit Answer
                                            </Button>
                                            <Button size="small">
                                                <Link to={'/prompts'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    Back to Prompts
                                                </Link>
                                            </Button>
                                        </Box>
                                    </Typography>
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                {userAnswerId && <Comments answerId={userAnswerId} />}
            </Box>
        </>
    );
};

export default PromptDetails;