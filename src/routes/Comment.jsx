import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Comment() {
    const { id } = useParams()

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Photo</Link></p>

            <div>Comment Page for ID:{id}</div>
        </>
    )
}

export default Comment