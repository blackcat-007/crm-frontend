// app/(protected)/dashboard/page.jsx
import { redirect } from "next/navigation";

export default function DashboardRedirect() {
  redirect("/dashboard/reports");
}
