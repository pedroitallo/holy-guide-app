
import React, { useState, useEffect } from "react";
import { Coins, Star, Zap, ArrowLeft, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { createCheckoutSession } from "@/api/functions";

// Pacotes atualizados de acordo com a imagem e com os bônus
const coinPackages = [
  {
    id: 'starter',
    name: 'Starter Pack',
    icon: '🔹',
    price: '$14.99',
    credits: 25,
    bonus: null,
    popular: false
  },
  {
    id: 'explorer',
    name: 'Explorer Pack',
    icon: '🔸',
    price: '$24.99',
    credits: 50,
    bonus: '+15% bonus (58 total)',
    popular: false
  },
  {
    id: 'awakening',
    name: 'Awakening Pack',
    icon: '🟣',
    price: '$49.99',
    credits: 100,
    bonus: '+20% bonus (120 total)',
    popular: true
  },
  {
    id: 'divine',
    name: 'Divine Master Pack',
    icon: '🟢',
    price: '$99.99',
    credits: 250,
    bonus: '+25% bonus (313 total)',
    popular: false
  }
];

export default function CoinsPage() {
  const [userCoins, setUserCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing', 'success', 'failed', 'canceled'

  useEffect(() => {
    const initialLoad = async () => {
      await loadUserCoins();
      checkPaymentStatus();
    };
    initialLoad();
  }, []);

  const loadUserCoins = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUserCoins(currentUser.coins || 0);
    } catch (error) {
      console.error("Error loading user coins:", error);
      setUserCoins(0);
    }
    setIsLoading(false);
  };

  const checkPaymentStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setPaymentStatus('processing');
      const initialCoins = userCoins; // Capture the current coins before polling

      let intervalId;

      const pollForCoins = async () => {
        try {
          const updatedUser = await User.me();
          if (updatedUser.coins > initialCoins) {
            clearInterval(intervalId); // Clear interval when coins are updated
            setPaymentStatus('success');
            setUserCoins(updatedUser.coins); // Update local state
            window.history.replaceState({}, document.title, window.location.pathname); // Clean up URL
          }
        } catch (error) {
          console.error("Polling for coins failed:", error);
        }
      };

      // Start polling
      intervalId = setInterval(pollForCoins, 2000); // Check every 2 seconds

      // Set a timeout to stop polling and mark as failed if no update within 30 seconds
      setTimeout(() => {
        clearInterval(intervalId); // Ensure interval is cleared
        setPaymentStatus(prevStatus => { // Use functional update to get latest status
            if (prevStatus === 'processing') {
                return 'failed'; // Or some other 'taking too long' state
            }
            return prevStatus; // Don't change if already success
        });
      }, 30000);

    } else if (urlParams.get('canceled') === 'true') {
        setPaymentStatus('canceled');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handlePurchase = async (packageId) => {
    setPurchaseLoading(packageId);
    
    try {
      const { data } = await createCheckoutSession({ packageId });
      
      if (data.url) {
        // Redirecionar para o checkout do Stripe
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error processing payment. Please try again.');
    }
    
    setPurchaseLoading(null);
  };

  const PaymentStatusBanner = () => {
    if (!paymentStatus) return null;

    if (paymentStatus === 'processing') {
      return (
        <div className="bg-blue-900/20 backdrop-blur-lg border border-blue-400/20 rounded-2xl p-4 text-center flex items-center justify-center space-x-3">
          <Loader className="w-6 h-6 text-blue-300 animate-spin" />
          <div>
            <p className="text-blue-200 font-medium">Processing your purchase...</p>
            <p className="text-blue-300 text-sm">Your credits will be available shortly.</p>
          </div>
        </div>
      );
    }

    if (paymentStatus === 'success') {
      return (
        <div className="bg-green-900/20 backdrop-blur-lg border border-green-400/20 rounded-2xl p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-300 font-medium">Purchase Successful!</p>
          <p className="text-green-200 text-sm">Your credits have been added to your account.</p>
        </div>
      );
    }
    
    if (paymentStatus === 'canceled' || paymentStatus === 'failed') {
      return (
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-400/20 rounded-2xl p-4 text-center">
            <p className="text-red-300 font-medium">Payment was canceled.</p>
            <p className="text-red-200 text-sm">Your transaction was not completed. Please try again.</p>
        </div>
      )
    }

    return null;
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("chats")}>
              <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Coins className="w-6 h-6 text-yellow-300" />
              <h1 className="text-2xl font-light text-white">Buy Credits</h1>
            </div>
            <div className="w-10"></div>
          </div>
          <p className="text-purple-200 text-sm">
            Choose your spiritual journey package
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cosmic-glow text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Coins className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Current Balance</span>
          </div>
          <p className="text-2xl font-bold text-yellow-300">
            {isLoading ? "..." : userCoins} Credits
          </p>
          <p className="text-purple-200 text-xs mt-1">
            Each message costs 2 credits
          </p>
        </div>

        {/* Payment Status Banner */}
        <PaymentStatusBanner />
        
        {/* Packages */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white text-center">
            Choose Your Package
          </h2>
          
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gray-900/50 backdrop-blur-lg border rounded-3xl p-6 cosmic-glow transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'border-purple-400/50 ring-2 ring-purple-400/20' : 'border-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{pkg.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-2xl font-bold text-purple-300">
                      {pkg.price}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-yellow-300" />
                    <span className="text-white">
                      <span className="font-bold">{pkg.credits}</span> credits
                    </span>
                  </div>
                  {pkg.bonus && (
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-200 text-sm">{pkg.bonus}</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={purchaseLoading === pkg.id}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white rounded-xl py-3`}
                >
                  {purchaseLoading === pkg.id ? (
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Buy Now</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-purple-900/20 backdrop-blur-lg border border-purple-400/20 rounded-2xl p-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-4 h-4 text-purple-300" />
            </div>
            <h3 className="text-white font-medium">How it works</h3>
            <p className="text-purple-200 text-sm leading-relaxed">
              Use your credits to send messages to spiritual advisors. 
              Each message sent costs 2 credits. Credits never expire!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
