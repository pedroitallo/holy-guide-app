// Mock data for development
export const mockTarotCards = [
  {
    id: 1,
    name: "The Fool",
    card_number: 0,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop",
    keywords: ["New beginnings", "Innocence", "Adventure"],
    daily_tips: [
      "Trust your instincts today",
      "Take a leap of faith",
      "Embrace new opportunities"
    ],
    interpretations: [
      "A new journey is beginning. Trust in the process and take that first step.",
      "Your innocence and openness will guide you to unexpected opportunities.",
      "Don't let fear hold you back from exploring new possibilities."
    ]
  },
  {
    id: 2,
    name: "The Magician",
    card_number: 1,
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=500&fit=crop",
    keywords: ["Manifestation", "Power", "Skill"],
    daily_tips: [
      "Focus your energy on your goals",
      "Use your skills wisely",
      "Manifest your desires"
    ],
    interpretations: [
      "You have all the tools you need to succeed. Focus your energy and manifest your dreams.",
      "Your personal power is at its peak. Use it to create positive change.",
      "The universe is supporting your efforts. Take action with confidence."
    ]
  },
  {
    id: 3,
    name: "The High Priestess",
    card_number: 2,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=500&fit=crop",
    keywords: ["Intuition", "Mystery", "Wisdom"],
    daily_tips: [
      "Listen to your inner voice",
      "Trust your intuition",
      "Seek deeper understanding"
    ],
    interpretations: [
      "Your intuition is heightened. Pay attention to your inner wisdom.",
      "Hidden knowledge will be revealed to you. Stay open to spiritual insights.",
      "Trust the mysterious forces guiding your path."
    ]
  },
  {
    id: 4,
    name: "The Empress",
    card_number: 3,
    image_url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=500&fit=crop",
    keywords: ["Fertility", "Abundance", "Nature"],
    daily_tips: [
      "Nurture your creative projects",
      "Connect with nature",
      "Embrace abundance"
    ],
    interpretations: [
      "A time of growth and abundance is coming. Nurture your dreams.",
      "Your creative energy is flowing. Use it to bring beauty into the world.",
      "Mother Earth is supporting your endeavors. Ground yourself in nature."
    ]
  },
  {
    id: 5,
    name: "The Emperor",
    card_number: 4,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=500&fit=crop",
    keywords: ["Authority", "Structure", "Leadership"],
    daily_tips: [
      "Take charge of your situation",
      "Create order in your life",
      "Lead by example"
    ],
    interpretations: [
      "It's time to take control and establish order in your life.",
      "Your leadership qualities are needed. Step into your power.",
      "Structure and discipline will help you achieve your goals."
    ]
  },
  {
    id: 6,
    name: "The Hierophant",
    card_number: 5,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop",
    keywords: ["Tradition", "Spirituality", "Teaching"],
    daily_tips: [
      "Seek spiritual guidance",
      "Honor traditions",
      "Share your wisdom"
    ],
    interpretations: [
      "Spiritual guidance is available to you. Seek wisdom from trusted sources.",
      "Traditional approaches may hold the key to your current situation.",
      "You have wisdom to share with others. Don't keep it to yourself."
    ]
  },
  {
    id: 7,
    name: "The Lovers",
    card_number: 6,
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=500&fit=crop",
    keywords: ["Love", "Choice", "Union"],
    daily_tips: [
      "Follow your heart",
      "Make choices based on love",
      "Seek harmony in relationships"
    ],
    interpretations: [
      "A significant choice about love or relationships is before you.",
      "Union and harmony are possible. Choose love over fear.",
      "Your heart knows the way. Trust its guidance in matters of love."
    ]
  }
];

// Initialize mock data in localStorage if not present
export const initializeMockData = () => {
  if (!localStorage.getItem('TarotCard_data')) {
    localStorage.setItem('TarotCard_data', JSON.stringify(mockTarotCards));
  }
};