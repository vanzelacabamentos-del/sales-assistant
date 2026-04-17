/**
 * Instagram Leads API Service
 * Integração com Instagram para sincronizar leads gerados por formulários
 */

export interface InstagramLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdAt: string;
  source: "instagram";
}

class InstagramLeadsService {
  private accessToken: string = "";
  private businessAccountId: string = "";

  /**
   * Inicializa o serviço com credenciais do Instagram
   */
  initialize(accessToken: string, businessAccountId: string) {
    this.accessToken = accessToken;
    this.businessAccountId = businessAccountId;
    localStorage.setItem("instagram_access_token", accessToken);
    localStorage.setItem("instagram_business_account_id", businessAccountId);
  }

  /**
   * Recupera leads do Instagram
   */
  async getLeads(): Promise<InstagramLead[]> {
    if (!this.accessToken || !this.businessAccountId) {
      console.warn("Instagram não está configurado");
      return [];
    }

    try {
      const response = await fetch(
        `https://graph.instagram.com/v18.0/${this.businessAccountId}/leadgen_forms`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar leads do Instagram");
      }

      const data = await response.json();
      return this.transformLeads(data.data || []);
    } catch (error) {
      console.error("Erro ao buscar leads do Instagram:", error);
      return [];
    }
  }

  /**
   * Transforma dados do Instagram em formato padrão
   */
  private transformLeads(instagramLeads: any[]): InstagramLead[] {
    return instagramLeads.map((lead: any) => ({
      id: lead.id,
      name: lead.field_data?.find((f: any) => f.name === "full_name")?.value || "",
      email: lead.field_data?.find((f: any) => f.name === "email")?.value || "",
      phone: lead.field_data?.find((f: any) => f.name === "phone_number")?.value || "",
      company: lead.field_data?.find((f: any) => f.name === "company")?.value || "",
      message: lead.field_data?.find((f: any) => f.name === "message")?.value || "",
      createdAt: lead.created_time || new Date().toISOString(),
      source: "instagram",
    }));
  }

  /**
   * Sincroniza leads do Instagram para localStorage
   */
  async syncLeads(): Promise<InstagramLead[]> {
    const leads = await this.getLeads();
    if (leads.length > 0) {
      const existingLeads = JSON.parse(
        localStorage.getItem("instagram_leads") || "[]"
      );
      const mergedLeads = [...existingLeads, ...leads];
      localStorage.setItem("instagram_leads", JSON.stringify(mergedLeads));
    }
    return leads;
  }

  /**
   * Obtém leads sincronizados do localStorage
   */
  getSyncedLeads(): InstagramLead[] {
    const leads = localStorage.getItem("instagram_leads");
    return leads ? JSON.parse(leads) : [];
  }

  /**
   * Limpa leads do Instagram
   */
  clearLeads() {
    localStorage.removeItem("instagram_leads");
  }

  /**
   * Desconecta do Instagram
   */
  disconnect() {
    this.accessToken = "";
    this.businessAccountId = "";
    localStorage.removeItem("instagram_access_token");
    localStorage.removeItem("instagram_business_account_id");
    localStorage.removeItem("instagram_leads");
  }
}

export const instagramLeadsService = new InstagramLeadsService();
