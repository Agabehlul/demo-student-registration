// script.js

// Tələbə əlavə etmək
document.getElementById('student-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const birthDate = document.getElementById('birthdate').value;
    const city = document.getElementById('city').value;
    const status = document.getElementById('status').value === 'true';

    const student = {
        name: name,
        surname: surname,
        birthDate: birthDate,
        city: city,
        status: status
    };

    // Tələbə əlavə etmək üçün backend-ə sorğu göndəririk
    axios.post('http://localhost:8080/students', student)
        .then(response => {
            fetchStudents();  // Tələbə siyahısını yeniləyirik
            document.getElementById('student-form').reset();  // Formu təmizləyirik
        })
        .catch(error => {
            console.error('Xəta:', error);
        });
});

// Tələbə siyahısını yükləmək
function fetchStudents() {
    axios.get('http://localhost:8080/students')
        .then(response => {
            const students = response.data;
            const studentList = document.getElementById('student-list');
            studentList.innerHTML = '';

            students.forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.surname}</td>
                    <td>${student.birthDate}</td>
                    <td>${student.city}</td>
                    <td>${student.status ? 'Aktiv' : 'Passiv'}</td>
                    <td>
                        <button onclick="editStudent(${student.id}, '${student.name}', '${student.surname}', '${student.birthDate}', '${student.city}', ${student.status})">Yenilə</button>
                        <button onclick="deleteStudent(${student.id})">Sil</button>
                    </td>
                `;
                studentList.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Xəta:", error);
        });
}

// Tələbəni yeniləmək
function editStudent(id, name, surname, birthDate, city, status) {
    document.getElementById('update-form').style.display = 'block';

    document.getElementById('update-name').value = name;
    document.getElementById('update-surname').value = surname;
    document.getElementById('update-birthdate').value = birthDate;
    document.getElementById('update-city').value = city;
    document.getElementById('update-status').value = status.toString();

    document.getElementById('update-student-form').onsubmit = function (e) {
        e.preventDefault();

        const updatedStudent = {
            name: document.getElementById('update-name').value,
            surname: document.getElementById('update-surname').value,
            birthDate: document.getElementById('update-birthdate').value,
            city: document.getElementById('update-city').value,
            status: document.getElementById('update-status').value === 'true'
        };

        axios.put(`http://localhost:8080/students/${id}`, updatedStudent)
            .then(response => {
                fetchStudents();
                document.getElementById('update-form').style.display = 'none';
            })
            .catch(error => {
                console.error("Xəta:", error);
            });
    };
}

// Tələbəni silmək
function deleteStudent(id) {
    axios.delete(`http://localhost:8080/students/${id}`)
        .then(response => {
            fetchStudents();
        })
        .catch(error => {
            console.error("Xəta:", error);
        });
}

// Sayt ilk açıldığında tələbələri yükləyirik
window.onload = function () {
    fetchStudents();
};
