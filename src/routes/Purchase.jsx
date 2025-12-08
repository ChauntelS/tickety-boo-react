import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';



// Luhn Algorithm for card validation
function isValidCardNumber(value) {
    const digits = value.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}



function Purchase() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [progress, setProgress] = useState(0);

    const fields = [
        "Quantity", "CustomerEmail", "CardType",
        "CardNum", "CardExpire", "CardSecurity",
        "CustomerName", "CustomerBillAdd",
        "CustomerCountry", "CustomerCity"
    ];

    const handleProgress = (data) => {
        let filled = 0;
        fields.forEach(field => {
            if (data[field] && data[field] !== "") filled++;
        });
        setProgress(Math.round((filled / fields.length) * 100));
    };

    const watchedFields = watch();
    useEffect(() => handleProgress(watchedFields), [watchedFields]);

    const onSubmit = async (data) => {
        data.HauntId = id;
        console.log("Submitting:", data);
        const res = await fetch("http://localhost:3000/api/haunts/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log(result);
    };

    // Helper function to show ✅ or ❌
    const renderIcon = (fieldName) => {
        const value = watchedFields[fieldName];
        if (!value) return null;
        if (errors[fieldName]) return <span className="text-danger ms-2">❌</span>;
        return <span className="text-success ms-2">✅</span>;
    };

    

    return (
        <div className="purchase-page text-white container my-4">
            <h1 className="mb-4 text-center" style={{ color: 'var(--color-accent1)', textShadow: '2px 2px 6px #000' }}>
                Purchase Your Tickets
            </h1>

            <p>
                <Link to={`/details/${id}`} className="btn btn-outline-se mt-auto text-light">
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
                                {...register("Quantity", { required: "Quantity is required" })}
                            >
                                {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
                            {errors.Quantity && <p className="text-danger">{errors.Quantity.message}</p>}
                            {renderIcon("Quantity")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control bg-dark text-white"
                                {...register("CustomerEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                        message: "Enter a valid email"
                                    }
                                })}
                            />
                            {errors.CustomerEmail && <p className="text-danger">{errors.CustomerEmail.message}</p>}
                            {renderIcon("CustomerEmail")}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="card p-3 mb-3 bg-dark text-white rounded-3 shadow-sm">
                        <legend style={{ color: 'var(--color-accent1)' }}>Payment Information</legend>

                        <div className="mb-3">
                            <label className="form-label">Payment Type</label>
                            <select
                                className="form-select bg-dark text-white"
                                {...register("CardType", { required: "Card type is required" })}
                            >
                                <option value="">Select...</option>
                                <option>Master Card</option>
                                <option>Visa</option>
                                <option>American Express</option>
                                <option>Discover</option>
                            </select>
                            {errors.CardType && <p className="text-danger">{errors.CardType.message}</p>}
                            {renderIcon("CardType")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CardNum", {
                                    required: "Card number is required",
                                    minLength: { value: 12, message: "Minimum 12 digits" },
                                    maxLength: { value: 16, message: "Maximum 16 digits" },
                                    pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                                    validate: value => isValidCardNumber(value) || "Invalid card number"
                                })}
                            />
                            {errors.CardNum && <p className="text-danger">{errors.CardNum.message}</p>}
                            {renderIcon("CardNum")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Expiry (MM/YY)</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                placeholder="MM/YY"
                                {...register("CardExpire", {
                                    required: "Expiry date is required",
                                    pattern: {
                                        value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                        message: "Invalid format MM/YY"
                                    }
                                })}
                            />
                            {errors.CardExpire && <p className="text-danger">{errors.CardExpire.message}</p>}
                            {renderIcon("CardExpire")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Card Security Number</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CardSecurity", {
                                    required: "CVC is required",
                                    minLength: { value: 3, message: "Minimum 3 digits" },
                                    maxLength: { value: 4, message: "Maximum 4 digits" },
                                    pattern: { value: /^[0-9]+$/, message: "Numbers only" }
                                })}
                            />
                            {errors.CardSecurity && <p className="text-danger">{errors.CardSecurity.message}</p>}
                            {renderIcon("CardSecurity")}
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
                                {...register("CustomerName", { required: "Name is required" })}
                            />
                            {errors.CustomerName && <p className="text-danger">{errors.CustomerName.message}</p>}
                            {renderIcon("CustomerName")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Street Address</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerBillAdd", { required: "Street address is required" })}
                            />
                            {errors.CustomerBillAdd && <p className="text-danger">{errors.CustomerBillAdd.message}</p>}
                            {renderIcon("CustomerBillAdd")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerCountry", { required: "Country is required" })}
                            />
                            {errors.CustomerCountry && <p className="text-danger">{errors.CustomerCountry.message}</p>}
                            {renderIcon("CustomerCountry")}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                {...register("CustomerCity", { required: "City is required" })}
                            />
                            {errors.CustomerCity && <p className="text-danger">{errors.CustomerCity.message}</p>}
                            {renderIcon("CustomerCity")}
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
