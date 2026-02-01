"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  MessageSquare,
    Users,
    Layers,
    BarChart3,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
export default function Sidebar() {
  const pathname = usePathname();
      const [isCollapsed, setIsCollapsed] = useState(false);
  const links = [
   
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Leads", href: "/dashboard/leads", icon: Layers },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            CRM Nexus
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>{name}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Profile Section */}
      <div
        className={`p-4 border-t dark:border-gray-700 ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "flex-col" : ""
          }`}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                John Doe
              </p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
