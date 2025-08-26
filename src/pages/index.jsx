import Layout from "./Layout.jsx";

import admin from "./admin";

import home from "./home";

import reading from "./reading";

import journey from "./journey";

import guide from "./guide";

import profile from "./profile";

import feedback from "./feedback";

import journeys from "./journeys";

import chats from "./chats";

import coins from "./coins";

import chat from "./chat";

import dream-analysis from "./dream-analysis";

import love-compatibility from "./love-compatibility";

import love-advice from "./love-advice";

import fast-energy-cleansing from "./fast-energy-cleansing";

import revelations from "./revelations";

import coin-history from "./coin-history";

import onboarding from "./onboarding";

import mydivine from "./mydivine";

import letterday from "./letterday";

import magic from "./magic";

import horoscope from "./horoscope";

import managepayments from "./managepayments";

import help from "./help";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    admin: admin,
    
    home: home,
    
    reading: reading,
    
    journey: journey,
    
    guide: guide,
    
    profile: profile,
    
    feedback: feedback,
    
    journeys: journeys,
    
    chats: chats,
    
    coins: coins,
    
    chat: chat,
    
    dream-analysis: dream-analysis,
    
    love-compatibility: love-compatibility,
    
    love-advice: love-advice,
    
    fast-energy-cleansing: fast-energy-cleansing,
    
    revelations: revelations,
    
    coin-history: coin-history,
    
    onboarding: onboarding,
    
    mydivine: mydivine,
    
    letterday: letterday,
    
    magic: magic,
    
    horoscope: horoscope,
    
    managepayments: managepayments,
    
    help: help,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<admin />} />
                
                
                <Route path="/admin" element={<admin />} />
                
                <Route path="/home" element={<home />} />
                
                <Route path="/reading" element={<reading />} />
                
                <Route path="/journey" element={<journey />} />
                
                <Route path="/guide" element={<guide />} />
                
                <Route path="/profile" element={<profile />} />
                
                <Route path="/feedback" element={<feedback />} />
                
                <Route path="/journeys" element={<journeys />} />
                
                <Route path="/chats" element={<chats />} />
                
                <Route path="/coins" element={<coins />} />
                
                <Route path="/chat" element={<chat />} />
                
                <Route path="/dream-analysis" element={<dream-analysis />} />
                
                <Route path="/love-compatibility" element={<love-compatibility />} />
                
                <Route path="/love-advice" element={<love-advice />} />
                
                <Route path="/fast-energy-cleansing" element={<fast-energy-cleansing />} />
                
                <Route path="/revelations" element={<revelations />} />
                
                <Route path="/coin-history" element={<coin-history />} />
                
                <Route path="/onboarding" element={<onboarding />} />
                
                <Route path="/mydivine" element={<mydivine />} />
                
                <Route path="/letterday" element={<letterday />} />
                
                <Route path="/magic" element={<magic />} />
                
                <Route path="/horoscope" element={<horoscope />} />
                
                <Route path="/managepayments" element={<managepayments />} />
                
                <Route path="/help" element={<help />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}