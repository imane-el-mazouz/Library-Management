import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
    
        try {
            console.log("Envoi de la requête à l'API...");
            const response = await axios.post(
                "/api/auth/login", 
                { email, password }, 
                { withCredentials: true }
            );

            console.log("Réponse de l'API :", response);
           
            const { accessToken, user } = response.data;
            
            if (accessToken && user) {
                // Store the token in localStorage or your preferred storage method
                localStorage.setItem('accessToken', accessToken);
                
                // Get the role from the user object
                const userRole = user.role;
                console.log("Connexion réussie, rôle de l'utilisateur :", userRole);

                // Store user info if needed
                localStorage.setItem('user', JSON.stringify(user));

                // Navigate based on role
                if (userRole === "READER") {
                    navigate("/bookslist");
                } else if (userRole === "LIBRARIAN") {
                    navigate("/dashboard");
                } else {
                    navigate("/dashboard");
                }
            } else {
                console.error("Réponse de l'API invalide :", response.data);
                setError("Informations d'utilisateur manquantes dans la réponse.");
            }
        } catch (err: any) {
            console.error("Erreur lors de la connexion :", err);
            if (err.response) {
                console.error("Réponse d'erreur de l'API :", err.response.data);
                setError(err.response.data.message || "Erreur de connexion, vérifiez vos identifiants.");
            } else {
                console.error("Erreur réseau :", err.message);
                setError("Erreur de connexion, vérifiez vos identifiants.");
            }
        } finally {
            setIsLoading(false);
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Pas encore de compte ?{" "}
                    <Link to="/signup" className="text-blue-500 hover:text-blue-600 underline">
                        S'inscrire
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;