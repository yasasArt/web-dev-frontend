import toast from "react-hot-toast";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root"); // important for accessibility

export default function ViewOrderInfoCustomer({ order }) {
    const [isModalOpen, setIsModelOpen] = useState(false);

    function getStatusStyle(status) {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "processing":
                return "bg-blue-100 text-blue-700 border-blue-300";
            case "completed":
                return "bg-green-100 text-green-700 border-green-300";
            case "cancelled":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModelOpen(false)}
                className="max-w-3xl mx-auto mt-20 bg-white rounded-2xl shadow-xl outline-none"
                overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b p-5">
                    <div>
                        <h2 className="text-xl font-semibold text-secondary">
                            Order Details
                        </h2>
                        <p className="text-sm text-gray-500">
                            Order ID: {order.orderId}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModelOpen(false)}
                        className="text-gray-500 hover:text-secondary text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Customer Name" value={order.name} />
                        <InfoItem label="Email" value={order.email} />
                        <InfoItem label="Phone" value={order.phone || "—"} />
                        <InfoItem
                            label="Order Date"
                            value={new Date(order.date).toLocaleString()}
                        />

                        {/* Status (Disabled) */}
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Status</p>
                            <select
                                value={order.status}
                                disabled
                                className={`w-full px-3 py-2 rounded-lg border text-sm font-medium capitalize
                                    cursor-not-allowed
                                    ${getStatusStyle(order.status)}
                                `}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Delivery Address
                        </p>
                        <div className="bg-primary p-3 rounded-lg text-sm">
                            {order.address}
                        </div>
                    </div>

                    {/* Notes (Disabled) */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Additional Notes
                        </p>
                        <textarea
                            className="bg-primary p-3 rounded-lg text-sm w-full resize-none cursor-not-allowed"
                            value={order.notes || ""}
                            disabled
                        />
                    </div>

                    {/* Items */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-3">
                            Ordered Items
                        </p>

                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-3 bg-accent rounded-xl"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium text-secondary">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Product ID: {item.productID}
                                        </p>
                                        <p className="text-sm">
                                            Rs. {item.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-semibold text-secondary">
                                        Rs. {item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-5 flex justify-between items-center">
                    <p className="text-lg font-semibold text-secondary">
                        Total: Rs. {order.total}
                    </p>

                    <button
                        onClick={() => setIsModelOpen(false)}
                        className="bg-secondary text-white px-5 py-2 rounded-lg hover:bg-secondary/90"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Trigger Button */}
            <button
                className="bg-secondary/70 hover:bg-secondary p-2 rounded-lg text-white cursor-pointer"
                onClick={() => setIsModelOpen(true)}
            >
                View Info
            </button>
        </>
    );
}

/* Reusable info row */
function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-secondary">{value}</p>
        </div>
    );
}
