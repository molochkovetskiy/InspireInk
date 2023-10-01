import { useEffect, useState } from 'react';

const Prompts = () => {
    const [prompts, setPrompts] = useState([]);

    function formatTimestamp(timestamp) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(timestamp).toLocaleDateString(undefined, options);
    }

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
                    <div key={prompt.id} className="prompt-card">
                        <div className="prompt-content">
                            <p>{prompt.description}</p>
                            <p>Your answer: </p>
                            <small>Created: {formatTimestamp(prompt.created_at)}</small>
                            <small>Updated: {formatTimestamp(prompt.updated_at)}</small>
                        </div>
                        <div className="page-number">{index + 1}</div>
                    </div>
                ))}
        </div>
    );
}

export default Prompts;