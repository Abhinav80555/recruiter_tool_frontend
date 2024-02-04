import { useState } from "react";
import "./App.css";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { AddUser } from "./components/AddUser";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    console.log("kasas");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    console.log("lkslaklsl");
    setIsDialogOpen(false);
  };

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

  // Pagination change handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-left">User Management</h1>
      <div className="flex justify-end item-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-2 py-0 mr-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openDialog}
        >
          Add User
        </button>
      </div>

      {isDialogOpen && <AddUser closeDialog={closeDialog} />}

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
        <tbody className="bg-white max-h-[50vh] overflow-y-auto overflow-x-hidden">
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
      {/* <div className="mt-4 px-5">
        <ul className="flex justify-end item-center list-none">
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
      </div> */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6">
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
        <span className="font-medium">{Math.min(indexOfLastUser, users.length)}</span> of{' '}
        <span className="font-medium">{users.length}</span> results
      </p>
    </div>
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
          <a
            key={number}
            href="#"
            onClick={() => paginate(number + 1)}
            className={`${
              currentPage === number + 1
                ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
          >
            {number + 1}
          </a>
        ))}
      </nav>
    </div>
  </div>
</div>

    </div>
  );
}

export default App;