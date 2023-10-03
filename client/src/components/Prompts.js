import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by description"
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            <div className="prompts-container">
                {noResults ? (
                    <p>No prompts match your search criteria.</p>
                ) : (
                    prompts.map((prompt, index) => (
                        <Link to={`/prompts/${prompt.id}`} key={prompt.id} className="prompt-link">
                            <div className="prompt-card">
                                <div className="prompt-content">
                                    <p>{prompt.description}</p>
                                    <p>Your answer: </p>
                                </div>
                                <div className="page-number">{index + 1}</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}

export default Prompts;