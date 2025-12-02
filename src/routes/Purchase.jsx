import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Purchase() {
    const { id } = useParams()

    return (
        <>
        <div className="purchase-page">


            
            <p><Link to={`/details/${id}`}className="btn btn-outline-info mt-auto text-light">← Back to event</Link></p>
          
            <div className="d-flex justify-content-center bg-dark text-white p-4 rounded-3 shadow-sm">
            
            <form>
                <div className="card p-3 mb-3 bg-secondary rounded-3">
                <legend>Purchase Information</legend>
                
                <div className="mb-3">
                    <label for="Quantity" className="form-label">Ticket of Quantity</label>
                    <select id="Quantity" className="form-select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        </select>
                </div>

                <div class="mb-3">
                    <label for="CustomerEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                </div>
            
        
                <div className="card p-3 mb-3 bg-secondary rounded-3">
                <legend>Payment Information</legend>
                <div className="mb-3">
                    <label for="CardType" class="form-label">Payment Type</label>
                    <select id="disabledSelect" class="form-select">
                    <option>Master Card</option>
                    <option>Visa</option>
                    <option>American Express</option>
                    <option>Discover</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="CardNumber" class="form-label">Card Number</label>
                    <input type="int" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>

                <div class="mb-3">
                    <label for="CardExpire" class="form-label">Card Expiry</label>
                    <input type="int" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>

                <div class="mb-3">
                    <label for="CardSecurity" class="form-label">Card Security Number</label>
                    <input type="int" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>
                </div>
                
                <div className="card p-3 mb-3 bg-secondary rounded-3">
                    <legend>Billing Information</legend>
                    
                <div class="mb-3">
                    <label for="CustomerName" class="form-label">Name on Card</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>

                <div class="mb-3">
                    <label for="CustomerBillAdd" class="form-label">Street Address</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>

                <div class="mb-3">
                    <label for="CustomerBillAdd" class="form-label">Country</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>

                <div class="mb-3">
                    <label for="CustomerCity" class="form-label">City</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input"/>
                </div>
                </div>

            </form>
        
            </div>
            </div>
        </>
    )
}

export default Purchase