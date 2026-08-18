package com.devsecops.backend.integration;

import com.devsecops.backend.entity.Student;
import com.devsecops.backend.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentServiceIntegrationTest {

    @Autowired
    private StudentService studentService;

    @Test
    void createStudent_shouldSaveStudent() {
        Student student = new Student();
        student.setName("Pushkar");
        student.setEmail("pushkar@test.com");
        student.setCourse("DevOps");

        Student savedStudent = studentService.createStudent(student);

        assertNotNull(savedStudent.getId());
        assertEquals("Pushkar", savedStudent.getName());
        assertEquals("pushkar@test.com", savedStudent.getEmail());
        assertEquals("DevOps", savedStudent.getCourse());
    }

    @Test
    void getAllStudents_shouldReturnStudents() {
        Student student = new Student();
        student.setName("Test Student");
        student.setEmail("test@test.com");
        student.setCourse("Java");

        studentService.createStudent(student);

        List<Student> students = studentService.getAllStudents();

        assertFalse(students.isEmpty());
    }

    @Test
    void getStudentById_shouldReturnStudent() {
        Student student = new Student();
        student.setName("Find Student");
        student.setEmail("find@test.com");
        student.setCourse("Spring Boot");

        Student savedStudent = studentService.createStudent(student);

        Optional<Student> result =
                studentService.getStudentById(savedStudent.getId());

        assertTrue(result.isPresent());
        assertEquals("Find Student", result.get().getName());
    }

    @Test
    void updateStudent_shouldUpdateExistingStudent() {
        Student student = new Student();
        student.setName("Old Name");
        student.setEmail("old@test.com");
        student.setCourse("Java");

        Student savedStudent = studentService.createStudent(student);

        Student updatedData = new Student();
        updatedData.setName("New Name");
        updatedData.setEmail("new@test.com");
        updatedData.setCourse("DevOps");

        Student updatedStudent =
                studentService.updateStudent(savedStudent.getId(), updatedData);

        assertEquals("New Name", updatedStudent.getName());
        assertEquals("new@test.com", updatedStudent.getEmail());
        assertEquals("DevOps", updatedStudent.getCourse());
    }

    @Test
    void updateStudent_shouldThrowExceptionWhenStudentDoesNotExist() {
        Student updatedData = new Student();
        updatedData.setName("Unknown");
        updatedData.setEmail("unknown@test.com");
        updatedData.setCourse("Unknown");

        assertThrows(
                RuntimeException.class,
                () -> studentService.updateStudent(999999L, updatedData)
        );
    }

    @Test
    void deleteStudent_shouldDeleteStudent() {
        Student student = new Student();
        student.setName("Delete Student");
        student.setEmail("delete@test.com");
        student.setCourse("Testing");

        Student savedStudent = studentService.createStudent(student);

        Long id = savedStudent.getId();

        studentService.deleteStudent(id);

        Optional<Student> result = studentService.getStudentById(id);

        assertTrue(result.isEmpty());
    }
}
