export default function StudentForm({
  formTitle,
  editMode,
  studentData,
  setStudentData,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="form-section">
      <h2 id="formTitle">{formTitle}</h2>

      <form onSubmit={onSubmit}>
        <input type="hidden" value={studentData.id} />

        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              required
              value={studentData.firstName}
              onChange={(e) =>
                setStudentData({ ...studentData, firstName: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              required
              value={studentData.lastName}
              onChange={(e) =>
                setStudentData({ ...studentData, lastName: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              required
              value={studentData.email}
              onChange={(e) =>
                setStudentData({ ...studentData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              min="1"
              max="100"
              value={studentData.age}
              onChange={(e) =>
                setStudentData({ ...studentData, age: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={studentData.course}
            onChange={(e) =>
              setStudentData({ ...studentData, course: e.target.value })
            }
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className={`btn ${editMode ? "btn-success" : "btn-primary"}`}>
            {editMode ? "Update Student" : "Add Student"}
          </button>

          {editMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
