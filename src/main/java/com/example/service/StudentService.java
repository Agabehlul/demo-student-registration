package com.example.service;

import com.example.entity.Student;
import com.example.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudentList() {
        return studentRepository.findAll();
    }

    public Student getStudentId(Integer id) {
        return studentRepository.getReferenceById(id);
    }

    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    public void updateStudent(Student student, Integer id) {
        var updatedStudent = studentRepository.getReferenceById(id);
        updatedStudent.setName(student.getName());
        updatedStudent.setSurname(student.getSurname());
        updatedStudent.setBirthdate(student.getBirthdate());
        updatedStudent.setCity(student.getCity());
        studentRepository.save(updatedStudent);
    }

    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }
}
