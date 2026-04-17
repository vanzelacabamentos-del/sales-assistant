// Google OAuth Configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

interface GoogleAuthToken {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  scope: string;
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

class GoogleAuthService {
  private token: GoogleAuthToken | null = null;
  private user: GoogleUser | null = null;

  constructor() {
    this.loadToken();
  }

  private loadToken() {
    const stored = localStorage.getItem("google_auth_token");
    if (stored) {
      try {
        this.token = JSON.parse(stored);
        // Check if token is expired
        if (this.token && this.token.expires_at < Date.now()) {
          this.token = null;
          localStorage.removeItem("google_auth_token");
        }
      } catch (error) {
        console.error("Failed to load stored token:", error);
        localStorage.removeItem("google_auth_token");
      }
    }
  }

  private saveToken(token: GoogleAuthToken) {
    this.token = token;
    localStorage.setItem("google_auth_token", JSON.stringify(token));
  }

  async initiateLogin(): Promise<void> {
    // In a real app, this would use Google's OAuth flow
    // For now, we'll create a placeholder that shows the flow
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", `${window.location.origin}/auth/callback`);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", GOOGLE_SCOPES.join(" "));
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    // Store the original location to redirect after auth
    sessionStorage.setItem("auth_redirect", window.location.pathname);

    window.location.href = authUrl.toString();
  }

  async handleAuthCallback(code: string): Promise<GoogleAuthToken> {
    // This would be handled by the backend
    // For now, we'll simulate a successful auth
    const mockToken: GoogleAuthToken = {
      access_token: `mock_token_${Date.now()}`,
      expires_at: Date.now() + 3600000, // 1 hour
      scope: GOOGLE_SCOPES.join(" "),
    };

    this.saveToken(mockToken);
    return mockToken;
  }

  getToken(): GoogleAuthToken | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.token.expires_at > Date.now();
  }

  async getUser(): Promise<GoogleUser | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    if (this.user) {
      return this.user;
    }

    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${this.token?.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      this.user = {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
      };

      return this.user;
    } catch (error) {
      console.error("Failed to get user info:", error);
      return null;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem("google_auth_token");
  }
}

export const googleAuth = new GoogleAuthService();
export type { GoogleAuthToken, GoogleUser };
