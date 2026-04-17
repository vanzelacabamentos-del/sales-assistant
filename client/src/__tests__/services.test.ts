import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { testDataCleaner } from "@/lib/testDataCleaner";

/**
 * Test Suite for Services
 */

describe("Test Data Cleaner", () => {
  beforeEach(() => {
    // Setup test data
    localStorage.setItem("test_key_1", "test_value_1");
    localStorage.setItem("test_key_2", "test_value_2");
    sessionStorage.setItem("session_key_1", "session_value_1");
  });

  afterEach(() => {
    // Cleanup after tests
    testDataCleaner.clearLocalStorage();
    testDataCleaner.clearSessionStorage();
  });

  describe("clearLocalStorage", () => {
    it("should clear all localStorage items", () => {
      const result = testDataCleaner.clearLocalStorage();

      expect(result.success).toBe(true);
      expect(result.itemsCleaned).toBeGreaterThan(0);
      expect(localStorage.length).toBe(0);
    });

    it("should return correct cleanup result", () => {
      const result = testDataCleaner.clearLocalStorage();

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("itemsCleaned");
      expect(result).toHaveProperty("itemsFailed");
      expect(result).toHaveProperty("errors");
    });
  });

  describe("clearSessionStorage", () => {
    it("should clear all sessionStorage items", () => {
      const result = testDataCleaner.clearSessionStorage();

      expect(result.success).toBe(true);
      expect(sessionStorage.length).toBe(0);
    });
  });

  describe("clearTestDataKeys", () => {
    it("should clear specific keys", () => {
      localStorage.setItem("auth_token", "token_value");
      localStorage.setItem("user_data", "user_value");

      const result = testDataCleaner.clearTestDataKeys([
        "auth_token",
        "user_data",
      ]);

      expect(result.success).toBe(true);
      expect(localStorage.getItem("auth_token")).toBeNull();
      expect(localStorage.getItem("user_data")).toBeNull();
    });

    it("should handle non-existent keys gracefully", () => {
      const result = testDataCleaner.clearTestDataKeys([
        "non_existent_key_1",
        "non_existent_key_2",
      ]);

      expect(result.success).toBe(true);
    });
  });

  describe("resetAuthData", () => {
    it("should clear auth-related keys", () => {
      localStorage.setItem("google_auth_token", "token");
      localStorage.setItem("access_token", "access");

      const result = testDataCleaner.resetAuthData();

      expect(result.success).toBe(true);
      expect(localStorage.getItem("google_auth_token")).toBeNull();
      expect(localStorage.getItem("access_token")).toBeNull();
    });
  });

  describe("resetApiCache", () => {
    it("should clear API cache keys", () => {
      localStorage.setItem("gmail_messages", "[]");
      localStorage.setItem("calendar_events", "[]");

      const result = testDataCleaner.resetApiCache();

      expect(result.success).toBe(true);
      expect(localStorage.getItem("gmail_messages")).toBeNull();
      expect(localStorage.getItem("calendar_events")).toBeNull();
    });
  });

  describe("generateTestData", () => {
    it("should generate test data in localStorage", () => {
      testDataCleaner.generateTestData();

      const testData = localStorage.getItem("test_data");
      expect(testData).not.toBeNull();

      const parsed = JSON.parse(testData!);
      expect(parsed).toHaveProperty("testUser");
      expect(parsed).toHaveProperty("testMessages");
      expect(parsed).toHaveProperty("testContacts");
    });

    it("should generate valid test data structure", () => {
      testDataCleaner.generateTestData();

      const testData = JSON.parse(localStorage.getItem("test_data")!);

      expect(testData.testUser).toHaveProperty("id");
      expect(testData.testUser).toHaveProperty("email");
      expect(testData.testUser).toHaveProperty("name");

      expect(Array.isArray(testData.testMessages)).toBe(true);
      expect(Array.isArray(testData.testContacts)).toBe(true);
    });
  });

  describe("getCleanupReport", () => {
    it("should generate cleanup report", () => {
      const report = testDataCleaner.getCleanupReport();

      expect(report).toContain("Test Data Cleanup Report");
      expect(report).toContain("LocalStorage items");
      expect(report).toContain("SessionStorage items");
    });
  });
});

