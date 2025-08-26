import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function ManagePaymentsPage() {
  const handleAccessPortal = () => {
    window.open('https://consumer.hotmart.com/', '_blank');
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
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Manage Payments</h1>
          </div>
          <div className="w-10 h-10" />
        </div>

        <div className="space-y-6">
          {/* Manage Purchases Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500/20 px-3 w-12 h-12 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Manage my purchases</h3>
                <p className="text-slate-50 text-sm">Access our customer portal with your purchase email and manage your payment</p>
              </div>
            </div>
            
            <ul className="space-y-2 text-purple-200 text-sm mb-6">
              <li>• Request a refund (max. 7 days after purchase)</li>
              <li>• Manage Subscription</li>
              <li>• View detailed purchase information</li>
              <li>• Plan Exchanges</li>
            </ul>

            <Button
              onClick={handleAccessPortal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3">

              Access customer portal
            </Button>
            
            <p className="text-slate-300 mt-4 text-xs">Use the same email address you used for your purchase on Hotmart. If you have any questions, please contact us at contact.holymind@gmail.com







            </p>
          </div>

          {/* Info Section */}
          <div className="bg-purple-900/20 backdrop-blur-lg border border-purple-400/20 rounded-2xl p-4">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="w-4 h-4 text-purple-300" />
              </div>
              <h3 className="text-white font-medium">Need Help?</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                All purchases are processed through Hotmart, our secure payment partner. 
                Access their customer portal to manage your account and requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}