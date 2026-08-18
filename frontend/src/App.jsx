import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')

  const [editingId, setEditingId] = useState(null)

  // GET - Load students from backend
  useEffect(() => {
    axios
      .get('/api/students')
      .then((response) => {
        setStudents(response.data)
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
  }, [])

  // CREATE - Add student
  const addStudent = () => {
    const newStudent = {
      name: name,
      email: email,
      course: course,
    }

    axios
      .post('/api/students', newStudent)
      .then((response) => {
        setStudents([...students, response.data])

        setName('')
        setEmail('')
        setCourse('')
      })
      .catch((error) => {
        console.error('Error adding student:', error)
      })
  }

  // DELETE - Delete student
  const deleteStudent = (id) => {
    axios
      .delete(`/api/students/${id}`)
      .then(() => {
        setStudents(
          students.filter((student) => student.id !== id)
        )
      })
      .catch((error) => {
        console.error('Error deleting student:', error)
      })
  }

  // EDIT - Load student data into form
  const editStudent = (student) => {
    setEditingId(student.id)
    setName(student.name)
    setEmail(student.email)
    setCourse(student.course)
  }

  // UPDATE - Update student
  const updateStudent = () => {
    const updatedStudent = {
      name: name,
      email: email,
      course: course,
    }

    axios
      .put(`/api/students/${editingId}`, updatedStudent)
      .then((response) => {
        setStudents(
          students.map((student) =>
            student.id === editingId
              ? response.data
              : student
          )
        )

        setName('')
        setEmail('')
        setCourse('')
        setEditingId(null)
      })
      .catch((error) => {
        console.error('Error updating student:', error)
      })
  }

  return (
    <div>
      <h1>Student Management System</h1>

      <label>Student Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter student name"
      />

      <br />
      <br />

      <label>Student Email</label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter student email"
      />

      <br />
      <br />

      <label>Course</label>
      <input
        type="text"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
        placeholder="Enter course"
      />

      <br />
      <br />

      {editingId === null ? (
        <button onClick={addStudent}>
          Add Student
        </button>
      ) : (
        <button onClick={updateStudent}>
          Update Student
        </button>
      )}

      <h2>Students</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>

              <td>
                <button onClick={() => editStudent(student)}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
