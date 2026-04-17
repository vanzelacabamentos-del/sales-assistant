/**
 * Facebook Leads API Service
 * Integração com Facebook para sincronizar leads gerados por formulários
 */

export interface FacebookLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdAt: string;
  source: "facebook";
}

class FacebookLeadsService {
  private accessToken: string = "";
  private pageId: string = "";

  /**
   * Inicializa o serviço com credenciais do Facebook
   */
  initialize(accessToken: string, pageId: string) {
    this.accessToken = accessToken;
    this.pageId = pageId;
    localStorage.setItem("facebook_access_token", accessToken);
    localStorage.setItem("facebook_page_id", pageId);
  }

  /**
   * Recupera leads do Facebook
   */
  async getLeads(): Promise<FacebookLead[]> {
    if (!this.accessToken || !this.pageId) {
      console.warn("Facebook não está configurado");
      return [];
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.pageId}/leadgen_forms`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar leads do Facebook");
      }

      const data = await response.json();
      return this.transformLeads(data.data || []);
    } catch (error) {
      console.error("Erro ao buscar leads do Facebook:", error);
      return [];
    }
  }

  /**
   * Transforma dados do Facebook em formato padrão
   */
  private transformLeads(facebookLeads: any[]): FacebookLead[] {
    return facebookLeads.map((lead: any) => ({
      id: lead.id,
      name: lead.field_data?.find((f: any) => f.name === "full_name")?.value || "",
      email: lead.field_data?.find((f: any) => f.name === "email")?.value || "",
      phone: lead.field_data?.find((f: any) => f.name === "phone_number")?.value || "",
      company: lead.field_data?.find((f: any) => f.name === "company")?.value || "",
      message: lead.field_data?.find((f: any) => f.name === "message")?.value || "",
      createdAt: lead.created_time || new Date().toISOString(),
      source: "facebook",
    }));
  }

  /**
   * Sincroniza leads do Facebook para localStorage
   */
  async syncLeads(): Promise<FacebookLead[]> {
    const leads = await this.getLeads();
    if (leads.length > 0) {
      const existingLeads = JSON.parse(
        localStorage.getItem("facebook_leads") || "[]"
      );
      const mergedLeads = [...existingLeads, ...leads];
      localStorage.setItem("facebook_leads", JSON.stringify(mergedLeads));
    }
    return leads;
  }

  /**
   * Obtém leads sincronizados do localStorage
   */
  getSyncedLeads(): FacebookLead[] {
    const leads = localStorage.getItem("facebook_leads");
    return leads ? JSON.parse(leads) : [];
  }

  /**
   * Limpa leads do Facebook
   */
  clearLeads() {
    localStorage.removeItem("facebook_leads");
  }

  /**
   * Desconecta do Facebook
   */
  disconnect() {
    this.accessToken = "";
    this.pageId = "";
    localStorage.removeItem("facebook_access_token");
    localStorage.removeItem("facebook_page_id");
    localStorage.removeItem("facebook_leads");
  }
}

export const facebookLeadsService = new FacebookLeadsService();
