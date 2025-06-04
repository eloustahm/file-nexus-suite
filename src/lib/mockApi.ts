
/**
 * Mock API service for development when no backend is available
 */

interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface MockSession {
  user: MockUser;
  token: string;
  expiresAt: Date;
}

class MockApiService {
  private currentSession: MockSession | null = null;
  private users: Map<string, { user: MockUser; password: string }> = new Map();

  constructor() {
    // Add a default user for testing
    this.users.set('demo@example.com', {
      user: {
        id: '1',
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        role: 'user',
        avatar: undefined
      },
      password: 'password'
    });

    // Check for existing session in localStorage
    const storedSession = localStorage.getItem('mock_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (new Date(session.expiresAt) > new Date()) {
          this.currentSession = {
            ...session,
            expiresAt: new Date(session.expiresAt)
          };
        } else {
          localStorage.removeItem('mock_session');
        }
      } catch (error) {
        localStorage.removeItem('mock_session');
      }
    }
  }

  private saveSession(session: MockSession) {
    this.currentSession = session;
    localStorage.setItem('mock_session', JSON.stringify(session));
  }

  private clearSession() {
    this.currentSession = null;
    localStorage.removeItem('mock_session');
  }

  async csrf() {
    // Mock CSRF - just return success
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  async login(credentials: { email: string; password: string }) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const userRecord = this.users.get(credentials.email);
    if (!userRecord || userRecord.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    const session: MockSession = {
      user: userRecord.user,
      token: 'mock_token_' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };

    this.saveSession(session);
    return session;
  }

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    if (this.users.has(data.email)) {
      throw new Error('User already exists');
    }

    const user: MockUser = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'user'
    };

    this.users.set(data.email, { user, password: data.password });

    const session: MockSession = {
      user,
      token: 'mock_token_' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };

    this.saveSession(session);
    return session;
  }

  async getCurrentUser(): Promise<MockUser> {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    
    if (!this.currentSession || new Date() > this.currentSession.expiresAt) {
      this.clearSession();
      throw new Error('No active session');
    }

    return this.currentSession.user;
  }

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    this.clearSession();
    return { success: true };
  }

  async resetPassword(email: string) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    if (!this.users.has(email)) {
      throw new Error('User not found');
    }

    // In a real app, this would send an email
    console.log(`Password reset email sent to ${email}`);
    return { success: true };
  }
}

export const mockApiService = new MockApiService();
