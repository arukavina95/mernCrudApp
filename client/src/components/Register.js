import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [basePricesOptions, setBasePrices] = useState([]);
  console.log(basePricesOptions);

  const [discount, setDiscount] = useState([]);
  console.log(discount);

  const navigate = useNavigate();
  const [datas, setDatas] = useState({
    name: "",
    email: "",
    city: "",
    birthDate: "",
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setDatas((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, city, birthDate } = datas;

    const res = await fetch("/register", {
      method: "POST",
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

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      console.log("data added");
      navigate("/");
    }
  };
  //json base pricess
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
  }, []);

  //json discount
  const getDiscount = async () => {
    const res = await fetch(`/get-discount`, {
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
      setDiscount(data);
      console.log("get data", data);
    }
  };

  useEffect(() => {
    getDiscount();
  }, []);

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
              onChange={setData}
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
              onChange={setData}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="city"
              id="city"
              value={datas.city}
              onChange={setData}
            >
              <option></option>
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
              value={datas.birthDate}
              onChange={setData}
              name="birthDate"
              className="form-control"
              id="date"
            />
          </div>

          <button
            type="submit"
            onClick={addinpdata}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
