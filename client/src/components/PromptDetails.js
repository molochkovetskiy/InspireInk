import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PromptSidebar from './PromptSidebar';

const PromptDetails = (props) => {
    const [prompt, setPrompt] = useState([]);
    const [answer, setAnswer] = useState('');
    const param = useParams();

    const { id } = useParams();
    console.log('ID:', id);

    // function formatTimestamp(timestamp) {
    //     const date = new Date(timestamp);

    //     const day = date.getDate();
    //     const month = date.toLocaleString('default', { month: 'short' });
    //     const year = date.getFullYear();
    //     const hours = date.getHours().toString().padStart(2, '0');
    //     const minutes = date.getMinutes().toString().padStart(2, '0');

    //     return `${day} ${month} ${year}, ${hours}:${minutes}`;
    // }


    useEffect(() => {
        getPromptInfo();
    }, [])

    const getPromptInfo = async () => {
        try {
            const res = await fetch(`/prompts/${param.id}`);
            const data = await res.json();
            setPrompt(data);
        } catch (error) {
            console.log(error);
        }
    };

    // return (
    //     <>
    //         <div className="prompt-detail">
    //             <h2>Prompt Details</h2>
    //             <div className="prompt-content">
    //                 <p>{prompt.description}</p>
    //             </div>
    //             <div className="answer-input">
    //                 <label>Your Answer:</label>
    //                 <textarea
    //                     value={answer}
    //                     onChange={(event) => setAnswer(event.target.value)}
    //                 ></textarea>
    //             </div>
    //             {/* <small>Created: {formatTimestamp(prompt.created_at)}</small>
    //                 <small>Updated: {formatTimestamp(prompt.updated_at)}</small> */}
    //         </div>
    //         <Link to='/'>Back to Prompts</Link>
    //     </>
    // );
    return (
        <div className="prompt-details-page">
            <div className="sidebar-container">
                <PromptSidebar />
            </div>
            <div className="prompt-detail">
                <h2>Prompt Details</h2>
                <div className="prompt-content">
                    <p>{prompt.description}</p>
                </div>
                <div className="answer-input">
                    <label>Your Answer:</label>
                    <textarea
                        rows="4"
                        cols="50"
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                    ></textarea>
                </div>
                <Link to='/prompts'>Back to Prompts</Link>
            </div>
        </div>
    );
}

export default PromptDetails;