import axios, { AxiosError } from "axios";
import config from "../config/config";
import configjikan from "../config/configjikan";

interface AuthResponse {
  token: string;
  result: {
    payload: {
      id: number;
      name: string;
      email: string;
    };
  };
}

interface AnimeStatusData {
  user_id: number;
  mal_id: number;
  anime_name: string;
  total_watched_episodes: number;
  total_episodes: number;
  status: string;
}

interface AnimeStatusUpdateData {
  user_id: number;
  mal_id: number;
  total_watched_episodes: number;
  status: string;
}

interface AnimeStatusResponse {
  animes: AnimeStatusData[];
}

interface AnimeDetails {
  mal_id: number;
  images: { jpg: { image_url: string } };
  type: string;
  season: string;
  year: number;
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const jikanApi = axios.create({
  baseURL: configjikan.API_URL,
});

const getAnimeDetails = async (mal_id: number): Promise<AnimeDetails> => {
  try {
    const response = await jikanApi.get(`/anime/${mal_id}/full`);
    return response.data.data;
  } catch {
    throw new Error("Failed to fetch anime details");
  }
};

const userLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "user/login",
      new URLSearchParams({
        email,
        password,
      })
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Network error");
  }
};

const userSignup = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "user/signup",
      new URLSearchParams({
        name,
        email,
        password,
      })
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
    throw new Error("Network error");
  }
};

const readAnimeStatus = async (
  userId: number,
  status: string
): Promise<AnimeStatusData[]> => {
  try {
    const response = await api.get<AnimeStatusResponse>(
      `user/anime/status/${userId}/${status}`
    );
    return response.data.animes;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || `Failed to fetch ${status} anime`
      );
    }
    throw new Error("Network error");
  }
};

const updateAnimeStatus = async (data: AnimeStatusUpdateData) => {
  try {
    const response = await api.put<{ message: string }>(
      "user/anime/status",
      new URLSearchParams({
        user_id: data.user_id.toString(),
        mal_id: data.mal_id.toString(),
        total_watched_episodes: data.total_watched_episodes.toString(),
        status: data.status,
      })
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to update anime status"
      );
    }
    throw new Error("Network error");
  }
};

const removeAnimeStatus = async (userId: number, malId: number) => {
  try {
    const response = await api.delete<{ message: string }>(
      `user/anime/status/${userId}/${malId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to delete anime status"
      );
    }
    throw new Error("Network error");
  }
};

const saveAnimeStatus = async (data: AnimeStatusData) => {
  try {
    const updateData: AnimeStatusUpdateData = {
      user_id: data.user_id,
      mal_id: data.mal_id,
      total_watched_episodes: data.total_watched_episodes,
      status: data.status,
    };
    console.log("Attempting to update anime status:", updateData);

    try {
      // First try to update
      const updateResponse = await updateAnimeStatus(updateData);
      console.log("Update successful:", updateResponse);
      return updateResponse;
    } catch (updateError) {
      console.log("Update failed:", updateError);

      // If the anime doesn't exist (404) or any other error occurs during update,
      // attempt to insert it as a new record
      console.log("Attempting to insert as new record...");
      const insertResponse = await api.post<{ message: string }>(
        "user/anime/status",
        new URLSearchParams({
          user_id: data.user_id.toString(),
          mal_id: data.mal_id.toString(),
          anime_name: data.anime_name,
          total_watched_episodes: data.total_watched_episodes.toString(),
          total_episodes: data.total_episodes.toString(),
          status: data.status,
        })
      );
      console.log("Insert successful:", insertResponse.data);
      return insertResponse.data;
    }
  } catch (error) {
    console.error("Error saving anime status:", error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to save anime status"
      );
    }
    throw new Error("Network error during save operation");
  }
};

export type {
  AuthResponse,
  AnimeStatusData,
  AnimeStatusUpdateData,
  AnimeStatusResponse,
  AnimeDetails,
};
export {
  userSignup,
  userLogin,
  saveAnimeStatus,
  updateAnimeStatus,
  readAnimeStatus,
  removeAnimeStatus,
  getAnimeDetails,
};
