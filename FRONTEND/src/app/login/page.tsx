"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "./handle_login";
import Link from "next/link";
import Cookies from "js-cookie";
import { IoArrowBack } from "react-icons/io5";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icon email & password
import { ImSpinner2 } from "react-icons/im"; // Icon loading

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await handleLogin(formData);
            console.log("Kết quả đăng nhập:", result);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                Cookies.set("dify_token", result.token, { expires: 1 });
                router.push("/dashboard");
            }
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 relative">
            {/* Nút quay lại */}
            <button
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
                <IoArrowBack className="text-blue-500 text-2xl" />
            </button>

            <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Đăng nhập</h2>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input
                            name="email"
                            type="email"
                            placeholder="Nhập email"
                            required
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                        <FaLock className="text-gray-500 mr-2" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            required
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400"
                    >
                        {isPending ? <ImSpinner2 className="animate-spin" /> : "Đăng nhập"}
                    </button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>

                <p className="text-center mt-4 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className="text-indigo-500 font-semibold hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
