import { apiRequest } from "./api";

export type HealthResponse = {
  success: boolean;
  message: string;
};

export async function getBackendHealth() {
  return apiRequest<HealthResponse>("/api/health");
}