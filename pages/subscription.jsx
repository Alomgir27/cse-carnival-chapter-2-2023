import { useState } from 'react';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([
        { id: 1, name: 'Free', price: 0, description: "Free plan" },
        { id: 2, name: 'Basic', price: 10, description: "Basic plan" },
        { id: 3, name: 'Premium', price: 20, description: "Premium plan" },
    ]);

    const handleSubscriptionSelect = (selectedSubscription) => {
        // Add code to handle the selected subscription (e.g., payment flow).
        console.log(`Selected subscription: ${selectedSubscription.name}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="grid grid-cols-3 gap-4">
                {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="bg-white p-8 rounded shadow-md text-center hover:shadow-lg transition-shadow duration-300 ease-in-out relative rounded-lg overflow-hidden">
                        <h1 className="text-2xl font-semibold mb-4">{subscription.name} Plan</h1>
                        <p className="text-sm text-gray-500 mb-4">{subscription.description}</p>
                        <p className="text-lg font-semibold mb-4">${subscription.price} / month</p>
                        <button
                            onClick={() => handleSubscriptionSelect(subscription)}
                            className={`w-full text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out ${subscription.id === 1 ? 'bg-blue-600' : 'bg-blue-500'}`}
                        >
                            Select Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscription;
