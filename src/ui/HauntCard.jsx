import { Link } from 'react-router-dom'

function HauntCard(props) {
    return (
        <div className="haunt-grid-item">
            <div className="glass-card shadow-sm h-100 border-0">
            
                <img src={props.Filename} alt={props.HauntTitle}  className="card-img-fluid rounded-top" 
                style={{ height: "", objectFit: "cover" }}/>
                 <div className="card-body d-flex flex-column text-center text-white">
                <h5 className="Title">{props.HauntTitle}</h5>
                <Link to={`/details/${props.HauntId}`}className="btn btn-outline-info mt-auto text-light ">Get Haunt Details</Link>
                </div>
            
            </div>
        </div>
    )
}

export default HauntCard
