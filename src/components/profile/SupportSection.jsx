import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { LifeBuoy, MessageSquare, CreditCard, ChevronRight } from 'lucide-react';

const supportItems = [
  {
    icon: LifeBuoy,
    title: 'Help & Support',
    description: 'Get help with your account',
    actionType: 'navigate',
    target: createPageUrl('help'),
  },
  {
    icon: MessageSquare,
    title: 'Feedbacks',
    description: 'Share your thoughts with us',
    actionType: 'navigate',
    target: createPageUrl('feedback'),
  },
  {
    icon: CreditCard,
    title: 'Manage Payments',
    description: 'Subscriptions, Cancellations and Refunds',
    actionType: 'navigate',
    target: createPageUrl('managepayments'),
  },
];

const SupportCard = ({ icon: Icon, title, description, actionType, target }) => {
  const CardContent = () => (
    <div className="flex items-center justify-between w-full p-4 bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl cosmic-glow hover:bg-white/10 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-purple-200">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-purple-300" />
    </div>
  );

  if (actionType === 'navigate') {
    return <Link to={target}><CardContent /></Link>;
  }

  return <a href={target} target="_blank" rel="noopener noreferrer"><CardContent /></a>;
};

export default function SupportSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white px-2">Support</h3>
      <div className="flex flex-col gap-y-6">
        {supportItems.map((item, index) => (
          <SupportCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}