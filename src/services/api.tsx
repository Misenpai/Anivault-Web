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

export type { AuthResponse };
export { userSignup, userLogin };
