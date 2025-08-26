import React, { useState, useEffect } from "react";
import { CoinTransaction } from "@/api/entities";
import { Coins, ArrowLeft, TrendingUp, TrendingDown, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceIcons = {
  dream_analysis: "🔮",
  love_compatibility: "💕",
  love_advice: "💖",
  energy_cleansing: "✨",
  chat: "💬",
  purchase: "💰",
  bonus: "🎁",
  refund: "↩️"
};

const serviceNames = {
  dream_analysis: "Dream Analysis",
  love_compatibility: "Love Compatibility",
  love_advice: "Love Advice",
  energy_cleansing: "Energy Cleansing",
  chat: "Chat with Advisor",
  purchase: "Credit Purchase",
  bonus: "Bonus Credits",
  refund: "Refund"
};

export default function CoinHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ spent: 0, earned: 0, total: 0 });

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, filter]);

  const loadTransactions = async () => {
    try {
      const allTransactions = await CoinTransaction.list('-created_date', 100);
      setTransactions(allTransactions);
      
      // Calculate stats
      const spent = allTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const earned = allTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const total = earned - spent;
      
      setStats({ spent, earned, total });
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
    setIsLoading(false);
  };

  const filterTransactions = () => {
    if (filter === "all") {
      setFilteredTransactions(transactions);
    } else if (filter === "spent") {
      setFilteredTransactions(transactions.filter(t => t.amount < 0));
    } else if (filter === "earned") {
      setFilteredTransactions(transactions.filter(t => t.amount > 0));
    } else {
      setFilteredTransactions(transactions.filter(t => t.service === filter));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl("profile")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Coins className="w-6 h-6 text-yellow-300" />
            <h1 className="text-2xl font-light text-white">Credit History</h1>
          </div>
          <div className="w-10 h-10" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center cosmic-glow">
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">{stats.earned}</div>
            <div className="text-xs text-white/80">Earned</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center cosmic-glow">
            <TrendingDown className="w-5 h-5 text-red-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-red-400">{stats.spent}</div>
            <div className="text-xs text-white/80">Spent</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center cosmic-glow">
            <Coins className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-400">{stats.total}</div>
            <div className="text-xs text-white/80">Net</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              <SelectItem value="all" className="text-white hover:bg-purple-600/20">All Transactions</SelectItem>
              <SelectItem value="spent" className="text-white hover:bg-purple-600/20">Spent Only</SelectItem>
              <SelectItem value="earned" className="text-white hover:bg-purple-600/20">Earned Only</SelectItem>
              <SelectItem value="purchase" className="text-white hover:bg-purple-600/20">Purchases</SelectItem>
              <SelectItem value="chat" className="text-white hover:bg-purple-600/20">Chat Sessions</SelectItem>
              <SelectItem value="dream_analysis" className="text-white hover:bg-purple-600/20">Dream Analysis</SelectItem>
              <SelectItem value="love_advice" className="text-white hover:bg-purple-600/20">Love Advice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-2xl mb-2">💫</div>
              <p className="text-purple-200">Loading transaction history...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Coins className="w-12 h-12 text-purple-300 mx-auto mb-4 opacity-50" />
              <p className="text-purple-200">No transactions found.</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cosmic-glow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {serviceIcons[transaction.service] || "💫"}
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">
                        {serviceNames[transaction.service] || transaction.service}
                      </h3>
                      <p className="text-xs text-purple-200">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-purple-300">
                        {format(new Date(transaction.created_date), 'MMM d, yyyy • HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}