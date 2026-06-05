export default function LeadTable({leads,onDelete}){
    return <table className='w-full'>
        <thead><tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th></th>
        </tr></thead>
        <tbody>
            {leads.map(l => (
                <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td>{l.company}</td>
                    <td>{l.status}</td>
                    <td>
                        <button onClick={() => onDelete(l._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>}