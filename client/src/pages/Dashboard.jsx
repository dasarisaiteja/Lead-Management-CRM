import { useEffect, useState } from "react";
import api from "../services/api";
import LeadForm from "../components/LeadForm";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const load = async () => {
    const res = await api.get("/");
    setLeads(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addLead = async (data) => {
    await api.post("/", data);
    load();
  };

  const deleteLead = async (id) => {
    await api.delete(`/${id}`);
    load();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/${id}`, { status });
    load();
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || lead.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const convertedLeads = leads.filter(
    (l) => l.status === "Converted"
  ).length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lead Management CRM</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={cardStyle}>Total: {totalLeads}</div>
        <div style={cardStyle}>New: {newLeads}</div>
        <div style={cardStyle}>Converted: {convertedLeads}</div>
        <div style={cardStyle}>Lost: {lostLeads}</div>
      </div>

      <LeadForm onAdd={addLead} />

      <div style={{ margin: "20px 0" }}>
        <input
          placeholder="Search Name / Email / Company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={inputStyle}
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Converted</option>
          <option>Lost</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(
                      lead._id,
                      e.target.value
                    )
                  }
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Converted</option>
                  <option>Lost</option>
                </select>
              </td>

              <td>
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteLead(lead._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  textAlign: "center",
};

const inputStyle = {
  padding: "10px",
  marginRight: "10px",
};