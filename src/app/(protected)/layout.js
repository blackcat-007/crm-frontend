import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function ProtectedLayout({ children }) {
  

 
  return (
     <ProtectedRoute>
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
       
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
