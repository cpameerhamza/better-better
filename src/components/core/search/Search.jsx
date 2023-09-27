import { toast } from "react-toastify";
import Toaster from "../../../utils/Toaster";
import { filterIcon } from "../../../utils/SvgIcons";
import { useState } from "react";

const Search = ({setRecords, records, data}) => {
    const [searchTerm, setSearchTerm] = useState(null);
    const pendings = records.filter((record) => {
        return record?.status === 2
    })
    const sentLetters = data.filter((record) => {
        return record?.status === 1
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchTerm.toLowerCase() === ("Pending").toLowerCase()){
            pendings.length ? setRecords(pendings) : toast.error("Pending letters not found.");
        }
        else if(searchTerm.toLowerCase() === ("Sent").toLowerCase()){
            sentLetters.length ? setRecords(sentLetters) : toast.error("Sent letters not found.");
        }
        else{
            toast.error("No such record found.");
        }
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="filtericon" type="submit">{filterIcon()}</button>
            </form>
            <Toaster />
        </>
    )
}

export default Search