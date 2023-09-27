import {useState} from "react";
import avatar from "../assets/images/user__icon.jpg";

const PreviewPhoto = ({file}) => {
    const [preview, setPreview] = useState(null);
    if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result);
        }
    }
    return(
        <>
        {
            preview ?
            <img src={preview} alt={"#"} loading="lazy" />
            : <img src={avatar} alt={"#"} loading="lazy" />
        }
        </>
    )
}

export default PreviewPhoto