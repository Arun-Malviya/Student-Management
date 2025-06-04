let students = [], teachers = [], courses = [];
let editing = { type: null, index: null };

function clearInputs(ids) {
  ids.forEach(id => document.getElementById(id).value = "");
}

function createRow(data, type) {
  let row = `<tr>`;
  for (let key in data) {
    if (key !== 'index') {
      row += `<td>${data[key]}</td>`;
    }
  }
  row += `
    <td class="actions">
      <button class="edit" onclick="editEntry('${type}', ${data.index})">Edit</button>
      <button class="delete" onclick="deleteEntry('${type}', ${data.index})">Delete</button>
    </td>
  </tr>`;
  return row;
}

// STUDENT FUNCTIONS
function addStudent() {
  const name = document.getElementById("studentName").value;
  const email = document.getElementById("studentEmail").value;
  const age = document.getElementById("studentAge").value;
  const sClass = document.getElementById("studentClass").value;
  const address = document.getElementById("studentAddress").value;

  if (!name || !email || !age || !sClass || !address) return alert("Fill all fields");

  if (editing.type === 'student') {
    students[editing.index] = { name, email, age, class: sClass, address, index: editing.index };
    editing = { type: null, index: null };
  } else {
    students.push({ name, email, age, class: sClass, address, index: students.length });
  }

  clearInputs(["studentName", "studentEmail", "studentAge", "studentClass", "studentAddress"]);
  renderTable("student");
}

// TEACHER FUNCTIONS
function addTeacher() {
  const name = document.getElementById("teacherName").value;
  const id = document.getElementById("teacherId").value;
  const subject = document.getElementById("teacherSubject").value;
  const address = document.getElementById("teacherAddress").value;

  if (!name || !id || !subject || !address) return alert("Fill all fields");

  if (editing.type === 'teacher') {
    teachers[editing.index] = { name, id, subject, address, index: editing.index };
    editing = { type: null, index: null };
  } else {
    teachers.push({ name, id, subject, address, index: teachers.length });
  }

  clearInputs(["teacherName", "teacherId", "teacherSubject", "teacherAddress"]);
  renderTable("teacher");
}

// COURSE FUNCTIONS
function addCourse() {
  const name = document.getElementById("courseName").value;
  const id = document.getElementById("courseId").value;
  const credits = document.getElementById("courseCredits").value;

  if (!name || !id || !credits) return alert("Fill all fields");

  if (editing.type === 'course') {
    courses[editing.index] = { name, id, credits, index: editing.index };
    editing = { type: null, index: null };
  } else {
    courses.push({ name, id, credits, index: courses.length });
  }

  clearInputs(["courseName", "courseId", "courseCredits"]);
  renderTable("course");
}

// GENERAL FUNCTIONS
function editEntry(type, index) {
  editing = { type, index };
  const entry = { student: students, teacher: teachers, course: courses }[type][index];

  if (type === "student") {
    document.getElementById("studentName").value = entry.name;
    document.getElementById("studentEmail").value = entry.email;
    document.getElementById("studentAge").value = entry.age;
    document.getElementById("studentClass").value = entry.class;
    document.getElementById("studentAddress").value = entry.address;
  } else if (type === "teacher") {
    document.getElementById("teacherName").value = entry.name;
    document.getElementById("teacherId").value = entry.id;
    document.getElementById("teacherSubject").value = entry.subject;
    document.getElementById("teacherAddress").value = entry.address;
  } else if (type === "course") {
    document.getElementById("courseName").value = entry.name;
    document.getElementById("courseId").value = entry.id;
    document.getElementById("courseCredits").value = entry.credits;
  }
}

function deleteEntry(type, index) {
  if (type === 'student') {
    students.splice(index, 1);
  } else if (type === 'teacher') {
    teachers.splice(index, 1);
  } else if (type === 'course') {
    courses.splice(index, 1);
  }

  renderTable(type);
}

function renderTable(type) {
  let table;
  let data;
  if (type === "student") {
    table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    data = students;
  } else if (type === "teacher") {
    table = document.getElementById("teacherTable").getElementsByTagName("tbody")[0];
    data = teachers;
  } else if (type === "course") {
    table = document.getElementById("courseTable").getElementsByTagName("tbody")[0];
    data = courses;
  }

  // Clear existing table rows
  table.innerHTML = '';

  data.forEach(item => {
    table.innerHTML += createRow(item, type);
  });
}