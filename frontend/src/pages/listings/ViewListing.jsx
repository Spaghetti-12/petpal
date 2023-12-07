import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { header } from "../PublicComponents/header.jsx";
import { sidebar } from "../PublicComponents/user_sidebar.jsx";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {ListingBox} from "./subcomponents/listingbox";

export function ViewListing() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(
      `http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/listings/listing/` + id.toString() + "/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    ).catch((error) => console.log(error));
    console.log(response);
    if (!response) {
      console.log("unauthorized");
      navigate("/listing_not_found");
    } else {
      setListing(response.data);
    }
  };

  return (
    <div className={"outerbox"}>
      {header()}
      {sidebar()}
      <div className="content-box">
        {ListingBox(listing)}
      </div>
    </div>
  );
}