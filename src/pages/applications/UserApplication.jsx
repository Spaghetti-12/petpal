import "./application.css";
import "../PublicCSS/templatestyle.css";
import { header } from "../PublicComponents/header.jsx";
import { sidebar } from "../PublicComponents/user_sidebar.jsx";
import { form } from "./Form.jsx";
import { baseURL } from "../../urlConfig.js";

export function UserApplication() {
  return (
    <div>
      {header()}
      {sidebar()}
      <div className="content-box">
        <h1>
          <b>Your application</b>
        </h1>
        {form()}
      </div>
    </div>
  );
}
