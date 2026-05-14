import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <main>
            <section className="home-hero premium-hero">
                <div className="hero-copy">
                    <p className="eyebrow">Destination risk intelligence</p>
                    <h1>Travel planning that treats safety like part of the itinerary.</h1>
                    <p>
                        Safe Flight gives travelers a clear view of country risk before flights are booked,
                        teams are deployed, or family trips are finalized.
                    </p>
                    <div className="hero-actions">
                        <Link className="button-primary" to="/countryRiskSearch">Search destinations</Link>
                        <Link className="button-secondary" to="/login">Create account</Link>
                    </div>
                    <dl className="trust-strip" aria-label="Safe Flight highlights">
                        <div>
                            <dt>4</dt>
                            <dd>risk levels</dd>
                        </div>
                        <div>
                            <dt>24/7</dt>
                            <dd>planning access</dd>
                        </div>
                        <div>
                            <dt>0</dt>
                            <dd>third-party sign-in</dd>
                        </div>
                    </dl>
                </div>
                <aside className="destination-preview" aria-label="Destination planning preview">
                    <div className="preview-header">
                        <span>Destination brief</span>
                        <strong>Pre-trip review</strong>
                    </div>
                    <div className="preview-route">
                        <span className="route-dot"></span>
                        <div>
                            <p>ATL</p>
                            <strong>Atlanta</strong>
                        </div>
                        <span className="route-line"></span>
                        <div>
                            <p>NRT</p>
                            <strong>Tokyo</strong>
                        </div>
                        <span className="route-dot route-dot-arrival"></span>
                    </div>
                    <div className="preview-panel">
                        <div>
                            <span className="risk-badge risk-low-risk">Low Risk</span>
                            <p>Normal awareness recommended for this destination.</p>
                        </div>
                        <div className="mini-score">
                            <strong>92</strong>
                            <span>readiness</span>
                        </div>
                    </div>
                    <div className="preview-list">
                        <div>
                            <span></span>
                            Advisory profile reviewed
                        </div>
                        <div>
                            <span></span>
                            Saved for later comparison
                        </div>
                        <div>
                            <span></span>
                            Watchlist ready
                        </div>
                    </div>
                </aside>
            </section>

            <section className="section-band workflow-section">
                <div className="section-heading">
                    <p className="eyebrow">How it works</p>
                    <h2>A calmer way to make destination decisions.</h2>
                </div>
                <div className="workflow-grid">
                    <article>
                        <span>01</span>
                        <h3>Country risk lookup</h3>
                        <p>Search destinations and immediately see their current travel-risk category.</p>
                    </article>
                    <article>
                        <span>02</span>
                        <h3>Watchlist planning</h3>
                        <p>Save the places that need more attention before ticketing or departure.</p>
                    </article>
                    <article>
                        <span>03</span>
                        <h3>Account continuity</h3>
                        <p>Create a regular account and return to your saved destinations without third-party sign-in.</p>
                    </article>
                </div>
            </section>

            <section className="insight-section">
                <div>
                    <p className="eyebrow">Designed for travelers</p>
                    <h2>Fast enough for a quick check, structured enough for serious planning.</h2>
                </div>
                <div className="insight-table" aria-label="Risk level examples">
                    <div><span className="risk-badge risk-low-risk">Low Risk</span><p>Routine travel awareness</p></div>
                    <div><span className="risk-badge risk-medium-risk">Medium Risk</span><p>Review conditions before booking</p></div>
                    <div><span className="risk-badge risk-high-risk">High Risk</span><p>Monitor closely and reconsider timing</p></div>
                    <div><span className="risk-badge risk-extreme-warning">Extreme Warning</span><p>Avoid travel unless essential</p></div>
                </div>
            </section>
        </main>
    )
};

export default Home;
