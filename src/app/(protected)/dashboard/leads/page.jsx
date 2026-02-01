"use client";

import { useEffect, useState } from "react";
import { apiRoutes } from "@/utils/apiRoutes";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "New",
    value: "",
    customerId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${apiRoutes.leads}/all?page=${page}&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        setLeads(data.leads || []);
        setPages(data.pages || 1);
      } catch (err) {
        console.error(err);
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [page, refresh]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiRoutes.leads}/${formData.customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create lead");

      setFormData({
        title: "",
        description: "",
        status: "New",
        value: "",
        customerId: "",
      });

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      alert("Error creating lead");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiRoutes.leads}/lead/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        status: "New",
        value: "",
        customerId: "",
      });

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      alert("Error updating lead");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`${apiRoutes.leads}/lead/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      alert("Error deleting lead");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* CREATE NEW LEAD — ADMIN ONLY */}
      {role === "admin" && (
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 shadow-md rounded-lg p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            {editingId ? "Edit Lead" : "Create New Lead"}
          </h2>

          <form
            onSubmit={editingId ? () => handleUpdate(editingId) : handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {["title", "description", "value", "customerId"].map((field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.toUpperCase()}
                className="border rounded p-2"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ))}

            <select
              name="status"
              className="border rounded p-2"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      {/* LEADS TABLE */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg shadow-md p-5">
        {loading ? (
          <p>Loading...</p>
        ) : leads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-blue-900">
                  <th className="p-3">Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b hover:bg-indigo-900">
                    <td className="p-3">{lead.title}</td>
                    <td className="p-3">{lead.status}</td>
                    <td className="p-3">${lead.value}</td>

                    <td className="p-3 flex gap-2">
                      {role === "admin" && (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(lead._id);
                              setFormData(lead);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(lead._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}

                      <a
                        href={`/dashboard/leads/${lead._id}`}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-3 mt-5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-200">Page {page} of {pages}</span>
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => p + 1)}
                className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
