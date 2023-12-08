import "../PublicCSS/templatestyle.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { header } from "../PublicComponents/header.jsx";
import { sidebar } from "../PublicComponents/shelter_sidebar.jsx";
import { baseURL } from "../../urlConfig.js";

export function ShelterCreateBlog() {
    const [numFields, setNumFields] = useState(0);
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if "blog" is defined in localStorage
      const storedBlog = localStorage.getItem("blog");
      if (storedBlog) {
        const parsedBlog = JSON.parse(storedBlog);
        setNumFields(parsedBlog.length);
        setInputs(parsedBlog);
      }
    }, []);
  
    const handleAddField = (type) => {
      setNumFields((prevNumFields) => prevNumFields + 1);
      setInputs((prevInputs) => [...prevInputs, { type, value: "" }]);
    };
  
    const handleChange = async (index, event) => {
      const value = event.target.files || event.target.value;
  
      if (inputs[index].type === "file" && value.length > 0) {
        const file = value[0];
        const base64String = await convertFileToBase64(file);
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index].value = base64String;
          return newInputs;
        });
      } else {
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index].value = value;
          console.log(newInputs);
          return newInputs;
        });
      }
    };
  
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    const handleDelete = (index) => {
      setNumFields((prevNumFields) => prevNumFields - 1);
      setInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs.splice(index, 1);
        return newInputs;
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("blog", JSON.stringify(inputs));
      navigate("/blog/preview"); // Redirect to the desired page after submission
    };
  
    return (
      <div>
        {header()}
        {sidebar()}
        <div className="content-box">
          <form onSubmit={handleSubmit}>
            {[...Array(numFields)].map((_, index) => (
              <div key={index}>
                {inputs[index].type === "text" ? (
                  <div>
                    <textarea
                      value={inputs[index].value}
                      onChange={(event) => handleChange(index, event)}
                      placeholder="Type here..."
                      className="form-control"
                      required
                    />
                    <span>{inputs[index].value.length}/8000 characters</span>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id={`input${index}`}
                      name={`input${index}`}
                      className="form-control"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                )}
                <button type="button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            ))}
            <div>
              <button type="button" onClick={() => handleAddField("text")}>
                Add Text
              </button>
              <button type="button" onClick={() => handleAddField("file")}>
                Add File
              </button>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }