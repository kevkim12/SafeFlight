import React from "react";

function About(){
    return(
        <main className="content-page">
            <section className="page-hero compact-hero">
                <p className="eyebrow">About Safe Flight</p>
                <h1>Clear travel-risk context for people planning where to go next.</h1>
                <p>
                    Safe Flight organizes destination safety data into a practical country-risk view
                    for travelers who want a calmer planning process.
                </p>
            </section>

            <section className="two-column-section">
                <div>
                    <p className="eyebrow">Mission</p>
                    <h2>Make travel safety easier to understand before the itinerary is final.</h2>
                </div>
                <div className="copy-stack">
                    <p>
                        The site focuses on the questions travelers ask early: which countries need
                        attention, which destinations are normal risk, and which places should stay
                        on a watchlist.
                    </p>
                    <p>
                        The interface is intentionally direct, with country-level search, saved
                        destinations, and risk labels that are easy to scan.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default About;
