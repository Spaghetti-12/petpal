import {NotifDropdown} from "./headersubcomponents/notifdropdown";
import { useState, useEffect } from "react";
import { baseURL } from "../../urlConfig";

export function header() {

  const [detailsClosed, setDetailsClosed] = useState(true);

  const handleToggleDetails = () => {
    const detailsElement = document.getElementsByClassName("right-dropdown")[0];
    if (detailsElement) {
      if (detailsElement.open) {
        setDetailsClosed(true);
      } else {
        setDetailsClosed(false);
      }
    }
  };

  return (
    <div className="header">
        {NotifDropdown()}

      <details className={`right-dropdown ${detailsClosed ? 'closed' : ''}`} onClick={handleToggleDetails}>
        <summary>
          <b className="dropdown-tag">Account Details</b>
        </summary>
        <p>
          First Name: Elliot Last Name: Sicheri Location: 40 St George St.
          Email: elliot.sicheri@mail.utoronto.ca Phone number: 647-631-3691
        </p>
        <a href="/account">Go to accounts page</a>
      </details>
    </div>
  );
}
