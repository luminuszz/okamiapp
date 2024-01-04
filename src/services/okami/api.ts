import { OKAMI_API_URL } from "@env";
import { storageService } from "@services/localstorage";
import axios, { type AxiosResponse } from "axios";
import { UserSchema, fetchAllWorksUnreadQuerySchema, loginSchema, workSchema, type LoginInput, type UpdateWorkInput } from "./types";

const okamiHttpGateway = axios.create({
  baseURL: OKAMI_API_URL,
});

okamiHttpGateway.interceptors.request.use(async (config) => {
  const token = await storageService.get<string>("token");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const fetchAllWorks = async ({ filter }: { filter: "read" | "unread" }) => {
  const { data } = await okamiHttpGateway.get(`/work/fetch-for-workers-${filter}`);

  return fetchAllWorksUnreadQuerySchema.parse(data);
};

const markWorkRead = async ({ chapter, id }: { chapter: number; id: string }) => {
  await okamiHttpGateway.patch(`/work/${id}/update-chapter`, {
    chapter,
  });
};

const markWorkFinished = async (id: string) => {
  await okamiHttpGateway.patch(`/work/mark-finished/${id}`);
};

const getOneWork = async (id: string) => {
  const { data } = await okamiHttpGateway.get(`/work/find/${id}`);

  return workSchema.parse(data);
};

const updateWork = async ({ id, data }: { id: string; data: UpdateWorkInput }) => {
  await okamiHttpGateway.put(`/work/update-work`, {
    id,
    data,
  });
};

const refreshWorks = async () => {
  await okamiHttpGateway.get(`/work/refresh-chapters`);
};

export const login = async (payload: LoginInput): Promise<{ token: string }> => {
  const { data } = await okamiHttpGateway.post<LoginInput, AxiosResponse<{ token: string }>>("/auth/login", loginSchema.parse(payload));

  return {
    token: data.token,
  };
};

export const getCurrentUser = async () => {
  const { data } = await okamiHttpGateway.get("/auth/user/me");

  return UserSchema.parse(data);
};

export const okamiService = {
  fetchAllWorks,
  markWorkRead,
  markWorkFinished,
  getOneWork,
  updateWork,
  refreshWorks,
  login,
  getCurrentUser,
};
