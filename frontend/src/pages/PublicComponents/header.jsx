import {NotifDropdown} from "./headersubcomponents/notifdropdown";

export function header() {
  return (
    <div className="header">
        {NotifDropdown()}

      <details className="right-dropdown">
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
