import {useEffect, useState} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function NotifBox(notif){

    console.log(notif.status);

    const [status, setStatus] = useState(notif.status);
    const navigate = useNavigate();

    useEffect(() => {
        getNotif();
    })

    const getNotif = async() => {
        const token = localStorage.getItem("token");
        const response = await Axios.get(
          "http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/notifications/notification/" + notif.pk.toString() + "/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        ).then((response) => {
            console.log(response);
            if (!response) {
              console.log("unauthorized");
              navigate("/login");
            } else {
              if (status !== response.data.status) {
                setStatus(response.data.status);
              }
            }
        })
            .catch((error) => console.log(error));
    }

    console.log(status);

    const clickRead = async() =>{
        if (status === 1) {
            const token = localStorage.getItem("token");
            const response = await Axios.put(
                "http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/notifications/update/" + (notif.pk).toString() + "/",
                {status: 2},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            ).then((response) => {
                console.log(response);
                if (!response) {
                    console.log("unauthorized");
                    navigate("/login");
                } else {
                    setStatus(2);
                }
            })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div onClick={clickRead} className={(status === 2) ? "notif-box-read" : "notif-box"}>
            <p>{notif.content}</p>
        </div>
    )
}