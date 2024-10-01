import apiClient from "./api-client";
import { Entity } from "../hooks/utils";

class HttpService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  get<T>(id: number) {
    return apiClient.get<T>(`${this.endpoint}/${id}`);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: Partial<T>) {
    return apiClient.patch<T>(`${this.endpoint}/${entity.id}`, entity);
  }
  delete(id: number) {
    return apiClient.delete(`${this.endpoint}/${id}`);
  }
  
}

const create = (endpoint:string) => new HttpService(endpoint);
export default create; 