import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function Purchase() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm();
    const [progress, setProgress] = useState(0);

    // All form fields to track for progress
    const fields = [
        "Quantity", "CustomerEmail", "CardType",
        "CardNum", "CardExpire", "CardSecurity",
        "CustomerName", "CustomerBillAdd",
        "CustomerCountry", "CustomerCity"
    ];

    // Update progress bar dynamically
    const handleProgress = (data) => {
        let filled = 0;
        fields.forEach(field => {
            if (data[field] && data[field] !== "") filled++;
        });
        setProgress(Math.round((filled / fields.length) * 100));
    };

    const watchedFields = watch();
    useEffect(() => {
        handleProgress(watchedFields);
    }, [watchedFields]);

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
    };

    return (
        <div className="purchase-page text-white container my-4">
            <h1 className="mb-4 text-center" style={{ color: 'var(--color-accent1)', textShadow: '2px 2px 6px #000' }}>
                Purchase Your Tickets
            </h1>

            <p>
                <Link 
                    to={`/details/${id}`}
                    className="btn btn-outline-se mt-auto text-light"
                >
                    ← Back to Haunt
                </Link>
            </p>

            {/* Progress Bar */}
            <div className="progress mb-4" style={{ height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%`, backgroundColor: 'var(--color-accent1)' }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {progress}%
                </div>
            </div>

            <div className="d-flex justify-content-center text-white p-4 rounded-3 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="purchase-form w-50">
                    {/* Purchase Info */}
                    <div className="card p-3 mb-3 bg-dark text-white rounded-3 shadow-sm">
                        <legend style={{ color: 'var(--color-accent1)' }}>Purchase Information</legend>
                        
                        <div className="mb-3">
                            <label htmlFor="Quantity" className="form-label">Ticket Quantity</label>
                            <select
                                id="Quantity"
                                className="form-select bg-dark text-white"
                                {...register("Quantity", { required: true })}
                            >
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
                                className="form-control bg-dark text-white"
                                {...register("CustomerEmail", { required: true })}
                            />
                            {errors.CustomerEmail && <p className="text-danger">Valid email required</p>}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="card p-3 mb-3 bg-dark text-white rounded-3 shadow-sm">
                        <legend style={{ color: 'var(--color-accent1)' }}>Payment Information</legend>

                        <div className="mb-3">
                            <label className="form-label">Payment Type</label>
                            <select
                                className="form-select bg-dark text-white"
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
                                className="form-control bg-dark text-white"
                                {...register("CardNum", { required: true, minLength: 12, maxLength: 16 })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Expiry</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                placeholder="MM/YY"
                                {...register("CardExpire", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Security Number</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CardSecurity", { required: true, minLength: 3, maxLength: 4 })}
                            />
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div className="card p-3 mb-3 bg-dark text-white rounded-3 shadow-sm">
                        <legend style={{ color: 'var(--color-accent1)' }}>Billing Information</legend>

                        <div className="mb-3">
                            <label className="form-label">Name on Card</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerName", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Street Address</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerBillAdd", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerCountry", { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerCity", { required: true })}
                            />
                        </div>
                    </div>

                    <button
                        className="btn w-100"
                        style={{
                            backgroundColor: 'var(--color-accent1)',
                            color: 'var(--color-dark)',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'transform 0.2s, background-color 0.3s'
                        }}
                        type="submit"
                    >
                        Complete Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Purchase;
