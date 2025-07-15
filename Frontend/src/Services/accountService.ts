import api from "./axiosInterceptor";


export async function getBalance(): Promise<number> {
  const res = await api.get<{ data: number }>("/account/balance");
  return res.data.data; 
}


export async function transferMoney(
  { amount, to, password }: { amount: number; to: string; password: string; }
): Promise<{ status: number; message: string }> {

  const res = await api.post<{ message: string }>("/account/transfer", { amount, to, password });
  return { status: res.status, message: res.data.message || "Money Transfer Successfully!" };
} 