import {header} from "../PublicComponents/header";
import {sidebar} from "../PublicComponents/shelter_sidebar";
import {form} from "./subcomponents/editform";

export function EditListing() {
    return (<div className="outerbox">
        {header()}
        {sidebar()}
        <div className="content-box">
            {form()}
        </div>
    </div> )
}