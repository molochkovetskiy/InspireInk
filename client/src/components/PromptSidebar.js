import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PromptSidebar() {
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
        <div className="sidebar">
            <ul className="prompt-list">
                {prompts.map((prompt, index) => (
                    <li key={prompt.id}>
                        <Link to={`/prompts/${prompt.id}`} className="numbered-link">
                            {index + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PromptSidebar;
