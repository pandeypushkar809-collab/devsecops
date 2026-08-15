import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [students, setStudents] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)

  // CREATE
  const addStudent = () => {
    const newStudent = {
      name: name,
      email: email,
      course: course,
    }

    setStudents([...students, newStudent])

    setName('')
    setEmail('')
    setCourse('')
  }

  // DELETE
  const deleteStudent = (indexToDelete) => {
    const updatedStudents = students.filter(
      (_, index) => index !== indexToDelete
    )

    setStudents(updatedStudents)
  }

  // EDIT
  const editStudent = (index) => {
    const student = students[index]

    setName(student.name)
    setEmail(student.email)
    setCourse(student.course)

    setEditingIndex(index)
  }

  // UPDATE
  const updateStudent = () => {
    const updatedStudents = students.map((student, index) => {
      if (index === editingIndex) {
        return {
          name: name,
          email: email,
          course: course,
        }
      }

      return student
    })

    setStudents(updatedStudents)

    setName('')
    setEmail('')
    setCourse('')
    setEditingIndex(null)
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

      <p>Name: {name}</p>

      <label>Student Email</label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter student email"
      />

      <p>Email: {email}</p>

      <label>Course</label>
      <input
        type="text"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
        placeholder="Enter course"
      />

      <p>Course: {course}</p>

      {editingIndex === null ? (
        <button type="button" onClick={addStudent}>
          Add Student
        </button>
      ) : (
        <button type="button" onClick={updateStudent}>
          Update Student
        </button>
      )}

      <h2>Students</h2>

      <table>
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
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>

              <td>
                <button
                  type="button"
                  onClick={() => editStudent(index)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteStudent(index)}
                >
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