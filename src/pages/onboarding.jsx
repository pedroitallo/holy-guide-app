import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "@/api/entities";
import { createPageUrl } from "@/utils";

import OnboardingWelcome from "../components/onboarding/OnboardingWelcome";
import OnboardingConnection from "../components/onboarding/OnboardingConnection";
import OnboardingMessage from "../components/onboarding/OnboardingMessage";
import OnboardingPortrait from "../components/onboarding/OnboardingPortrait";
import ProgressIndicator from "../components/onboarding/ProgressIndicator";

export default function OnboardingPage() {
  const [searchParams] = useSearchParams();
  const stepParam = searchParams.get("id");
  const [currentStep, setCurrentStep] = useState(parseInt(stepParam) || 1);
  const [formData, setFormData] = useState({
    fullName: "",
    zodiacSign: "",
    profilePicture: null
  });

  useEffect(() => {
    const newStep = parseInt(stepParam) || 1;
    setCurrentStep(newStep);
  }, [stepParam]);

  const handleNext = (data = {}) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      window.history.pushState({}, "", `${window.location.pathname}?id=${nextStep}`);
      setCurrentStep(nextStep);
    } else if (currentStep === 3) {
      // After step 3, redirect to login with Journey as callback
      const callbackUrl = `${window.location.origin}${createPageUrl('journeys')}`;
      User.loginWithRedirect(callbackUrl);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      window.history.pushState({}, "", `${window.location.pathname}?id=${prevStep}`);
      setCurrentStep(prevStep);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingWelcome onNext={handleNext} />;
      case 2:
        return <OnboardingConnection onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <OnboardingMessage onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <OnboardingPortrait formData={formData} onBack={handleBack} />;
      default:
        return <OnboardingWelcome onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator currentStep={currentStep} totalSteps={4} />
      <div className="flex-1 flex items-center justify-center px-4">
        {renderStep()}
      </div>
    </div>
  );
}