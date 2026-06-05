import { useState } from "react";

export default function LeadForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAdd(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      notes: "",
    });
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({
              ...form,
              company: e.target.value,
            })
          }
        />
      </div>

      <br />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

      <br />

      <button
        className="btn btn-primary"
        type="submit"
      >
        Add Lead
      </button>
    </form>
  );
}