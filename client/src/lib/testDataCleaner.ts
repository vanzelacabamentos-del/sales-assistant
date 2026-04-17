/**
 * Test Data Cleaner
 * Utilities for cleaning and resetting test data
 */

export interface CleanupResult {
  success: boolean;
  itemsCleaned: number;
  itemsFailed: number;
  errors: string[];
}

class TestDataCleaner {
  /**
   * Clear all localStorage data
   */
  clearLocalStorage(): CleanupResult {
    const errors: string[] = [];
    let itemsCleaned = 0;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        try {
          localStorage.removeItem(key);
          itemsCleaned++;
        } catch (error) {
          errors.push(`Failed to remove localStorage key: ${key}`);
        }
      });
    } catch (error) {
      errors.push(`Failed to clear localStorage: ${error}`);
    }

    return {
      success: errors.length === 0,
      itemsCleaned,
      itemsFailed: errors.length,
      errors,
    };
  }

  /**
   * Clear all sessionStorage data
   */
  clearSessionStorage(): CleanupResult {
    const errors: string[] = [];
    let itemsCleaned = 0;

    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach((key) => {
        try {
          sessionStorage.removeItem(key);
          itemsCleaned++;
        } catch (error) {
          errors.push(`Failed to remove sessionStorage key: ${key}`);
        }
      });
    } catch (error) {
      errors.push(`Failed to clear sessionStorage: ${error}`);
    }

    return {
      success: errors.length === 0,
      itemsCleaned,
      itemsFailed: errors.length,
      errors,
    };
  }

  /**
   * Clear all cookies
   */
  clearCookies(): CleanupResult {
    const errors: string[] = [];
    let itemsCleaned = 0;

    try {
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        if (name) {
          try {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
            itemsCleaned++;
          } catch (error) {
            errors.push(`Failed to remove cookie: ${name}`);
          }
        }
      });
    } catch (error) {
      errors.push(`Failed to clear cookies: ${error}`);
    }

    return {
      success: errors.length === 0,
      itemsCleaned,
      itemsFailed: errors.length,
      errors,
    };
  }

  /**
   * Clear IndexedDB
   */
  async clearIndexedDB(): Promise<CleanupResult> {
    const errors: string[] = [];
    let itemsCleaned = 0;

    try {
      const databases = await (indexedDB as any).databases?.();

      if (databases) {
        for (const db of databases) {
          try {
            indexedDB.deleteDatabase(db.name);
            itemsCleaned++;
          } catch (error) {
            errors.push(`Failed to delete IndexedDB: ${db.name}`);
          }
        }
      }
    } catch (error) {
      errors.push(`Failed to clear IndexedDB: ${error}`);
    }

    return {
      success: errors.length === 0,
      itemsCleaned,
      itemsFailed: errors.length,
      errors,
    };
  }

  /**
   * Clear specific test data keys
   */
  clearTestDataKeys(keys: string[]): CleanupResult {
    const errors: string[] = [];
    let itemsCleaned = 0;

    keys.forEach((key) => {
      try {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
        itemsCleaned++;
      } catch (error) {
        errors.push(`Failed to remove key: ${key}`);
      }
    });

    return {
      success: errors.length === 0,
      itemsCleaned,
      itemsFailed: errors.length,
      errors,
    };
  }

  /**
   * Reset authentication data
   */
  resetAuthData(): CleanupResult {
    const authKeys = [
      "google_auth_token",
      "auth_redirect",
      "user_session",
      "access_token",
      "refresh_token",
    ];

    return this.clearTestDataKeys(authKeys);
  }

  /**
   * Reset API cache data
   */
  resetApiCache(): CleanupResult {
    const cacheKeys = [
      "gmail_messages",
      "calendar_events",
      "whatsapp_messages",
      "api_cache",
    ];

    return this.clearTestDataKeys(cacheKeys);
  }

  /**
   * Full cleanup - clear everything
   */
  async fullCleanup(): Promise<{
    localStorage: CleanupResult;
    sessionStorage: CleanupResult;
    cookies: CleanupResult;
    indexedDB: CleanupResult;
    totalCleaned: number;
    totalFailed: number;
  }> {
    const results = {
      localStorage: this.clearLocalStorage(),
      sessionStorage: this.clearSessionStorage(),
      cookies: this.clearCookies(),
      indexedDB: await this.clearIndexedDB(),
      totalCleaned: 0,
      totalFailed: 0,
    };

    results.totalCleaned =
      results.localStorage.itemsCleaned +
      results.sessionStorage.itemsCleaned +
      results.cookies.itemsCleaned +
      results.indexedDB.itemsCleaned;

    results.totalFailed =
      results.localStorage.itemsFailed +
      results.sessionStorage.itemsFailed +
      results.cookies.itemsFailed +
      results.indexedDB.itemsFailed;

    return results;
  }

  /**
   * Generate test data
   */
  generateTestData(): void {
    const testData = {
      testUser: {
        id: "test-user-1",
        email: "test@example.com",
        name: "Test User",
      },
      testMessages: [
        {
          id: "msg-1",
          text: "Test message 1",
          timestamp: new Date().toISOString(),
        },
        {
          id: "msg-2",
          text: "Test message 2",
          timestamp: new Date().toISOString(),
        },
      ],
      testContacts: [
        { id: "contact-1", name: "Contact 1", email: "contact1@example.com" },
        { id: "contact-2", name: "Contact 2", email: "contact2@example.com" },
      ],
    };

    localStorage.setItem("test_data", JSON.stringify(testData));
  }

  /**
   * Get cleanup report
   */
  getCleanupReport(): string {
    return `
=== Test Data Cleanup Report ===
Generated: ${new Date().toISOString()}

Storage Status:
- LocalStorage items: ${Object.keys(localStorage).length}
- SessionStorage items: ${Object.keys(sessionStorage).length}
- Cookies: ${document.cookie.split(";").length}

Recommended Actions:
1. Clear localStorage for fresh start
2. Clear sessionStorage for clean session
3. Clear cookies for authentication reset
4. Clear IndexedDB for cache reset
    `;
  }
}

export const testDataCleaner = new TestDataCleaner();
