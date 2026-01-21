import { useEffect, useState } from "react";
import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/StudentService";

export default function App() {
  const [students, setStudents] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const [studentData, setStudentData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success/error

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      showMessage("Error loading students", "error");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const resetForm = () => {
    setStudentData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      course: "",
    });
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentPayload = {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      age: studentData.age ? parseInt(studentData.age) : null,
      course: studentData.course,
    };

    try {
      if (editMode) {
        const res = await updateStudent(studentData.id, studentPayload);
        if (res.ok) {
          showMessage("Student updated successfully!", "success");
        } else {
          showMessage("Failed to update student", "error");
        }
      } else {
        const res = await createStudent(studentPayload);
        if (res.ok) {
          showMessage("Student added successfully!", "success");
        } else {
          showMessage("Failed to add student", "error");
        }
      }

      resetForm();
      loadStudents();
    } catch (err) {
      showMessage("Server error: " + err.message, "error");
    }
  };

  const handleEdit = async (id) => {
    try {
      const student = await getStudentById(id);

      setStudentData({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        age: student.age || "",
        course: student.course || "",
      });

      setEditMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      showMessage("Error loading student", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteStudent(id);
      if (res.ok) {
        showMessage("Student deleted successfully!", "success");
        loadStudents();
      } else {
        showMessage("Failed to delete student", "error");
      }
    } catch (err) {
      showMessage("Error deleting student", "error");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎓 Student Management System</h1>
        <p>Manage your student records efficiently</p>
      </div>

      <div className="content">
        {message && (
          <div className={`message ${messageType}`} style={{ display: "block" }}>
            {message}
          </div>
        )}

        <StudentForm
          formTitle={editMode ? "Update Student" : "Add New Student"}
          editMode={editMode}
          studentData={studentData}
          setStudentData={setStudentData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
