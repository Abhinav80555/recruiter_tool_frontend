import { useEffect, useState } from "react";
import "./App.css";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { AddUser } from "./components/AddUser";
import { getAllUser } from "./API/getAllUser";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiStatus,setApiStatus] =useState({status:"idle",msg:""})
  // --------------------------------
  const [finalData, setFinalData] = useState([]);

  const fetchData = getAllUser(page, limit, search, setFinalData, setTotalItems);

  useEffect(() => {
    fetchData();
  }, [limit, page, search]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
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

  const indexOfLastUser = (page + 1) * limit;
  const indexOfFirstUser = indexOfLastUser - limit;
  const currentUsers = finalData.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = (event) => {};

  // Pagination change handler
  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };


  useEffect(()=>{
    if(apiStatus.status){
    setIsDialogOpen(false)
    }
  },[apiStatus])
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-left">User Management</h1>
      <div className="flex justify-end item-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
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

      {isDialogOpen && <AddUser closeDialog={closeDialog} setApiStatus={setApiStatus}/>}

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
          {finalData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{user.slno}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4">{user.expected}</td>
              <td className="px-6 py-4">{user.score}</td>
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
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * limit + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page + 1 * limit, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {Array.from({ length: Math.ceil(totalItems / limit) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePagination(index)}
                  className={`${
                    page === index
                      ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;

