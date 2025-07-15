
import { Input } from "@/components/ui/input";
import { IndianRupee, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getBalance } from "@/Services/accountService";
import { searchUsers } from "@/Services/userService";
import { toast } from "sonner";
import { transferMoney } from "@/Services/accountService";

export default function Dashboard() {
  const userData = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [amount, setAmount] = useState<{ [key: string]: string }>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState<any>(null);
  const [dialogAmount, setDialogAmount] = useState("");
  const [dialogPassword, setDialogPassword] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);

  useEffect(() => {
    getBalance().then(setBalance);
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      setLoadingUsers(true);
      searchUsers(search)
        .then((res) => setUsers(res.filter((u) => u?._id !== userData.user?._id)))
        .finally(() => setLoadingUsers(false));
    } else {
      setUsers([]);
    }
  }, [search, userData.user]);

  const handlePay = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    setDialogUser(user);
    setDialogAmount(amount[userId] || "");
    setDialogPassword("");
    setDialogOpen(true);
  };

  const handleDialogConfirm = async () => {
    if (!dialogUser || !dialogAmount || !dialogPassword) return;
    setDialogLoading(true);
    try {
  
      await transferMoney({ amount: Number(dialogAmount), to: dialogUser._id, password: dialogPassword });
      toast.success(`₹${dialogAmount} sent to ${dialogUser.firstName} ${dialogUser.lastName}`);
      setAmount((a) => ({ ...a, [dialogUser._id]: "" }));

      // Fetch balance again after successful transaction
      const updatedBalance = await getBalance();
      setBalance(updatedBalance);
      setDialogOpen(false);
    } catch (e: any) {
      if(e.status === 401) return toast.error("Wrong Password !");
      toast.error(e?.message || "Transaction failed");
    } finally {
      setDialogLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2 sm:p-4 flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold">
          <span role="img" aria-label="wave">👋</span>
          {userData.user?.firstName}
        </div>
        <Button variant="ghost" size="icon" onClick={userData.logoutUser} title="Logout">
          <LogOut className="size-5" />
        </Button>
      </div>

      {/* Balance */}
      <div className="flex flex-col sm:flex-row justify-between items-center border rounded-xl px-4 sm:px-6 py-4 bg-muted mb-6 shadow-sm gap-3 sm:gap-0">
        <div className="text-base sm:text-lg font-medium flex justify-between items-center gap-2 w-full">
          Balance:
          <div className="flex justify-end items-baseline">
            <IndianRupee className="size-5" />
            <span className="tracking-widest items-center text-xl sm:text-2xl select-none cursor-pointer" onClick={() => setShowBalance((v) => !v)}>
              {showBalance ? (balance !== null ? balance : "...") : "****"}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Pay */}
      <div className="flex-1 flex flex-col">
        <div className="bg-muted border-2 rounded-2xl p-2 sm:p-4 flex-1 flex flex-col gap-2 overflow-y-auto shadow-inner min-h-0 max-h-[calc(100vh-320px)]">
          <Input
            placeholder="Search user by first or last name..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          {loadingUsers ? (
            <div className="text-center py-4 text-muted-foreground">Searching...</div>
          ) : users.length === 0 && search.trim() ? (
            <div className="text-center py-4 text-muted-foreground">No users found.</div>
          ) : (
            users.filter(Boolean).map((u) => (
              <div key={u._id} className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-background rounded-lg px-2 sm:px-3 py-2 mb-1 shadow-sm">
                {/* User info */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{u.firstName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{u.firstName} {u.lastName}</div>
                    <div className="text-xs text-muted-foreground break-all">{u.email}</div>
                  </div>
                </div>
                {/* On mobile: stack input+button below user info; on sm+: keep in row */}
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Input
                    type="text"
                    min={1}
                    placeholder="Amount"
                    value={amount[u._id] || ""}
                    onChange={e => setAmount(a => ({ ...a, [u._id]: e.target.value }))}
                    className="w-full sm:w-24"
                  />
                  <Button
                    size="sm"
                    className="w-full sm:w-auto"
                    disabled={!amount[u._id] || Number(amount[u._id]) <= 0}
                    onClick={() => handlePay(u._id)}
                  >
                    Pay
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {dialogOpen && dialogUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col gap-4">
            <div className="text-lg font-semibold text-center">Confirm Transfer</div>
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{dialogUser.firstName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="font-medium">{dialogUser.firstName} {dialogUser.lastName}</div>
              <div className="text-xs text-muted-foreground">{dialogUser.email}</div>
              <div className="text-xl font-bold mt-2">₹{dialogAmount}</div>
            </div>
            <Input
              type="password"
              placeholder="Enter your password to confirm"
              value={dialogPassword}
              onChange={e => setDialogPassword(e.target.value)}
              className="mt-2"
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)} disabled={dialogLoading}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleDialogConfirm} disabled={dialogLoading || !dialogPassword}>
                {dialogLoading ? "Transferring..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}