
import type { User } from "@/hooks/useUser";
import api from "./axiosInterceptor";

export async function signupUser(
  { firstName, lastName, email, password }:
  { firstName: string; lastName: string, email: string; password: string }
): Promise<User> {
  const res: any = await api.post(`/user/signup`, { firstName, lastName, email, password });
  const user: User = res.data.data.user;
  console.log(`user response after signup ${user}`);
  return user;
}

export async function signinUser(
  { email, password }: { email: string; password: string }
): Promise<User> {
  const res: any = await api.post(`/user/signin`, { email, password });
  const user: User = res.data.data.user;
  console.log(`user response after signin ${user}`);
  return user;
}

export async function logout() {
  try {
    await api.post(`/user/logout`);
  } catch (error) {
    // Continue with logout even if backend call fails
  }
}

export async function getCurrentUser(): Promise<User> {
  const res: any = await api.get(`/user/me`);
  console.log(`user response after getCurrentUser ${JSON.stringify(res.data.data)}`);
  return res.data.data as User;
}

export async function searchUsers(filter: string): Promise<User[]> {
  const res: any = await api.get(`/user/bulk?filter=${encodeURIComponent(filter)}`);
  return res.data.data.user as User[];
}