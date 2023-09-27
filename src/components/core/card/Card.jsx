import "./card.css"
import {electricIcon} from "../../../utils/SvgIcons";


const Card = ({title, number}) => {
    return(
        <>
            <div className="main__card">
                <div className="main__card-top">
                    {electricIcon()}
                    <p>{title}</p>
                </div>
                <h3 className="main__card-number">{number}</h3>
            </div>
        </>
    )
}

export default Card;