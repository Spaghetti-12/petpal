import "./listingbox.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

export function ListingBox(listing) {
    const navigate = useNavigate();
    const [shelterInfo, setShelterInfo] = useState(null);

    var applytext = "Apply";
    if (listing.disable) {
        applytext = "Already Applied";
    }

    const redirectToShelterView = (event) => {
        if (event.target.tagName.toLowerCase() !== 'button') {
            navigate(`/listing/${listing.id}`);
        }
    };

    useEffect(() => {
        const fetchShelterInfo = async () => {
          try {
            const response = await Axios.get(
                `http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/accounts/shelter/shelter/${listing.shelter_profile}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setShelterInfo(response.data);
          } catch (error) {
            console.error("Error fetching shelter information:", error);
          }
        };
    
        if (listing.shelter_profile) {
          fetchShelterInfo();
        }
    }, [listing.shelter_profile]);
    
    function apply() {
        navigate(`/user/application/${listing.id}`);
    }

    return (
        <a onClick={redirectToShelterView}>
        <div className="listingbox">
            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <h1 style={{margin:0, flex: 1}}>{listing.name}</h1>
                <button style={{margin:0}} disabled={listing.disable}
                onClick={apply}
                >{applytext}</button>
            </div>
            <h2>Posted by: {shelterInfo ? shelterInfo.name : "Unknown Shelter"}</h2>
            <p>Breed: {listing.breed}</p>
            <p>Age: {listing.age}</p>
            <p>Gender: {listing.gender}</p>
            <p>Size: {listing.size}</p>
            <p><b>Description:</b> {listing.description}</p>
            <p>Status: {listing.status}</p>
            <p>Location: {listing.location}</p>
            <p>Publication Date: {listing.publication_date}</p>
        </div>
        </a>
  );
}