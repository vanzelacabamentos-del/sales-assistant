import { googleAuth } from "./googleAuth";

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload?: {
    headers: Array<{ name: string; value: string }>;
    parts?: Array<{ mimeType: string; data?: string }>;
  };
  internalDate: string;
}

export interface GmailThread {
  id: string;
  snippet: string;
  historyId: string;
  messages: GmailMessage[];
}

class GmailService {
  private baseUrl = "https://www.googleapis.com/gmail/v1/users/me";

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = googleAuth.getToken();
    if (!token) {
      throw new Error("Not authenticated with Google");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, need to refresh
        throw new Error("Token expired");
      }
      throw new Error(`Gmail API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getMessages(query: string = "", maxResults: number = 10): Promise<GmailMessage[]> {
    try {
      const data = await this.makeRequest(
        `/messages?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
      );

      if (!data.messages) {
        return [];
      }

      // Fetch full message details for each message
      const messages = await Promise.all(
        data.messages.map((msg: { id: string }) => this.getMessage(msg.id))
      );

      return messages;
    } catch (error) {
      console.error("Failed to get messages:", error);
      return [];
    }
  }

  async getMessage(messageId: string): Promise<GmailMessage> {
    try {
      return await this.makeRequest(`/messages/${messageId}`);
    } catch (error) {
      console.error("Failed to get message:", error);
      throw error;
    }
  }

  async getThreads(query: string = "", maxResults: number = 10): Promise<GmailThread[]> {
    try {
      const data = await this.makeRequest(
        `/threads?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
      );

      if (!data.threads) {
        return [];
      }

      // Fetch full thread details
      const threads = await Promise.all(
        data.threads.map((thread: { id: string }) => this.getThread(thread.id))
      );

      return threads;
    } catch (error) {
      console.error("Failed to get threads:", error);
      return [];
    }
  }

  async getThread(threadId: string): Promise<GmailThread> {
    try {
      return await this.makeRequest(`/threads/${threadId}`);
    } catch (error) {
      console.error("Failed to get thread:", error);
      throw error;
    }
  }

  async sendMessage(
    to: string,
    subject: string,
    body: string
  ): Promise<{ id: string; threadId: string }> {
    try {
      const email = [
        `To: ${to}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "",
        body,
      ].join("\n");

      const encodedEmail = btoa(email).replace(/\+/g, "-").replace(/\//g, "_");

      return await this.makeRequest("/messages/send", {
        method: "POST",
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }

  async getLabels(): Promise<Array<{ id: string; name: string }>> {
    try {
      const data = await this.makeRequest("/labels");
      return data.labels || [];
    } catch (error) {
      console.error("Failed to get labels:", error);
      return [];
    }
  }

  parseMessageHeaders(message: GmailMessage): {
    from: string;
    to: string;
    subject: string;
    date: string;
  } {
    const headers = message.payload?.headers || [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name === name)?.value || "";

    return {
      from: getHeader("From"),
      to: getHeader("To"),
      subject: getHeader("Subject"),
      date: getHeader("Date"),
    };
  }

  getMessageBody(message: GmailMessage): string {
    const parts = message.payload?.parts || [];
    let body = "";

    const findBody = (parts: any[]): string => {
      for (const part of parts) {
        if (part.mimeType === "text/plain") {
          return part.data ? atob(part.data) : "";
        }
        if (part.parts) {
          const result = findBody(part.parts);
          if (result) return result;
        }
      }
      return "";
    };

    return findBody(parts) || message.snippet || "";
  }
}

export const gmailService = new GmailService();
