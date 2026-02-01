"use client";

import { useEffect, useState } from "react";
import { apiRoutes } from "@/utils/apiRoutes";

export default function LeadDetails({ params }) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${apiRoutes.leads}/lead/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setLead(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!lead) return <p>Lead not found</p>;

  return (
    <div className="bg-blue-950 text-white p-6 rounded shadow-lg">
      <h1 className="text-3xl font-bold">{lead.title}</h1>
      <p className="mt-4">{lead.description}</p>
      <p className="mt-2 text-lg">Status: {lead.status}</p>
      <p className="mt-1 text-lg">Value: ${lead.value}</p>

      <a
        href="/dashboard/leads"
        className="mt-5 inline-block bg-gray-800 px-4 py-2 rounded"
      >
        Back
      </a>
    </div>
  );
}
