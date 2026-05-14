import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import Home from "./components/Home";
import CountryRiskSearch from "./components/CountryRiskSearch";
import LogIn from "./components/LogIn";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import SavedPlaces from "./components/SavedPlaces";

export default function App() {
    const Router = process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;
    const routerProps = process.env.NODE_ENV === "production"
        ? {}
        : { basename: process.env.PUBLIC_URL || "/" };

    return (
        <Router {...routerProps}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="about" element={<About />} />
                    <Route path= "savedPlaces" element={<SavedPlaces />} />
                    <Route path="countryRiskSearch" element={<CountryRiskSearch />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
