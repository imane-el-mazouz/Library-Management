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
        console.log("Tentative de connexion..."); // Log 1

        try {
            console.log("Envoi de la requête à l'API..."); // Log 2
            const response = await axios.post("http://localhost:8088/api/auth/login", { email, password });
            console.log("Réponse de l'API :", response); // Log 3

            if (response.data && response.data.role) {
                console.log("Connexion réussie, rôle de l'utilisateur :", response.data.role); // Log 4
                const userRole = response.data.role;

                if (userRole === "READER") {
                    navigate("/bookslist");
                } else if (userRole === "LIBRARIAN") {
                    navigate("/dashboard");
                } else {
                    navigate("/dashboard");
                }
            } else {
                console.error("Réponse de l'API invalide :", response.data); // Log 5
                setError("Réponse du serveur invalide.");
            }
        } catch (err: any) {
            console.error("Erreur lors de la connexion :", err); // Log 6
            if (err.response) {
                console.error("Réponse d'erreur de l'API :", err.response.data); // Log 7
                setError(err.response.data.message || "Erreur de connexion, vérifiez vos identifiants.");
            } else {
                setError("Erreur de connexion, vérifiez vos identifiants.");
            }
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