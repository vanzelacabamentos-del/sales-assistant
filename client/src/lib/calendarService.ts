import { googleAuth } from "./googleAuth";

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus: string;
  }>;
  organizer?: {
    email: string;
    displayName?: string;
  };
  location?: string;
  status: string;
  htmlLink: string;
}

export interface Calendar {
  id: string;
  summary: string;
  description?: string;
  timeZone?: string;
  primary?: boolean;
}

class CalendarService {
  private baseUrl = "https://www.googleapis.com/calendar/v3";

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
        throw new Error("Token expired");
      }
      throw new Error(`Calendar API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCalendars(): Promise<Calendar[]> {
    try {
      const data = await this.makeRequest("/users/me/calendarList");
      return data.items || [];
    } catch (error) {
      console.error("Failed to get calendars:", error);
      return [];
    }
  }

  async getEvents(
    calendarId: string = "primary",
    timeMin?: string,
    timeMax?: string,
    maxResults: number = 10
  ): Promise<CalendarEvent[]> {
    try {
      let endpoint = `/calendars/${calendarId}/events?maxResults=${maxResults}`;

      if (timeMin) {
        endpoint += `&timeMin=${encodeURIComponent(timeMin)}`;
      }
      if (timeMax) {
        endpoint += `&timeMax=${encodeURIComponent(timeMax)}`;
      }

      endpoint += "&orderBy=startTime&singleEvents=true";

      const data = await this.makeRequest(endpoint);
      return data.items || [];
    } catch (error) {
      console.error("Failed to get events:", error);
      return [];
    }
  }

  async getUpcomingEvents(
    calendarId: string = "primary",
    maxResults: number = 10
  ): Promise<CalendarEvent[]> {
    try {
      const now = new Date().toISOString();
      const oneMonthLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      return this.getEvents(calendarId, now, oneMonthLater, maxResults);
    } catch (error) {
      console.error("Failed to get upcoming events:", error);
      return [];
    }
  }

  async createEvent(
    calendarId: string = "primary",
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    try {
      return await this.makeRequest(`/calendars/${calendarId}/events`, {
        method: "POST",
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to create event:", error);
      throw error;
    }
  }

  async updateEvent(
    calendarId: string = "primary",
    eventId: string,
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    try {
      return await this.makeRequest(
        `/calendars/${calendarId}/events/${eventId}`,
        {
          method: "PUT",
          body: JSON.stringify(event),
        }
      );
    } catch (error) {
      console.error("Failed to update event:", error);
      throw error;
    }
  }

  async deleteEvent(
    calendarId: string = "primary",
    eventId: string
  ): Promise<void> {
    try {
      await this.makeRequest(
        `/calendars/${calendarId}/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw error;
    }
  }

  async getEvent(
    calendarId: string = "primary",
    eventId: string
  ): Promise<CalendarEvent> {
    try {
      return await this.makeRequest(`/calendars/${calendarId}/events/${eventId}`);
    } catch (error) {
      console.error("Failed to get event:", error);
      throw error;
    }
  }

  formatEventTime(event: CalendarEvent): string {
    const start = event.start.dateTime || event.start.date;
    if (!start) return "";

    const date = new Date(start);
    return date.toLocaleString("pt-BR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export const calendarService = new CalendarService();