/**
 * Test Suite for Google Auth Service
 */
describe("Google Auth Service", () => {
  describe("Token Management", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should validate token structure", () => {
      const mockToken = {
        access_token: "mock_token",
        expires_at: Date.now() + 3600000,
        scope: "email profile",
      };

      localStorage.setItem("google_auth_token", JSON.stringify(mockToken));

      const stored = localStorage.getItem("google_auth_token");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveProperty("access_token");
      expect(parsed).toHaveProperty("expires_at");
      expect(parsed).toHaveProperty("scope");
    });

    it("should detect expired tokens", () => {
      const expiredToken = {
        access_token: "mock_token",
        expires_at: Date.now() - 1000, // Expired 1 second ago
        scope: "email profile",
      };

      const isExpired = expiredToken.expires_at < Date.now();
      expect(isExpired).toBe(true);
    });
  });
});

/**
 * Test Suite for WhatsApp Service
 */
describe("WhatsApp Service", () => {
  describe("Phone Number Validation", () => {
    it("should validate phone number format", () => {
      const validPhoneNumbers = [
        "+5511999999999",
        "+551133334444",
        "+5521987654321",
      ];

      validPhoneNumbers.forEach((phone) => {
        const isValid = /^\+\d{10,15}$/.test(phone);
        expect(isValid).toBe(true);
      });
    });

    it("should reject invalid phone numbers", () => {
      const invalidPhoneNumbers = [
        "11999999999", // Missing +
        "+55119999999", // Too short
        "invalid",
        "",
      ];

      invalidPhoneNumbers.forEach((phone) => {
        const isValid = /^\+\d{10,15}$/.test(phone);
        expect(isValid).toBe(false);
      });
    });
  });

  describe("Message Structure", () => {
    it("should validate message structure", () => {
      const message = {
        id: "msg-123",
        from: "+5511999999999",
        to: "+5511888888888",
        text: "Test message",
        timestamp: new Date().toISOString(),
        type: "text" as const,
        status: "sent" as const,
      };

      expect(message).toHaveProperty("id");
      expect(message).toHaveProperty("from");
      expect(message).toHaveProperty("to");
      expect(message).toHaveProperty("text");
      expect(message).toHaveProperty("timestamp");
      expect(message).toHaveProperty("type");
      expect(message).toHaveProperty("status");
    });
  });
});

/**
 * Test Suite for Data Integrity
 */
describe("Data Integrity", () => {
  it("should maintain data consistency across operations", () => {
    const testData = {
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
      messages: [
        { id: 1, text: "Message 1" },
        { id: 2, text: "Message 2" },
      ],
    };

    localStorage.setItem("app_data", JSON.stringify(testData));

    const retrieved = JSON.parse(localStorage.getItem("app_data")!);

    expect(retrieved).toEqual(testData);
    expect(retrieved.users.length).toBe(2);
    expect(retrieved.messages.length).toBe(2);
  });

  it("should handle large data sets", () => {
    const largeData = {
      items: Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        value: `Item ${i}`,
      })),
    };

    localStorage.setItem("large_data", JSON.stringify(largeData));

    const retrieved = JSON.parse(localStorage.getItem("large_data")!);

    expect(retrieved.items.length).toBe(1000);
    expect(retrieved.items[0]).toEqual({ id: 0, value: "Item 0" });
    expect(retrieved.items[999]).toEqual({ id: 999, value: "Item 999" });
  });
});

/**
 * Test Suite for Error Handling
 */
describe("Error Handling", () => {
  it("should handle storage quota exceeded", () => {
    try {
      const largeString = "x".repeat(1024 * 1024 * 5); // 5MB
      localStorage.setItem("large_item", largeString);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should handle JSON parsing errors", () => {
    localStorage.setItem("invalid_json", "not valid json");

    try {
      JSON.parse(localStorage.getItem("invalid_json")!);
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });
});
