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

import DreamAnalysisPage from "./dream-analysis";

import LoveCompatibilityPage from "./love-compatibility";

import LoveAdvicePage from "./love-advice";

import FastEnergyCleansingPage from "./fast-energy-cleansing";

import revelations from "./revelations";

import CoinHistoryPage from "./coin-history";

import OnboardingPage from "./onboarding";

import MyDivinePage from "./mydivine";

import LetterDayPage from "./letterday";

import MagicPage from "./magic";

import HoroscopePage from "./horoscope";

import ManagePaymentsPage from "./managepayments";

import help from "./help";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/components/auth/AuthContext';

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
    
    "dream-analysis": DreamAnalysisPage,
    
    "love-compatibility": LoveCompatibilityPage,
    
    "love-advice": LoveAdvicePage,
    
    "fast-energy-cleansing": FastEnergyCleansingPage,
    
    revelations: revelations,
    
    "coin-history": CoinHistoryPage,
    
    onboarding: OnboardingPage,
    
    mydivine: MyDivinePage,
    
    letterday: LetterDayPage,
    
    magic: MagicPage,
    
    horoscope: HoroscopePage,
    
    managepayments: ManagePaymentsPage,
    
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
        <AuthProvider>
            <Layout currentPageName={currentPage}>
                <Routes>            
                    
                        <Route path="/" element={<home />} />
                    
                    
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
                    
                    <Route path="/dream-analysis" element={<DreamAnalysisPage />} />
                    
                    <Route path="/love-compatibility" element={<LoveCompatibilityPage />} />
                    
                    <Route path="/love-advice" element={<LoveAdvicePage />} />
                    
                    <Route path="/fast-energy-cleansing" element={<FastEnergyCleansingPage />} />
                    
                    <Route path="/revelations" element={<revelations />} />
                    
                    <Route path="/coin-history" element={<CoinHistoryPage />} />
                    
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    
                    <Route path="/mydivine" element={<MyDivinePage />} />
                    
                    <Route path="/letterday" element={<LetterDayPage />} />
                    
                    <Route path="/magic" element={<MagicPage />} />
                    
                    <Route path="/horoscope" element={<HoroscopePage />} />
                    
                    <Route path="/managepayments" element={<ManagePaymentsPage />} />
                    
                    <Route path="/help" element={<help />} />
                    
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}