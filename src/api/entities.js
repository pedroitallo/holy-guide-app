// Mock entities for development
// In a real app, these would be replaced with actual API calls

class MockEntity {
  constructor(name) {
    this.name = name;
    this.data = JSON.parse(localStorage.getItem(`${name}_data`) || '[]');
  }

  async list(orderBy = 'id', limit = 100) {
    let data = [...this.data];
    if (orderBy.startsWith('-')) {
      const field = orderBy.substring(1);
      data.sort((a, b) => new Date(b[field]) - new Date(a[field]));
    }
    return data.slice(0, limit);
  }

  async filter(filters, orderBy = 'id', limit = 100) {
    let filtered = this.data.filter(item => {
      return Object.entries(filters).every(([key, value]) => item[key] === value);
    });
    
    if (orderBy.startsWith('-')) {
      const field = orderBy.substring(1);
      filtered.sort((a, b) => new Date(b[field]) - new Date(a[field]));
    }
    
    return filtered.slice(0, limit);
  }

  async create(data) {
    const newItem = {
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      ...data
    };
    this.data.push(newItem);
    localStorage.setItem(`${this.name}_data`, JSON.stringify(this.data));
    return newItem;
  }

  async update(id, data) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...data };
      localStorage.setItem(`${this.name}_data`, JSON.stringify(this.data));
      return this.data[index];
    }
    throw new Error('Item not found');
  }
}

// Mock user authentication
class MockUser {
  async me() {
    const userData = JSON.parse(localStorage.getItem('user_data') || 'null');
    if (!userData) {
      throw new Error('User not authenticated');
    }
    return userData;
  }

  async updateMyUserData(data) {
    const currentUser = await this.me();
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    return updatedUser;
  }

  loginWithRedirect(redirectUrl) {
    // Mock login - in a real app, this would redirect to an auth provider
    const mockUser = {
      id: 'user_' + Date.now(),
      email: 'user@example.com',
      full_name: 'Spiritual Seeker',
      coins: 10,
      is_premium: false,
      role: 'user',
      created_date: new Date().toISOString(),
      last_login_date: new Date().toISOString()
    };
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    window.location.href = redirectUrl || '/home';
  }
}

export const Reading = new MockEntity('Reading');
export const JourneyEntry = new MockEntity('JourneyEntry');
export const NotificationLog = new MockEntity('NotificationLog');
export const Transaction = new MockEntity('Transaction');
export const Revelation = new MockEntity('Revelation');
export const CoinTransaction = new MockEntity('CoinTransaction');
export const PaymentRecord = new MockEntity('PaymentRecord');
export const Feedback = new MockEntity('Feedback');
export const TarotCard = new MockEntity('TarotCard');
export const DailyCardDraw = new MockEntity('DailyCardDraw');
export const Horoscope = new MockEntity('Horoscope');
export const ChatHistory = new MockEntity('ChatHistory');
export const HotmartEventLog = new MockEntity('HotmartEventLog');

// Mock user auth
export const User = new MockUser();