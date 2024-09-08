import React, { useEffect, useRef } from "react";
import IconAdd from "../assets/IconAdd";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [Var, setVar] = useState("show");
  const notify = () => toast("added password !");
  const notifyDelete = () => toast("Deleted password !");
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (Var == "show") {
      setVar("hide");
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      setVar("show");
    }
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.password.length > 3 &&
      form.username.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      notify();
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

  const deletePassword = (id) => {
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );

    notifyDelete();
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-blue-500 text-2xl">&lt;</span>
          <span className="">Password-Manager</span>
          <span className="text-blue-500">/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website Url"
            className="rounded-full border border-green-700 w-50 p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-center gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-700 w-50 p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-700 w-50 p-4 py-1"
                type="password"
                name="password"
                ref={passwordRef}
              />
              <span
                className="absolute right-0 top-1 mr-1 cursor-pointer"
                onClick={showPassword}
              >
                {Var}
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center bg-blue-500 items-center rounded-full px-2 py-2 w-fit hover:text-blue-300 gap-1 "
          >
            Save <IconAdd />{" "}
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-center">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}

          <div className="flex justify-center">
            {passwordArray.length && (
              <table className="table-auto w-10/12 rounded-md overflow-hidden">
                <thead className=" bg-blue-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-50">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="flex items-center justify-center py-2 text-center w-32">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                        </td>
                        <td className="py-2 text-center w-32">
                          {item.username}
                        </td>
                        <td className="py-2 text-center w-32">
                          {item.password}
                        </td>
                        <td className="py-2 text-center w-32">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="py-2 text-center w-32">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Manager;
