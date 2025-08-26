
import {
  Heart, DollarSign, Activity, Moon, Mic, BookOpen, Music, Mail, Edit3, Wind, Star,
  CheckSquare, Layers, MessageSquare, Volume2, Lock, Gift, Watch, Zap, Droplets, Shield
} from 'lucide-react';

export const journeysData = {
  love: {
    title: 'Love',
    icon: Heart,
    sections: [
      {
        title: 'Awakening Divine Love',
        description: 'Open your heart and awaken your love energy.',
        cards: [
          { title: 'Guided Prayer', subtitle: 'Open Your Heart to Receive Divine Love', type: 'audio', icon: Mic },
          { title: 'Daily Love Affirmations', subtitle: 'Repeat daily for positive energy', type: 'text', icon: MessageSquare },
          { title: 'Card Reading', subtitle: 'What is blocking your love energy?', type: 'interactive', icon: Layers },
          { title: 'Light Frequency', subtitle: 'Heart Chakra Activation', type: 'audio', icon: Music },
          { title: 'Spiritual Letter', subtitle: 'From your Soulmate', type: 'text', icon: Mail },
        ],
      },
      {
        title: 'Healing Past Bonds',
        description: 'Release traumas and attachments from the past.',
        cards: [
          { title: 'Meditation', subtitle: 'Letting Go of Old Love Energies', type: 'audio', icon: Mic },
          { title: 'Journal Prompt', subtitle: 'Who do you still carry in your heart?', type: 'interactive', icon: Edit3 },
          { title: 'Angel Card', subtitle: 'Message of Forgiveness', type: 'interactive', icon: Star },
          { title: 'Release Ritual', subtitle: 'Release the Name of the Past', type: 'audio', icon: Wind },
          { title: 'Emotional Cleanse', subtitle: 'Healing Frequency', type: 'audio', icon: Music },
        ],
      },
      {
        title: 'Attracting True Love',
        description: 'Raise your vibration to attract your ideal love.',
        cards: [
          { title: 'Creative Visualization', subtitle: 'Meeting Your Divine Soulmate', type: 'audio', icon: Mic },
          { title: 'Frequency of Love', subtitle: 'To attract love prosperity', type: 'audio', icon: Music },
          { title: 'Soulmate Insight', subtitle: 'Personalized Message', type: 'interactive', icon: Layers },
          { title: 'Commitment Ritual', subtitle: 'Are you ready to receive?', type: 'interactive', icon: Lock },
          { title: 'Secret Message', subtitle: 'From the Universe to You', type: 'text', icon: Gift },
        ],
      },
    ],
  },
  prosperity: {
    title: 'Prosperity',
    icon: DollarSign,
    sections: [
      {
        title: 'Break Money Blocks',
        description: 'Identify and dissolve limiting beliefs.',
        cards: [
          { title: 'Meditation', subtitle: 'Cleansing Poverty Mindset', type: 'audio', icon: Mic },
          { title: 'Money Belief Test', subtitle: 'Interactive Quiz', type: 'interactive', icon: CheckSquare },
          { title: 'Card Reading', subtitle: 'What’s holding back your abundance?', type: 'interactive', icon: Layers },
          { title: 'Forgiveness Letter', subtitle: 'To Money', type: 'interactive', icon: Edit3 },
          { title: 'Frequency of Release', subtitle: 'Dissolving Scarcity', type: 'audio', icon: Music },
        ],
      },
      {
        title: 'Align with Abundance',
        description: 'Create a new vibrational field of prosperity.',
        cards: [
          { title: 'Daily Affirmations', subtitle: 'For Abundance', type: 'audio', icon: Mic },
          { title: 'Journal Prompt', subtitle: 'What does abundance mean to me?', type: 'interactive', icon: Edit3 },
          { title: 'Divine Message', subtitle: 'From the Angel of Wealth', type: 'text', icon: Mail },
          { title: 'Audio Ritual', subtitle: 'Speak your Financial Truth', type: 'audio', icon: Volume2 },
          { title: 'Visualization', subtitle: 'Your Abundant Life Now', type: 'audio', icon: Mic },
        ],
      },
      {
        title: 'Activate Manifestation',
        description: 'Manifest opportunities and open new paths.',
        cards: [
          { title: 'Law of Attraction Ritual', subtitle: 'Guided Audio', type: 'audio', icon: Mic },
          { title: 'Oracle Card', subtitle: 'The Opportunity Coming Your Way', type: 'interactive', icon: Star },
          { title: 'Action of the Day', subtitle: 'Practical Prosperity Mission', type: 'interactive', icon: Zap },
          { title: 'Frequency', subtitle: 'Magnetizing Wealth', type: 'audio', icon: Music },
          { title: 'Commitment Card', subtitle: 'Your contract with abundance', type: 'interactive', icon: Lock },
        ],
      },
    ],
  },
  health: {
    title: 'Health',
    icon: Activity,
    sections: [
      {
        title: 'Body & Energy Reset',
        description: 'Prepare your body and your energy field.',
        cards: [
          { title: 'Breathwork Session', subtitle: 'Guided to Revitalize', type: 'audio', icon: Wind },
          { title: 'Chakra Balance', subtitle: 'Healing Frequency', type: 'audio', icon: Music },
          { title: 'Body Scan', subtitle: 'How do you feel today?', type: 'interactive', icon: CheckSquare },
          { title: 'Message from your Body', subtitle: 'Channeled Insight', type: 'text', icon: Mail },
          { title: 'Energy Cleanse Ritual', subtitle: 'Energetic Purification', type: 'audio', icon: Droplets },
        ],
      },
      {
        title: 'Emotional Detox',
        description: 'Clear dense emotions that affect your body.',
        cards: [
          { title: 'Meditation', subtitle: 'Release Anxiety & Fear', type: 'audio', icon: Mic },
          { title: 'Journal Prompt', subtitle: 'What emotion is stuck?', type: 'interactive', icon: Edit3 },
          { title: 'Sound Frequency', subtitle: 'Cleansing Cellular Memory', type: 'audio', icon: Music },
          { title: 'Divine Healing', subtitle: 'Spiritual Message', type: 'text', icon: Mail },
          { title: 'Ritual of Water', subtitle: 'Speak to your body', type: 'audio', icon: Droplets },
        ],
      },
      {
        title: 'Restore Vitality',
        description: 'Regain energy, strength, and well-being.',
        cards: [
          { title: 'Visualization', subtitle: 'Your Strongest Self', type: 'audio', icon: Mic },
          { title: 'Frequency of Vitality', subtitle: 'For Strength & Energy', type: 'audio', icon: Music },
          { title: 'Commitment Card', subtitle: 'Daily act of health', type: 'interactive', icon: Lock },
          { title: 'Guided Prayer', subtitle: 'For Health & Protection', type: 'audio', icon: Mic },
          { title: 'Celestial Body Reading', subtitle: 'Message from your soul', type: 'text', icon: Mail },
        ],
      },
    ],
  },
  relax: {
    title: 'Relax',
    icon: Moon,
    sections: [
      {
        title: 'Release the Day',
        description: 'Slow down and disconnect from daily tension.',
        cards: [
          { title: 'Evening Prayer', subtitle: 'For Inner Peace', type: 'audio', icon: Mic },
          { title: 'Deep Relaxation', subtitle: 'Binaural Audio', type: 'audio', icon: Music },
          { title: 'Guardian Message', subtitle: 'For Tonight', type: 'interactive', icon: Shield },
          { title: 'Journal Prompt', subtitle: 'What can I leave behind today?', type: 'interactive', icon: Edit3 },
          { title: 'Breath Practice', subtitle: '1-2 Minute Session', type: 'audio', icon: Wind },
        ],
      },
      {
        title: 'Find Inner Silence',
        description: 'Calm your mind and nervous system.',
        cards: [
          { title: 'Sound Bath', subtitle: 'Bells & Crystals', type: 'audio', icon: Music },
          { title: 'Silence Challenge', subtitle: 'Timer with Nature Sounds', type: 'interactive', icon: Watch },
          { title: 'Quote of the Day', subtitle: 'For your Reflection', type: 'text', icon: MessageSquare },
          { title: 'Frequency', subtitle: 'Mind Stillness', type: 'audio', icon: Music },
          { title: 'Divine Whisper', subtitle: 'Card of Guidance', type: 'interactive', icon: Layers },
        ],
      },
      {
        title: 'Enter Sacred Rest',
        description: 'Access a deep state of rest and reconnection.',
        cards: [
          { title: 'Sleep Ritual', subtitle: 'Symbolic Instruction', type: 'audio', icon: Mic },
          { title: 'Angel Message', subtitle: 'Before Sleeping', type: 'text', icon: Mail },
          { title: 'Gratitude Reflection', subtitle: 'Interactive Card', type: 'interactive', icon: Edit3 },
          { title: 'Night Visualization', subtitle: 'Guided Journey', type: 'audio', icon: Mic },
          { title: 'Portal Card', subtitle: 'The Dream Gateway', type: 'interactive', icon: Star },
        ],
      },
    ],
  },
};
