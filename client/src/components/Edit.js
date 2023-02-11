import { useState } from "react";
import { useParams } from "react-router-dom";

import React, { useEffect } from "react";

const Edit = () => {
  const [basePricesOptions, setBasePrices] = useState([]);

  const [datas, setDatas] = useState({
    name: "",
    email: "",
    city: "",
    birthDate: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setDatas((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
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
      setDatas(data);
    }
  };

  const getBasePrices = async () => {
    const res = await fetch(`/get-base-prices`, {
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
      setBasePrices(data);
      console.log("get data", data);
    }
  };

  useEffect(() => {
    getBasePrices();
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, city, birthDate } = datas;
    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        city,
        birthDate,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
      // navigate("/");
    }
  };

  return (
    <div className="container">
      <form>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Full name
            </label>
            <input
              type="text"
              value={datas.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={datas.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="city"
              id="city"
              value={datas.city}
              onChange={setdata}
            ></select>
          </div> */}

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="city"
              id="city"
              value={datas.city}
              onChange={setdata}
            >
              {basePricesOptions.map((option) => (
                <option key={option.city} value={option.city}>
                  {option.city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="date" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={datas.birthDate}
              onChange={setdata}
              name="birthDate"
            />
          </div>
          <button
            type="submit"
            onClick={updateuser}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
