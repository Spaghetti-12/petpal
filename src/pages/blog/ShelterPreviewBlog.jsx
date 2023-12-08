import "../PublicCSS/templatestyle.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { header } from "../PublicComponents/header.jsx";
import { sidebar } from "../PublicComponents/shelter_sidebar.jsx";
import { baseURL } from "../../urlConfig.js";

export function ShelterPreviewBlog() {
    const storedData = JSON.parse(localStorage.getItem("blog"));

    const renderInputs = () => {
        return storedData.map((input, index) => {
            if (input.type === "text") {
            return (
                <p key={index}>
                {input.value}
                </p>
            );
            } else if (input.type === "file") {
            return (
                <div key={index}>
                <img src={input.value} alt={`File ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }} />
                </div>
            );
            }
            return null; // Handle other types if needed
        });
    };

    return (
    <div>
        {header()}
        {sidebar()}
        <div className="content-box">
            {renderInputs()}
        </div>
    </div>
    );
}