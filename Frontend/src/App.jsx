import { useEffect, useState } from "react";

function App() {
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Employee states
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
  });

  // Load employees from API
const loadEmployees = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/Employee`
    );

    const data = await response.json();

    console.log("Employees:", data);

    return data;
  } catch (error) {
    console.error("Employee fetch error:", error);
    return [];
  }
};

  // Load employees when component starts
 useEffect(() => {
  loadEmployees().then((data) => {
    setEmployees(data);
  });
}, []);

  // Add employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (
  !employeeForm.name.trim() ||
  !employeeForm.email.trim() ||
  !employeeForm.department.trim() ||
  !employeeForm.designation.trim() ||
  !employeeForm.salary
) {
  alert("All employee fields are required.");
  return;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(employeeForm.email)) {
  alert("Please enter a valid email address.");
  return;
}

if (Number(employeeForm.salary) <= 0) {
  alert("Salary must be greater than 0.");
  return;
}

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/Employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: employeeForm.name,
            email: employeeForm.email,
            department: employeeForm.department,
            designation: employeeForm.designation,
            salary: Number(employeeForm.salary),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      const data = await response.json();

    console.log("Created employee:", data);

const updatedEmployees = await loadEmployees();
setEmployees(updatedEmployees);

      // Clear form
      setEmployeeForm({
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
      });

      // Hide form
      setShowEmployeeForm(false);
    } catch (error) {
      console.error("Create employee error:", error);
    }
  };


  const handleDeleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/Employee/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    console.log("Employee deleted:", id);

    const updatedEmployees = await loadEmployees();
    setEmployees(updatedEmployees);
  } catch (error) {
    console.error("Delete employee error:", error);
  }
};

const handleEditEmployee = (employee) => {
  setEditingEmployeeId(employee.id);

  setEmployeeForm({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    designation: employee.designation,
    salary: employee.salary,
  });

  setShowEmployeeForm(true);
};


const handleUpdateEmployee = async (e) => {
  e.preventDefault();

if (
  !employeeForm.name.trim() ||
  !employeeForm.email.trim() ||
  !employeeForm.department.trim() ||
  !employeeForm.designation.trim() ||
  !employeeForm.salary
) {
  alert("All employee fields are required.");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(employeeForm.email)) {
  alert("Please enter a valid email address.");
  return;
}

if (Number(employeeForm.salary) <= 0) {
  alert("Salary must be greater than 0.");
  return;
}

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/Employee/${editingEmployeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: employeeForm.name,
          email: employeeForm.email,
          department: employeeForm.department,
          designation: employeeForm.designation,
          salary: Number(employeeForm.salary),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update employee");
    }

    const data = await response.json();

    console.log("Updated employee:", data);

    const updatedEmployees = await loadEmployees();
    setEmployees(updatedEmployees);

    // Clear form
    setEmployeeForm({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
    });

    // Reset edit mode
    setEditingEmployeeId(null);

    // Hide form
    setShowEmployeeForm(false);
  } catch (error) {
    console.error("Update employee error:", error);
  }
};



  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and Password are required.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/Auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Mini Employee Management System</h1>

      {/* LOGIN */}
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <hr />

      {/* EMPLOYEES */}
      <h2>Employees</h2>

      <button
        type="button"
        onClick={() => setShowEmployeeForm(true)}
      >
        Add Employee
      </button>

      {/* ADD EMPLOYEE FORM */}
      {showEmployeeForm && (
        <div>
          <h3>Add Employee</h3>

          <form
  onSubmit={
    editingEmployeeId === null
      ? handleAddEmployee
      : handleUpdateEmployee
  }
>
            <div>
              <label>Name</label>
              <br />

              <input
                type="text"
                placeholder="Enter name"
                value={employeeForm.name}
                onChange={(e) =>
                  setEmployeeForm({
                    ...employeeForm,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Email</label>
              <br />

              <input
                type="email"
                placeholder="Enter email"
                value={employeeForm.email}
                onChange={(e) =>
                  setEmployeeForm({
                    ...employeeForm,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Department</label>
              <br />

              <input
                type="text"
                placeholder="Enter department"
                value={employeeForm.department}
                onChange={(e) =>
                  setEmployeeForm({
                    ...employeeForm,
                    department: e.target.value,
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Designation</label>
              <br />

              <input
                type="text"
                placeholder="Enter designation"
                value={employeeForm.designation}
                onChange={(e) =>
                  setEmployeeForm({
                    ...employeeForm,
                    designation: e.target.value,
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Salary</label>
              <br />

              <input
                type="number"
                placeholder="Enter salary"
                value={employeeForm.salary}
                onChange={(e) =>
                  setEmployeeForm({
                    ...employeeForm,
                    salary: e.target.value,
                  })
                }
              />
            </div>

            <br />

            <button type="submit">
  {editingEmployeeId === null
    ? "Save Employee"
    : "Update Employee"}
</button>

            {" "}

            <button
  type="button"
  onClick={() => {
    setShowEmployeeForm(false);
    setEditingEmployeeId(null);

    setEmployeeForm({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
    });
  }}
>
  Cancel
</button>
          </form>
        </div>
      )}

      <br />
      <br />

      {/* EMPLOYEE TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>

             <td>
  <button
    type="button"
    onClick={() => handleEditEmployee(employee)}
  >
    Edit
  </button>

  {" "}

  <button
    type="button"
    onClick={() => handleDeleteEmployee(employee.id)}
  >
    Delete
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;