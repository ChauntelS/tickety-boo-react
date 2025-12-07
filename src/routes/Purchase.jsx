import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


function Purchase() {
    const { id } = useParams()

   const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.HauntId = id; // add the event ID
        console.log("Submitting:", data);

        const res = await fetch("http://localhost:3000/api/haunts/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log(result);
    }

    return (
        <>
        <div className="purchase-page text-white container my-4">

            <p>
                <Link 
                to={`/details/${id}`}
                className="btn btn-outline-info mt-auto text-light"
                >← Back to Haunt
                </Link>
            </p>
          
            <div className="d-flex justify-content-center  text-white p-4 rounded-3 shadow-sm">
            
            <form onSubmit={handleSubmit(onSubmit)} className="purchase-form w-50">
                <div className="card p-3 mb-3 bg-secondary rounded-3 text-white">
                <legend>Purchase Information</legend>
                
                <div className="mb-3">
                    <label htmlFor="Quantity" className="form-label">Ticket of Quantity</label>
                    <select id="Quantity" className="form-select"
                    {...register("Quantity", { required: true })}>
                        {[1,2,3,4,5,6].map(num =>
                                    <option key={num} value={num}>{num}</option>
                                )}
                        </select>
                        {errors.Quantity && <p className="text-danger">Required</p>}
                </div>

                 <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                {...register("CustomerEmail", { required: true })}
                            />
                            {errors.CustomerEmail && <p className="text-danger">Valid email required</p>}
                        </div>
                    </div>
            
        
                <div className="card p-3 mb-3 bg-secondary rounded-3 text-white">
                        <legend>Payment Information</legend>

                        <div className="mb-3">
                            <label className="form-label">Payment Type</label>
                            <select
                                className="form-select"
                                {...register("CardType", { required: true })}
                            >
                                <option>Master Card</option>
                                <option>Visa</option>
                                <option>American Express</option>
                                <option>Discover</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CardNum", { required: true, minLength: 12, maxLength: 16 })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Expiry</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                {...register("CardExpire", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Security Number</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CardSecurity", { required: true, minLength: 3, maxLength: 4 })}
                            />
                        </div>
                    </div>
                <div className="card p-3 mb-3 bg-secondary rounded-3 text-white">
                        <legend>Billing Information</legend>

                        <div className="mb-3">
                            <label className="form-label">Name on Card</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CustomerName", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Street Address</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CustomerBillAdd", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CustomerCountry", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("CustomerCity", { required: true })}
                            />
                        </div>
                    </div>

                    <button className="btn btn-success w-100" type="submit">
                        Complete Purchase
                    </button>

                </form>
            </div>
        </div>
        </>
    )
}

export default Purchase