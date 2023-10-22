import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextField, Typography, Box, Button, CardContent, Card, CardActions } from '@mui/material';

const Prompts = () => {
    const [prompts, setPrompts] = useState([]);
    const [search, setSearch] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetchPrompts();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [search]);

    const fetchPrompts = async () => {
        try {
            const response = await fetch('/prompts');

            if (!response.ok) {
                throw new Error('Failed to fetch prompts');
            }

            const data = await response.json();
            setPrompts(data);
            setNoResults(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`/prompts/search?description=${search}`);
            const data = await response.json();

            if (data.msg === 'Prompt not found') {
                setNoResults(true);
                setPrompts([]);
            } else {
                setPrompts(data);
                setNoResults(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box p={2}>
            <TextField
                label="Search by description"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Box sx={{ width: 700 }}>
                {noResults ? (
                    <Typography variant="body1">No prompts match your search criteria.</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {prompts.map((prompt, index) => (
                            <Card sx={{ margin: 2, width: 200, height: 150 }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {prompt.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <Link to={`/prompts/${prompt.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            Explore
                                        </Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Prompts;
