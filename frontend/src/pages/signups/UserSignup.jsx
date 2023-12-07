import "./signupstyle.css";
import "../PublicCSS/homepage.css";
import { form } from "./user_subcomponents/usersignupform.jsx";

export function UserSignup() {
  return (
    <div className="signup-div">
      <h1>Let's get an account set up!</h1>
      {form()}
    </div>
  );
}
