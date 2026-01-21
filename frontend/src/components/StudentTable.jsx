export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="table-section">
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-state">
                <p>No students found. Add your first student above!</p>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.age || "-"}</td>
                <td>{student.course || "-"}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => onEdit(student.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
