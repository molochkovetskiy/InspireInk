import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Prompts = () => {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        allPrompts();
    }, []);

    const allPrompts = async () => {
        try {
            const response = await fetch('/prompts');

            if (!response.ok) {
                throw new Error('Failed to fetch prompts');
            }

            const data = await response.json();
            setPrompts(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="prompts-container">
            {prompts.map((prompt, index) => (
                <Link to={`/prompts/${prompt.id}`} key={prompt.id} className="prompt-link">
                    <div className="prompt-card">
                        <div className="prompt-content">
                            <p>{prompt.description}</p>
                            <p>Your answer: </p>
                        </div>
                        <div className="page-number">{index + 1}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Prompts;