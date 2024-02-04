import { useEffect, useState } from "react";

export function AddUser({ closeDialog }) {
  const calculatedScore = 0;
  const [score, setScore] = useState(0);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Contacted",
    expectedSalary: "",
    reactExperience: "",
    nodeExperience: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (score < calculatedScore) {
        setScore(score + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [score, calculatedScore]);

  useEffect(() => {
    const reactScore = calculateScore(newUser.reactExperience);
    const nodeScore = calculateScore(newUser.nodeExperience);
    const totalScore = reactScore + nodeScore;
    setScore(totalScore);
  }, [newUser]);

  const calculateScore = (experience) => {
    console.log("Experience:", experience); // Log the experience value
    if (experience === "") {
      return 0;
    } else if (experience < 1) {
      return 1;
    } else if (experience >= 1 && experience <= 2) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission/validation here
    console.log(newUser);
  };

  return (
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
                      name="name"
                      id="candidate-name"
                      autoComplete="off"
                      required
                      value={newUser.name}
                      onChange={handleInputChange}
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
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="off"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={newUser.phone}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onChange={handleInputChange}
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
                      name="skills"
                      rows="4.5"
                      value={newUser.skills}
                      onChange={handleInputChange}
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
                      required
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {/* Add validation for Expected Salary, React, and Node */}
                  <div className="mt-3">
                    <label
                      htmlFor="expected"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Expected Salary
                    </label>
                    <div className="mt-1">
                      <input
                        id="expected"
                        name="expectedSalary"
                        type="text"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        min="0"
                        step="any"
                        autoComplete="off"
                        value={newUser.expectedSalary}
                        onChange={handleInputChange}
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
                          value={newUser.status}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Contacted</option>
                          <option>Interview Scheduled</option>
                          <option>Offer Extended</option>
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
                    <span className="pl-2 text-sm font-semibold text-blue-600">
                      (Enter experience in years*)
                    </span>
                  </label>
                  <div className="mt-1 border rounded-lg py-4">
                    <div className="flex items-center justify-center gap-x-5">
                      <div>
                        <label
                          htmlFor="reactExperience"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ReactJS
                        </label>
                        <div className="mt-1">
                          <select
                            name="reactExperience"
                            id="reactExperience"
                            value={newUser.reactExperience}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option value="">Select experience</option>
                            <option value="0">Less than 1 year</option>
                            <option value="1">1-2 years</option>
                            <option value="3">Over 2 years</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="nodeExperience"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Node.js
                        </label>
                        <div className="mt-1">
                          <select
                            name="nodeExperience"
                            id="nodeExperience"
                            value={newUser.nodeExperience}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option value="">Select experience</option>
                            <option value="0">Less than 1 year</option>
                            <option value="1">1-2 years</option>
                            <option value="3">Over 2 years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="relative w-10 h-10 mx-auto mb-1">
                        <div className="absolute inset-0 flex items-center justify-center">
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
                  Save{" "}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    closeDialog();
                    console.log("lslakslka");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
