// API client for GRC Trackr backend
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("auth_token");
  }

  get isAuthenticated() {
    return !!this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          window.location.href = "/login";
          return;
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const data = await this.request("/auth/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async logout() {
    await this.request("/auth/auth/logout/", { method: "POST" });
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request("/auth/auth/me/");
  }

  // Companies
  async getCompanies() {
    return this.request("/companies/companies/");
  }

  async createCompany(data: any) {
    return this.request("/companies/companies/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Users
  async getUsers() {
    return this.request("/users/users/");
  }

  async inviteUser(data: any) {
    return this.request("/users/invitations/invite/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Frameworks
  async getFrameworks() {
    return this.request("/frameworks/frameworks/");
  }

  async getAppliedControls() {
    return this.request("/frameworks/applied-controls/");
  }

  async updateAppliedControl(id: string, data: any) {
    return this.request(`/frameworks/applied-controls/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Risk Management
  async getRiskAssessments() {
    return this.request("/risk/assessments/");
  }

  async createRiskAssessment(data: any) {
    return this.request("/risk/assessments/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Assets
  async getAssets() {
    return this.request("/assets/assets/");
  }

  async createAsset(data: any) {
    return this.request("/assets/assets/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Compliance
  async getEvidences() {
    return this.request("/compliance/evidences/");
  }

  async uploadEvidence(formData: FormData) {
    const headers: any = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/compliance/evidences/`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Audit Logs
  async getAuditLogs() {
    return this.request("/auth/audit-logs/");
  }

  // Dashboard Analytics
  async getDashboardData() {
    return this.request("/analytics/dashboard/");
  }

  // Organization
  async getDomains() {
    return this.request("/organization/domains/");
  }

  async createDomain(data: any) {
    return this.request("/organization/domains/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPerimeters() {
    return this.request("/organization/perimeters/");
  }

  // Operations
  async getTasks() {
    return this.request("/operations/tasks/");
  }

  async getIncidents() {
    return this.request("/operations/incidents/");
  }

  async getXRays() {
    return this.request("/operations/xrays/");
  }

  async getCalendarEvents() {
    return this.request("/operations/calendar/");
  }

  // Governance
  async getLibraries() {
    return this.request("/governance/libraries/");
  }

  async getPolicies() {
    return this.request("/governance/policies/");
  }

  async getIssues() {
    return this.request("/governance/issues/");
  }

  async getObjectives() {
    return this.request("/governance/objectives/");
  }

  async getRiskAcceptances() {
    return this.request("/governance/risk-acceptances/");
  }

  async getExceptions() {
    return this.request("/governance/exceptions/");
  }

  async getFindings() {
    return this.request("/governance/findings/");
  }

  // Risk
  async getVulnerabilities() {
    return this.request("/risk/vulnerabilities/");
  }

  async getRiskScenarios() {
    return this.request("/risk/scenarios/");
  }

  async getEbiosRMStudies() {
    return this.request("/risk/ebios-rm/");
  }

  // Compliance
  async getAudits() {
    return this.request("/compliance/audits/");
  }

  // Third Parties
  async getThirdPartyEntities() {
    return this.request("/third-parties/entities/");
  }

  async getRepresentatives() {
    return this.request("/third-parties/representatives/");
  }

  async getSolutions() {
    return this.request("/third-parties/solutions/");
  }

  async getEntityAssessments() {
    return this.request("/third-parties/assessments/");
  }

  // Privacy
  async getPurposes() {
    return this.request("/privacy/purposes/");
  }

  async getPersonalData() {
    return this.request("/privacy/personal-data/");
  }

  async getProcessings() {
    return this.request("/privacy/processings/");
  }

  // Labels and Terminologies
  async getLabels() {
    return this.request("/auth/labels/");
  }

  async getTerminologies() {
    return this.request("/auth/terminologies/");
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
