import { apiRequest, methods } from "./apiRoot";

type FruitId = number | string;

interface FruitPayload {
  id: FruitId;
  [key: string]: unknown;
}

export const fruitAPI = {
  async addFruit<TResponse = unknown>(body: Record<string, unknown>): Promise<TResponse> {
    return apiRequest<TResponse>("/Fruits", methods.POST, body);
  },
  async updateFruit<TResponse = unknown>(body: FruitPayload): Promise<TResponse> {
    return apiRequest<TResponse>(`/Fruits/${body.id}`, methods.PUT, body);
  },
  async deleteFruit<TResponse = unknown>(id: FruitId): Promise<TResponse> {
    return apiRequest<TResponse>(`/Fruits/${id}`, methods.DELETE);
  },
  async getFruitList<TResponse = unknown>(): Promise<TResponse> {
    return apiRequest<TResponse>("/Fruits", methods.GET);
  },
  async getFruit<TResponse = unknown>(body: Pick<FruitPayload, "id">): Promise<TResponse> {
    return apiRequest<TResponse>(`/Fruits/${body.id}`, methods.GET);
  },
};

export default fruitAPI;
