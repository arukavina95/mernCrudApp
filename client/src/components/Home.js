import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { NavLink } from "react-router-dom";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            + Add user
          </NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Fullname</th>
              <th scope="col">E-mail</th>
              <th scope="col">City</th>
              <th scope="col">Birth date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element) => {
              return (
                <>
                  <tr>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.city}</td>
                    <td>{element.birthDate}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
