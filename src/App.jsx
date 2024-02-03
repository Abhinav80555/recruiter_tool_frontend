import { useEffect, useState } from "react";
import "./App.css";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      status: "Contacted",
      expectedSalary: "600000",
      computedScore: "3",
      skills: "react,node,mongodb,angular,mysql,threejs,css,html,js",
      qualification: "b.e",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "9876543210",
      status: "Interview Scheduled",
      expectedSalary: "600000",
      computedScore: "5",
      skills: "react,node,mongodb",
      qualification: "master of bussiness administration",
    },
    {
      id: 3,
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "9876543210",
      status: "Offer Extended",
      expectedSalary: "600000",
      computedScore: "7",
      skills: "react,node,mongodb,angular,mysql,threejs,css,html,js",
      qualification: "b.e",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "9876543210",
      status: "Hired",
      expectedSalary: "600000",
      computedScore: "2",
      skills: "react,node,mongodb",
      qualification: "b.e",
    },
    {
      id: 5,
      name: "Abhinav",
      email: "bob@example.com",
      phone: "9876543210",
      status: "Rejected",
      expectedSalary: "600000",
      computedScore: "1",
      skills: "react,node,mongodb,angular,mysql,threejs,css,html,js",
      qualification: "bachelor of engineering",
    },
    // Add more sample data as needed
  ]);
  const [score, setScore] = useState(0);
  const calculatedScore = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("general");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    expectedSalary: "",
    computedScore: "",
    skills: "",
    qualification: "",
  });

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Simulate a delay to demonstrate animation
    const interval = setInterval(() => {
      if (score < calculatedScore) {
        setScore(score + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [score, calculatedScore]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // Pagination change handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, newUser]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      status: "",
      expectedSalary: "",
      computedScore: "",
      skills: "",
      qualification: "",
    });
    closeDialog();
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={openDialog}
      >
        Add User
      </button>
      {isDialogOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 text-left">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[75vw] pl-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Add new user
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    you can use compute calculator here
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-6 border-b border-gray-900/10 pb-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="candidate-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Candidate name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="canditate-name"
                          id="candidate-name"
                          autoComplete="off"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-3.5">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="off"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="user-description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Skills
                      </label>
                      <div className="mt-1">
                      <textarea
                        id="user-description"
                        name="user-description"
                        rows="4.5"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-3">
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Qualification
                      </label>
                      <div className="mt-1">
                        <input
                          id="qualification"
                          name="qualification"
                          type="text"
                          autoComplete="off"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-3">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Status
                        </label>
                        <div className="mt-1">
                          <select
                            id="status"
                            name="status"
                            autoComplete="off"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Contacted</option>
                            <option>Interview Scheduled</option>
                            <option>Offer Extented</option>
                            <option>Hired</option>
                            <option>Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        <span>Computed score calculator</span>
                        <span className="pl-2 text-sm font-semibold text-blue-600">(Enter experience in years*)</span>
                      </label>
                      <div className="mt-1 border rounded-lg py-4">
                        <div className="flex items-center justify-center gap-x-5">
                          <div>
                            <label
                              htmlFor="react"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ReactJS
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="react"
                                id="react"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="node"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Node.js
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="node"
                                id="node"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          
                          <div className="relative w-10 h-10 mx-auto mb-1">
                            {/* Circular border */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {/* Animated score */}
                              <div className="text-3xl font-bold text-blue-500">
                                {score}
                              </div>
                            </div>
                          </div>
                          <label
                            htmlFor="score"
                            className="block text-sm font-small leading-4 text-gray-600"
                          >
                            Calculated score
                          </label>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                  <div className="bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6 py-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto min-w-[5rem]"
                  >
                    Save </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeDialog}
                    >
                    Cancel
                  </button>
                </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 mr-2 border border-gray-300 rounded"
        />
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="general">Filter by General Details</option>
          <option value="skills">Filter by Skills and Qualification</option>
        </select>
      </div>
      <table className="w-full shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Active</th>
            <th className="px-6 py-3 text-left">Expected Salary</th>
            <th className="px-6 py-3 text-left">Computed Score</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4">{user.expectedSalary}</td>
              <td className="px-6 py-4">{user.computedScore}</td>
              <td className="px-6 py-4">
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 1px 4px rgba(0,0,0,0.1))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex list-none">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`${
                    currentPage === number + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } px-3 py-1 rounded`}
                >
                  {number + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
