import { Link } from 'react-router-dom'

function HauntCard(props) {
    return (
        <div className="haunt-grid-item">
            <div className="card shadow-sm h-100 border-0">
            
                <img src={props.Filename} alt={props.HauntTitle}  className="card-img-top" 
                style={{ height: "", objectFit: "cover" }}/>
                 <div className="card-body d-flex flex-column">
                <h5 className="Title">{props.HauntTitle}</h5>
                <Link to={`/details/${props.HauntId}`}className="btn btn-primary mt-auto">View Details</Link>
                </div>
            
            </div>
        </div>
    )
}

export default HauntCard
