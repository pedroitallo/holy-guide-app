import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Feedback } from "@/api/entities";

const featureOptions = [
  "Daily Readings",
  "Tarot & Spiritual Guidance",
  "Astrology & Horoscope",
  "Energy Cleansing Rituals",
  "Soulmate Portraits"
];

const recommendationOptions = [
  { value: "definitely", label: "Definitely" },
  { value: "maybe", label: "Maybe" },
  { value: "not_right_now", label: "Not right now" }
];

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    enjoy_most: "",
    improvement_suggestion: "",
    most_used_features: [],
    other_feature: "",
    recommendation: "",
    other_comments: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature) => {
    setFormData(prev => {
      const newFeatures = prev.most_used_features.includes(feature)
        ? prev.most_used_features.filter(f => f !== feature)
        : [...prev.most_used_features, feature];
      return { ...prev, most_used_features: newFeatures };
    });
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, recommendation: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Feedback.create(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <div className="px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto space-y-6 text-center">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 cosmic-glow min-h-[400px] flex flex-col justify-center items-center animate-in fade-in zoom-in-95 duration-500">
            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-semibold text-white mb-2">Thank you!</h2>
            <p className="text-purple-200 mb-6">
              Your feedback helps us align the Holyguide with the energy and needs of our soul family. 🌙💜
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white w-full">
              <Link to={createPageUrl('home')}>Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="relative flex justify-center items-center">
          <Link to={createPageUrl('profile')} className="absolute left-0 text-purple-300 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-light text-white">Feedback Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow space-y-8">
          
          <div className="space-y-3">
            <Label htmlFor="enjoy_most" className="text-white">1. What do you enjoy the most about Holyguide?</Label>
            <Textarea id="enjoy_most" name="enjoy_most" value={formData.enjoy_most} onChange={handleInputChange} className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="improvement_suggestion" className="text-white">2. What would you like us to improve or add to make your experience even better?</Label>
            <Textarea id="improvement_suggestion" name="improvement_suggestion" value={formData.improvement_suggestion} onChange={handleInputChange} className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="space-y-3">
            <Label className="text-white">3. Which features or sections do you use the most?</Label>
            <div className="space-y-2">
              {featureOptions.map(feature => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={feature} onCheckedChange={() => handleCheckboxChange(feature)} className="border-purple-300 data-[state=checked]:bg-purple-600"/>
                  <Label htmlFor={feature} className="text-purple-200">{feature}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                  <Checkbox id="other" onCheckedChange={() => handleCheckboxChange('Other')} className="border-purple-300 data-[state=checked]:bg-purple-600" />
                  <Label htmlFor="other" className="text-purple-200">Other:</Label>
                   {formData.most_used_features.includes('Other') && (
                     <Input type="text" name="other_feature" value={formData.other_feature} onChange={handleInputChange} className="bg-white/5 border-white/20 text-white h-8" />
                   )}
                </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-white">4. Would you recommend Holyguide to a friend or loved one?</Label>
             <RadioGroup onValueChange={handleRadioChange} value={formData.recommendation}>
              {recommendationOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="border-purple-300 text-purple-600" />
                  <Label htmlFor={option.value} className="text-purple-200">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="other_comments" className="text-white">5. Any other comments or suggestions you’d like to share with Madame Aura?</Label>
            <Textarea id="other_comments" name="other_comments" value={formData.other_comments} onChange={handleInputChange} className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="text-center text-purple-200 text-sm space-y-2">
            <Sparkles className="w-5 h-5 mx-auto text-yellow-300"/>
            <p>Thank you for sharing your thoughts!</p>
            <p className="text-xs">Your feedback helps us align the Holyguide with the energy and needs of our soul family. 🌙💜</p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            {isLoading ? "Sending..." : "Send Feedback"}
            {!isLoading && <Send className="w-4 h-4 ml-2" />}
          </Button>
        </form>
      </div>
    </div>
  );
}