import axios, { AxiosError } from "axios";
import config from "../config/config";

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
  data: AnimeStatusData[];
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

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

const updateAnimeStatus = async (data: AnimeStatusUpdateData) => {
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
    const updateResponse = await updateAnimeStatus(updateData);
    console.log("Update successful:", updateResponse);
    return updateResponse;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      console.log("No existing record found, attempting to insert...");
      try {
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
      } catch (insertError) {
        console.error("Insert error:", insertError);
        if (insertError instanceof AxiosError) {
          throw new Error(
            insertError.response?.data?.message ||
              "Failed to insert anime status"
          );
        }
        throw new Error("Network error during insert");
      }
    } else if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to update anime status"
      );
    } else {
      throw new Error("Network error during update");
    }
  }
};

export type {
  AuthResponse,
  AnimeStatusData,
  AnimeStatusUpdateData,
  AnimeStatusResponse,
};
export { userSignup, userLogin, saveAnimeStatus, updateAnimeStatus };
