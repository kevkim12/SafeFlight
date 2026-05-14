import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <main className="page-panel narrow-page">
            <section className="notice-panel">
                <p className="eyebrow">404</p>
                <h1>This route is not on the itinerary.</h1>
                <p>Return home or open the country risk search to keep planning.</p>
                <Link className="button-primary" to="/">Go home</Link>
            </section>
        </main>
    );
};

export default NoPage;
