// WhatsApp Business Cloud API Service
// Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api

export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  type: "text" | "image" | "document" | "audio" | "video";
  status: "sent" | "delivered" | "read" | "failed";
}

export interface WhatsAppContact {
  id: string;
  name: string;
  phoneNumber: string;
  profilePicture?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  language: string;
  body: string;
}

class WhatsAppService {
  private accessToken: string = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || "";
  private phoneNumberId: string = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || "";
  private businessAccountId: string = import.meta.env.VITE_WHATSAPP_BUSINESS_ACCOUNT_ID || "";
  private baseUrl = "https://graph.instagram.com/v18.0";

  constructor() {
    if (!this.accessToken) {
      console.warn("WhatsApp access token not configured");
    }
  }

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Send a text message via WhatsApp
   */
  async sendMessage(
    recipientPhoneNumber: string,
    messageText: string
  ): Promise<{ messageId: string }> {
    try {
      const data = await this.makeRequest(
        `/${this.phoneNumberId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientPhoneNumber,
            type: "text",
            text: {
              body: messageText,
            },
          }),
        }
      );

      return {
        messageId: data.messages[0].id,
      };
    } catch (error) {
      console.error("Failed to send WhatsApp message:", error);
      throw error;
    }
  }

  /**
   * Send a template message
   */
  async sendTemplateMessage(
    recipientPhoneNumber: string,
    templateName: string,
    templateLanguage: string = "pt_BR",
    parameters?: string[]
  ): Promise<{ messageId: string }> {
    try {
      const body: any = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: templateLanguage,
          },
        },
      };

      if (parameters && parameters.length > 0) {
        body.template.components = [
          {
            type: "body",
            parameters: parameters.map((param) => ({
              type: "text",
              text: param,
            })),
          },
        ];
      }

      const data = await this.makeRequest(
        `/${this.phoneNumberId}/messages`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      return {
        messageId: data.messages[0].id,
      };
    } catch (error) {
      console.error("Failed to send template message:", error);
      throw error;
    }
  }

  /**
   * Get message status
   */
  async getMessageStatus(messageId: string): Promise<WhatsAppMessage["status"]> {
    try {
      const data = await this.makeRequest(`/${messageId}`);
      return data.status;
    } catch (error) {
      console.error("Failed to get message status:", error);
      throw error;
    }
  }

  /**
   * Get conversation messages
   */
  async getConversationMessages(
    conversationId: string,
    limit: number = 20
  ): Promise<WhatsAppMessage[]> {
    try {
      const data = await this.makeRequest(
        `/${conversationId}/messages?limit=${limit}`
      );

      return (data.data || []).map((msg: any) => ({
        id: msg.id,
        from: msg.from,
        to: msg.to,
        text: msg.text?.body || "",
        timestamp: msg.timestamp,
        type: msg.type,
        status: msg.status,
      }));
    } catch (error) {
      console.error("Failed to get conversation messages:", error);
      return [];
    }
  }

  /**
   * Get contacts list
   */
  async getContacts(): Promise<WhatsAppContact[]> {
    try {
      const data = await this.makeRequest(
        `/${this.businessAccountId}/contacts`
      );

      return (data.data || []).map((contact: any) => ({
        id: contact.id,
        name: contact.name,
        phoneNumber: contact.phone_number,
        profilePicture: contact.profile_picture_url,
      }));
    } catch (error) {
      console.error("Failed to get contacts:", error);
      return [];
    }
  }

  /**
   * Get approved templates
   */
  async getTemplates(): Promise<WhatsAppTemplate[]> {
    try {
      const data = await this.makeRequest(
        `/${this.businessAccountId}/message_templates`
      );

      return (data.data || []).map((template: any) => ({
        id: template.id,
        name: template.name,
        status: template.status,
        language: template.language,
        body: template.components?.find((c: any) => c.type === "body")
          ?.text || "",
      }));
    } catch (error) {
      console.error("Failed to get templates:", error);
      return [];
    }
  }

  /**
   * Mark message as read
   */
  async markMessageAsRead(messageId: string): Promise<void> {
    try {
      await this.makeRequest(`/${this.phoneNumberId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        }),
      });
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  }

  /**
   * Validate phone number
   */
  async validatePhoneNumber(phoneNumber: string): Promise<boolean> {
    try {
      const data = await this.makeRequest(
        `/${this.phoneNumberId}/phone_number_check`,
        {
          method: "POST",
          body: JSON.stringify({
            phone_number: phoneNumber,
          }),
        }
      );

      return data.valid_number === true;
    } catch (error) {
      console.error("Failed to validate phone number:", error);
      return false;
    }
  }

  /**
   * Upload media file
   */
  async uploadMedia(
    file: File,
    mediaType: "image" | "document" | "audio" | "video"
  ): Promise<{ mediaId: string; url: string }> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", mediaType);
      formData.append("messaging_product", "whatsapp");

      const response = await fetch(
        `${this.baseUrl}/${this.phoneNumberId}/media`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload media");
      }

      const data = await response.json();
      return {
        mediaId: data.id,
        url: data.url,
      };
    } catch (error) {
      console.error("Failed to upload media:", error);
      throw error;
    }
  }

  /**
   * Send media message
   */
  async sendMediaMessage(
    recipientPhoneNumber: string,
    mediaId: string,
    mediaType: "image" | "document" | "audio" | "video",
    caption?: string
  ): Promise<{ messageId: string }> {
    try {
      const body: any = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: mediaType,
        [mediaType]: {
          id: mediaId,
        },
      };

      if (caption && mediaType === "image") {
        body[mediaType].caption = caption;
      }

      const data = await this.makeRequest(
        `/${this.phoneNumberId}/messages`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      return {
        messageId: data.messages[0].id,
      };
    } catch (error) {
      console.error("Failed to send media message:", error);
      throw error;
    }
  }
}

export const whatsappService = new WhatsAppService();
