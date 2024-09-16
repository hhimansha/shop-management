import React, { useState, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define TypeScript interfaces for the state and props
interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    ratings: number;
}

interface User {
    username: any;
    _id: string;
    address: string;
    mobilenumber: string;
}

const Order: React.FC = () => {
    const location = useLocation();
    const item = location.state?.item as CartItem;

    if (!item) {
        return <div>No item details available.</div>;
    }

    const [cardNumber, setCardNumber] = useState<string>("");
    const [expirationDate, setExpirationDate] = useState<string>("");
    const [cvv, setCVV] = useState<string>("");
    const [cardHolder, setCardHolder] = useState<string>("");
    const [isValidCardNumber, setIsValidCardNumber] = useState<boolean>(true);
    const [isValidExpirationDate, setIsValidExpirationDate] = useState<boolean>(true);
    const [isValidCVV, setIsValidCVV] = useState<boolean>(true);
    const [isValidCardHolder, setIsValidCardHolder] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Retrieve user from local storage
        const user = JSON.parse(localStorage.getItem('user') || '{}') as User;

        // Check if the user has an address
        if (!user.address) {
            alert("Please provide a delivery address.");
            return;
        }

        // Check the validity of all input fields
        if (
            !isValidCardNumber ||
            !isValidExpirationDate ||
            !isValidCVV ||
            !isValidCardHolder
        ) {
            alert("Please fill in all required fields with valid information.");
            return;
        }

        // Check if any of the card details is empty
        if (!cardNumber || !expirationDate || !cvv || !cardHolder) {
            alert("Please enter all card details.");
            return;
        }

        // Formatting card number and expiration date
        const formattedCardNumber = cardNumber.replace(/\D/g, "");
        const formattedExpirationDate = expirationDate.replace(/\D/g, "");

        // Prepare order data
        const orderData = {
            name: user.username,
            address: user.address,
            mobile: user.mobilenumber,
            totalAmount: item.price,
            user: user._id,
            items: [item.id.toString()],
        };

        // Simulate an API call
        try {
            setTimeout(() => {
                console.log("Order placed successfully");
                // Remove cart details from local storage
                localStorage.removeItem("cart");

                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
                // Navigate to a success page or clear the form
                navigate("/success"); // Example route
            }, 1000);
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle unexpected errors
        }
    };

    const formatCardNumber = (input: string) => {
        const numericValue = input.replace(/\D/g, "");
        return numericValue.replace(/(\d{4})/g, "$1 ").trim();
    };

    const formatExpirationDate = (input: string) => {
        const numericValue = input.replace(/\D/g, "");
        return numericValue.replace(/^(\d{2})/, "$1 /");
    };

    return (
        <div className="py-6 px-4 md:px-6 2xl:px-20 2xl:container mx-auto  max-w-screen-xl ">
            <div className="mt-10 flex w-full flex-col xl:flex-row justify-center items-stretch xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="grid md:flex mx-auto md:flex-row  justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="grid w-full">
                        <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md mx-auto">
                            <p className="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Customer’s Cart</p>
                                <div  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4 md:pb-8 w-20 md:w-40">
                                        <img className="w-96 hidden md:block" src={item.image} alt={item.name} />
                                        <img className="w-96 md:hidden" src={item.image} alt={item.name} />
                                    </div>
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-md dark:text-black xl:text-md font-semibold leading-6 text-black">{item.name}</h3>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 md:p-6 xl:p-8 w-full py-4 bg-grey-light rounded-2xl drop-shadow-md space-y-2">
                                <h2 className="text-lg font-medium mb-4">Delivery Information</h2>

                                <div className="delivery info border-gray-200 flex">
                                    <p className="text-base text-gray-400 font-semibold leading-4">
                                        123 Main St
                                    </p>
                                </div>
                                <div className="delivery info border-gray-200 flex">
                                    <p className="text-base text-gray-400 font-semibold leading-4">
                                        Cityville
                                    </p>
                                </div>
                                <div className="delivery info border-gray-200 flex">
                                    <p className="text-base text-gray-400 font-semibold leading-4">
                                        ST
                                    </p>
                                </div>
                                <div className="delivery info border-gray-200 flex">
                                    <p className="text-base text-gray-400 font-semibold leading-4">
                                        12345
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid w-2/3">
                        <div className="flex flex-col px-4 md:p-6 xl:p-8 w-full py-4  bg-gray-100 rounded-2xl drop-shadow-md">
                            <h2 className="text-lg font-bold mb-4">Payment Information</h2>
                            <form>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="1234 5678 1234 5678"
                                        className={`border ${isValidCardNumber ? "border-gray-300" : "border-red-500"} rounded-lg px-3 py-2`}
                                    />
                                    {!isValidCardNumber && <p className="text-red-500 text-xs">Invalid card number</p>}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium text-gray-700">Expiration Date</label>
                                    <input
                                        type="text"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
                                        placeholder="MM/YY"
                                        className={`border ${isValidExpirationDate ? "border-gray-300" : "border-red-500"} rounded-lg px-3 py-2`}
                                    />
                                    {!isValidExpirationDate && <p className="text-red-500 text-xs">Invalid expiration date</p>}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium text-gray-700">CVV</label>
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => setCVV(e.target.value)}
                                        placeholder="123"
                                        className={`border ${isValidCVV ? "border-gray-300" : "border-red-500"} rounded-lg px-3 py-2`}
                                    />
                                    {!isValidCVV && <p className="text-red-500 text-xs">Invalid CVV</p>}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm font-medium text-gray-700">Card Holder Name</label>
                                    <input
                                        type="text"
                                        value={cardHolder}
                                        onChange={(e) => setCardHolder(e.target.value)}
                                        placeholder="John Doe"
                                        className={`border ${isValidCardHolder ? "border-gray-300" : "border-red-500"} rounded-lg px-3 py-2`}
                                    />
                                    {!isValidCardHolder && <p className="text-red-500 text-xs">Card holder name required</p>}
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col px-4 md:p-6 xl:p-8 w-full mt-10 py-4 bg-gray-100 rounded-2xl drop-shadow-md space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium">Total Amount</h2>
                                <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
