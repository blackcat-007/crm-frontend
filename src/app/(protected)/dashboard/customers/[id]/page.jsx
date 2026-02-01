"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRoutes } from "@/utils/apiRoutes";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiRoutes.customers}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Customer not found.</p>;

  const { customer, leads } = data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Details</h1>

      <div className="bg-gradient-to-br from-blue-900 to-blue-950  shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-200">{customer.name}</h2>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Company:</strong> {customer.company}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-blue-950  shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Associated Leads</h2>
        {leads.length === 0 ? (
          <p>No leads found for this customer.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-left text-blue-950">
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Value</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-indigo-950">
                  <td className="p-3">{lead.title}</td>
                  <td className="p-3">{lead.status}</td>
                  <td className="p-3">₹{lead.value}</td>
                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
