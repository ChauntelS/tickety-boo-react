import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Upcomming() {
    const { id } = useParams()

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Haunts</Link></p>

            <div>Upcomming Page for ID:{id}</div>
        </>
    )
}

export default Upcomming