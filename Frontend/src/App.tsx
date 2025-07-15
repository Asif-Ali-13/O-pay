import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup.tsx";
import SignIn from "./pages/Signin.tsx";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { Toaster } from "@/components/ui/sonner"
import NotFound from "./pages/NotFound.tsx";
import { useUser } from "@/hooks/useUser";
import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser();
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<Router>
			<main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[100vh]">
				<Navbar />
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/signin" element={<SignIn/>}/>
						<Route path="/signup" element={<SignUp/>}/>
						<Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
						<Route path="*" element={<NotFound/>}/>
					</Routes>
					<Toaster />
				<Footer />
			</main>
		</Router>
	</ThemeProvider>
  )
}

export default App;