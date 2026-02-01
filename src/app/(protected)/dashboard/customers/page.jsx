"use client";

import { useEffect, useState } from "react";
import { apiRoutes } from "@/utils/apiRoutes";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
 const [role, setRole] = useState(null);

  useEffect(() => {
  const storedRole = localStorage.getItem("role");
   const parsedRole = storedRole ? JSON.parse(storedRole) : null;
  console.log("ROLE FROM STORAGE:", storedRole, typeof storedRole);
  setRole(parsedRole);
}, []);


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${apiRoutes.customers}?page=${page}&limit=5&search=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setCustomers(data.customers || []);
        setPages(data.pages || 1);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, search, refresh]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiRoutes.customers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create customer");
      setFormData({ name: "", email: "", phone: "", company: "" });
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      alert("Error creating customer");
    }
  };

  const handleUpdate = async (id) => {
  try {
    const token = localStorage.getItem("token");
const payload = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
};

    const res = await fetch(`${apiRoutes.customers}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json(); // 👈 IMPORTANT

    if (!res.ok) {
      console.error("Backend error:", data);
      throw new Error(data.message || "Failed to update customer");
    }

    setEditingId(null);
    setFormData({ name: "", email: "", phone: "", company: "" });
    setRefresh(!refresh);

  } catch (err) {
    console.error("Frontend error:", err);
    alert(err.message);
  }
};

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiRoutes.customers}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
      alert("Error deleting customer");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {/* 🔍 Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded p-2 w-full sm:w-1/3"
        />
      </div>

      {/* 🧩 Create / Edit Form - Visible only for Admin */}
      {role === "admin" && (
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 shadow-md rounded-lg p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            {editingId ? "Edit Customer" : "Create New Customer"}
          </h2>
          <form
           onSubmit={(e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdate(editingId);
    } else {
      handleCreate(e);
    }
  }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {["name", "email", "phone", "company"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            >
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      {/* 📋 Customer List */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Customer List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left text-blue-950">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust._id} className="border-b hover:bg-indigo-950">
                    <td className="p-3">{cust.name}</td>
                    <td className="p-3">{cust.email}</td>
                    <td className="p-3">{cust.phone}</td>
                    <td className="p-3">{cust.company}</td>
                    <td className="p-3 flex gap-2">
                      {role === "admin" && (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(cust._id);
                              setFormData(cust);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(cust._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <a
                        href={`/dashboard/customers/${cust._id}`}
                        className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 🔢 Pagination */}
            <div className="flex justify-center items-center gap-3 mt-5">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-200">
                Page {page} of {pages}
              </span>
              <button
                onClick={() => setPage((p) => (p < pages ? p + 1 : p))}
                disabled={page === pages}
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
