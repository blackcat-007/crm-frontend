"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { apiRoutes } from "@/utils/apiRoutes";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    customers: 0,
    leads: 0,
    revenue: 0,
  });
  const [leadStatusData, setLeadStatusData] = useState([]);
  const [monthlyCustomerData, setMonthlyCustomerData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch customers
        const customersRes = await fetch(apiRoutes.customers, { headers });
        const customersData = await customersRes.json();

        // Fetch leads
        const leadsRes = await fetch(apiRoutes.leads, { headers });
        const leadsData = await leadsRes.json();

        // Calculate stats
        const totalRevenue = leadsData.reduce((sum, lead) => sum + (lead.value || 0), 0);
        setStats({
          customers: customersData.total || customersData.length || 0,
          leads: leadsData.length || 0,
          revenue: totalRevenue,
        });

        // Build data for charts
        buildLeadStatusData(leadsData);
        buildMonthlyCustomerData(customersData.customers || customersData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const buildLeadStatusData = (leads) => {
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    const formatted = Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));

    setLeadStatusData(formatted);
  };

  const buildMonthlyCustomerData = (customers) => {
    const monthMap = {};
    customers.forEach((cust) => {
      const month = new Date(cust.createdAt).toLocaleString("default", { month: "short" });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    const formatted = Object.keys(monthMap).map((m) => ({
      month: m,
      customers: monthMap[m],
    }));

    setMonthlyCustomerData(formatted);
  };

  const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444", "#8b5cf6"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Total Customers</h2>
          <p className="text-3xl font-bold mt-2 text-blue-600">{stats.customers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Total Leads</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.leads}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2 text-yellow-600">
            ₹{stats.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Growth */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Customer Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyCustomerData}>
              <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status Distribution */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Lead Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Revenue by Lead Value</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={leadStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

