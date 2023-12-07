import "./application.css";
import "../PublicCSS/templatestyle.css";
import { header } from "../PublicComponents/header.jsx";
import { sidebar } from "../PublicComponents/user_sidebar.jsx";
import { form } from "./Form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export function UserApplicationView() {
    const { id } = useParams();
    const [application, setApplication] = useState({});

    useEffect(() => {
        const fetchListingInfo = async () => {
          try {
            const response = await Axios.get(
                `http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/applications/application/${id}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setApplication(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching listing information:", error);
            setApplication({denied: true});
          }
        };
    
        if (application) {
          fetchListingInfo();
        }
    }, []);

  return (
    <div>
      {header()}
      {sidebar()}
      <div className="content-box">
        <h1>
          <b>Your application</b>
        </h1>
        {form(application)}
      </div>
    </div>
  );
}
