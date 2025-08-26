import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    id: 1,
    question: "Is my data safe?",
    answer: "Yes. We follow security and encryption protocols to protect your information. We never share your data without your consent."
  },
  {
    id: 2,
    question: "Can I use my account on more than one device?",
    answer: "Yes. Simply log in with your email and password on the new device. Your data will be automatically synced."
  },
  {
    id: 3,
    question: "How can I contact support?",
    answer: "Go to Profile > Help > Contact Us within the app, or send an email to: contact.holymind@gmail.com."
  },
  {
    id: 4,
    question: "How do I download my files or content?",
    answer: "Go to the Profile menu in the app and click the Download button located below the \"Profile\" section. Follow the on-screen instructions to save the content to your device."
  },
  {
    id: 5,
    question: "How do I manage my subscription and payments?",
    answer: "Go to Profile > Manage Payments to:\n• Change or update your payment method.\n• View your current plan and billing history.\n• Cancel or reactivate your subscription."
  },
  {
    id: 6,
    question: "What are credits for?",
    answer: "Credits allow you to use features in the app, such as chatting with consultants and receiving personalized answers.\n• Each time your subscription renews, new credits are instantly added to your account.\n• They never expire.\n• To view your usage history, go to Profile > Credit History."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cosmic-glow">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <h3 className="text-white font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-300 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-300 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="text-purple-200 text-sm leading-relaxed whitespace-pre-line">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default function HelpPage() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleContactUs = () => {
    window.location.href = 'mailto:contact.holymind@gmail.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={createPageUrl("profile")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-light text-white">Help & Support</h1>
          <div className="w-10 h-10" />
        </div>

        <div className="space-y-6">
          {/* Contact Us Button */}
          <Button
            onClick={handleContactUs}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-4 flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">Contact Us</span>
          </Button>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white text-center mb-4">
              Frequently Asked Questions
            </h2>
            
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>

          {/* Additional Help */}
          <div className="bg-purple-900/20 backdrop-blur-lg border border-purple-400/20 rounded-2xl p-4 text-center">
            <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-4 h-4 text-purple-300" />
            </div>
            <h3 className="text-white font-medium mb-2">Still need help?</h3>
            <p className="text-purple-200 text-sm leading-relaxed">
              Our support team is here to help you. Send us an email and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}