import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8088/api/auth/login", { email, password });
            console.log("Connexion réussie :", response.data);

            const userRole = response.data.role;
            if (userRole === "READER") {
                navigate("/bookslist");
            } else if (userRole === "LIBRARIAN") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err: any) {
            setError("Erreur de connexion, vérifiez vos identifiants.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 text-center">Connexion</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Se connecter
                </button>
                <p className="mt-4 text-center">
                    Pas encore de compte ?{" "}
                    <Link to="/signup" className="text-blue-500 underline">
                        S'inscrire
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
