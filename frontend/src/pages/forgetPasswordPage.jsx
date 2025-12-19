import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    // ✅ FIXED resetPassword function
    async function resetPassword() {
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/users/validate-otp`, // ✅ correct
            {
                email: email,
                otp: otp,
                newPassword: newPassword,
            }
        );


            toast.success("Password reset successfully");
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message ||
                "Error resetting password. Try again later"
            );
        } finally {
            setLoading(false);
        }
    }

    async function sendOtp() {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/send-otp/${email}`
            );

            toast.success("OTP sent to your email");
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[400px] bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Forgot Password
                </h2>

                {!otpSent ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-secondary text-white p-2 rounded hover:bg-secondary/70 disabled:opacity-50"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 mb-3 border border-gray-300 rounded"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 mb-3 border border-gray-300 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                        />

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="w-full bg-secondary text-white p-2 rounded hover:bg-secondary/70 disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-sm text-gray-600 hover:text-secondary"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
