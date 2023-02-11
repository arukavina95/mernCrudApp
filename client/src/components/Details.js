import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useParams, NavLink, useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const [getuserdata, setUserdata] = useState([]);

  const [showDiscount, setShowDiscount] = useState(false);

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
      setUserdata(data);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  //DELETE
  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted successfully");
      getdata();
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getuserdata.id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button className="btn btn-danger" onClick={() => deleteuser(id)}>
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="left_view col-lg-6 col-md-6 col-12">
            <h3 className="mt-3">
              Full name: <span>{getuserdata.name}</span>
            </h3>
            <h3 className="mt-3">
              <EmailIcon />
              Email: <span>{getuserdata.email}</span>
            </h3>
            <h3>
              <LocationCityIcon />
              City: <span>{getuserdata.city}</span>
            </h3>
            <h3>
              Birth date:<span>{getuserdata.birthDate}</span>
            </h3>
            <h3>Insurance price:</h3>
            {showDiscount && (
              <div>
                <h2 id="result">{getuserdata.insurancePrice}</h2>
              </div>
            )}
            <button
              id="btn"
              className="btn btn-primary mx-2"
              onClick={() => setShowDiscount(!showDiscount)}
            >
              Calculate insurance price
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
