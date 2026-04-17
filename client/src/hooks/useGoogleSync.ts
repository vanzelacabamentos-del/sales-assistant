import { useEffect, useState, useCallback } from "react";
import { googleAuth } from "@/lib/googleAuth";
import { gmailService, GmailMessage } from "@/lib/gmailService";
import { calendarService, CalendarEvent } from "@/lib/calendarService";

interface SyncState {
  isLoading: boolean;
  error: string | null;
  lastSyncTime: Date | null;
  emails: GmailMessage[];
  events: CalendarEvent[];
}

export function useGoogleSync() {
  const [state, setState] = useState<SyncState>({
    isLoading: false,
    error: null,
    lastSyncTime: null,
    emails: [],
    events: [],
  });

  const syncEmails = useCallback(async () => {
    if (!googleAuth.isAuthenticated()) {
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const emails = await gmailService.getMessages("", 20);
      setState((prev) => ({
        ...prev,
        emails,
        lastSyncTime: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sync emails",
        isLoading: false,
      }));
    }
  }, []);

  const syncCalendar = useCallback(async () => {
    if (!googleAuth.isAuthenticated()) {
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const events = await calendarService.getUpcomingEvents("primary", 20);
      setState((prev) => ({
        ...prev,
        events,
        lastSyncTime: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sync calendar",
        isLoading: false,
      }));
    }
  }, []);

  const syncAll = useCallback(async () => {
    await Promise.all([syncEmails(), syncCalendar()]);
  }, [syncEmails, syncCalendar]);

  // Auto-sync on mount and every 5 minutes
  useEffect(() => {
    if (googleAuth.isAuthenticated()) {
      syncAll();
      const interval = setInterval(syncAll, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [syncAll]);

  return {
    ...state,
    syncEmails,
    syncCalendar,
    syncAll,
  };
}
