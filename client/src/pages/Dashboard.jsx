import { useEffect, useState } from "react";
import api from "../services/api";
import LeadForm from "../components/LeadForm";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const loadLeads = async () => {
    try {
      const res = await api.get("/");
      setLeads(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const addLead = async (data) => {
    try {
      await api.post("/", {
        ...data,
        status: "New",
      });

      loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLead = async (id) => {
    try {
      await api.delete(`/${id}`);
      loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/${id}`, { status });
      loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filterStatus === "All" ||
      lead.status === filterStatus;

    return searchMatch && statusMatch;
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return (
    <div className="container">
      <h1 className="title">
        Lead Management CRM
      </h1>

      <div className="stats">
        <div className="card">
          <h3>{totalLeads}</h3>
          <p>Total Leads</p>
        </div>

        <div className="card">
          <h3>{newLeads}</h3>
          <p>New Leads</p>
        </div>

        <div className="card">
          <h3>{convertedLeads}</h3>
          <p>Converted Leads</p>
        </div>

        <div className="card">
          <h3>{lostLeads}</h3>
          <p>Lost Leads</p>
        </div>
      </div>

      <LeadForm onAdd={addLead} />

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Name, Email or Company"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">
            Contacted
          </option>
          <option value="Qualified">
            Qualified
          </option>
          <option value="Converted">
            Converted
          </option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.company}</td>

                  <td>
                    <select
                      className="status-select"
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(
                          lead._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="New">
                        New
                      </option>
                      <option value="Contacted">
                        Contacted
                      </option>
                      <option value="Qualified">
                        Qualified
                      </option>
                      <option value="Converted">
                        Converted
                      </option>
                      <option value="Lost">
                        Lost
                      </option>
                    </select>
                  </td>

                  <td>
                    {lead.createdAt
                      ? new Date(
                          lead.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteLead(lead._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Leads Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}