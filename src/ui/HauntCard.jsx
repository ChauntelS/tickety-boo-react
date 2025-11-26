import { Link } from 'react-router-dom'

function HauntCard(props) {
    return (
        <div className="haunt-grid-item">
            <Link to={`/details/${props.HauntId}`}>
                <img src={props.Filename} alt={props.HauntTitle} />
                <div className="label">{props.HauntTitle}</div>
            </Link>
        </div>
    )
}

export default HauntCard