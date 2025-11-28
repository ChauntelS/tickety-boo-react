import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Purchase() {
    const { id } = useParams()

    return (
        <>
        <div className="purchase-page">
            <p><Link to={`/home/${id}`}>← Back to Haunts</Link></p>
            <div className="d-flex justify-content-center bg-dark text-white p-4 rounded-3 shadow-sm">
            <h1>Tickets are to Scary Purchase Right Now!</h1>
            </div>
            <h3>Coming Soon...</h3>
            </div>
        </>
    )
}

export default Purchase