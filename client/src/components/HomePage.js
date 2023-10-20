import { Link } from 'react-router-dom';
import './css/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <header>
                <h1>Welcome to InspireInk</h1>
                <p>A creative writing hub for writers and creators.</p>
            </header>

            <section className="features">
                <div className="feature">
                    <h2>Explore Writing Prompts</h2>
                    <p>Discover a wide range of writing prompts to spark your creativity.</p>
                </div>

                <div className="feature">
                    <h2>Share Your Work</h2>
                    <p>Join our community and share your writings with fellow writers.</p>
                </div>

                <div className="feature">
                    <h2>Get Inspired</h2>
                    <p>Find inspiration and new ideas for your writing projects.</p>
                </div>
            </section>

            <section className="call-to-action">
                <p>Ready to get started?</p>
                <Link to="/prompts">Explore Prompts</Link>
            </section>
        </div>
    );
};

export default HomePage;
