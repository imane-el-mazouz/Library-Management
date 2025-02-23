import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    available: boolean;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role : Role;
}
enum Role{
    LIBRARIAN = "LIBRARIAN",
    READER = "READER"
}

interface Borrowing {
    id: number;
    bookId: number;
    userId: number;
    
}

const LibrarianDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"books" | "users" | "borrowings">("books");

    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", available: true });
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ username: "" });

    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const fetchBooks = async () => {
        try {
            // Récupérer le token stocké lors de la connexion
            const token = localStorage.getItem('accessToken');
            
            // Ajouter le token dans les headers de la requête
            const res = await axios.get("http://localhost:8088/api/books", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBooks(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get<User[]>("http://localhost:8088/api/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    };

    const fetchBorrowings = async () => {
        try {
            const res = await axios.get<Borrowing[]>("http://localhost:8088/api/borrowings");
            setBorrowings(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des emprunts:", error);
        }
    };

    useEffect(() => {
        if (activeTab === "books") fetchBooks();
        if (activeTab === "users") fetchUsers();
        if (activeTab === "borrowings") fetchBorrowings();
    }, [activeTab]);

    const addBook = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post("http://localhost:8088/api/books", newBook, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNewBook({ title: "", author: "", genre: "", available: true });
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre:", error);
        }
    };
    const updateBook = async () => {
        if (!editingBook) return;
        try {
            await axios.put(`http://localhost:8088/api/books/${editingBook.id}`, editingBook);
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du livre:", error);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8088/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de la suppression du livre:", error);
        }
    };

    const addUser = async () => {
        try {
            // Pour créer un lecteur, on utilise l'endpoint dédié
            await axios.post("http://localhost:8088/api/users/readers", newUser);
            setNewUser({ username: "" });
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8088/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard Bibliothécaire</h1>
            {/* Navigation entre les onglets */}
            <div className="mb-4">
                <button
                    onClick={() => setActiveTab("books")}
                    className={`mr-2 px-4 py-2 rounded ${activeTab === "books" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Livres
                </button>
                <button
                    onClick={() => setActiveTab("users")}
                    className={`mr-2 px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Utilisateurs
                </button>
                <button
                    onClick={() => setActiveTab("borrowings")}
                    className={`px-4 py-2 rounded ${activeTab === "borrowings" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Emprunts
                </button>
            </div>

            {activeTab === "books" && (
                <div>
                    <h2 className="text-2xl font-bold mb-2">Gestion des Livres</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold">Ajouter un livre</h3>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            className="border p-1 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Auteur"
                            value={newBook.author}
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            className="border p-1 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Genre"
                            value={newBook.genre}
                            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                            className="border p-1 mr-2"
                        />
                        <button onClick={addBook} className="bg-green-500 text-white px-3 py-1 rounded">
                            Ajouter
                        </button>
                    </div>

                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2">ID</th>
                            <th className="py-2">Titre</th>
                            <th className="py-2">Auteur</th>
                            <th className="py-2">Genre</th>
                            <th className="py-2">Disponible</th>
                            <th className="py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className="text-center border-t">
                                <td className="py-2">{book.id}</td>
                                <td className="py-2">
                                    {editingBook?.id === book.id ? (
                                        <input
                                            type="text"
                                            value={editingBook.title}
                                            onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                                            className="border p-1"
                                        />
                                    ) : (
                                        book.title
                                    )}
                                </td>
                                <td className="py-2">
                                    {editingBook?.id === book.id ? (
                                        <input
                                            type="text"
                                            value={editingBook.author}
                                            onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                                            className="border p-1"
                                        />
                                    ) : (
                                        book.author
                                    )}
                                </td>
                                <td className="py-2">
                                    {editingBook?.id === book.id ? (
                                        <input
                                            type="text"
                                            value={editingBook.genre}
                                            onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                                            className="border p-1"
                                        />
                                    ) : (
                                        book.genre
                                    )}
                                </td>
                                <td className="py-2">{book.available ? "Oui" : "Non"}</td>
                                <td className="py-2 space-x-2">
                                    {editingBook?.id === book.id ? (
                                        <button onClick={updateBook} className="bg-blue-500 text-white px-3 py-1 rounded">
                                            Sauvegarder
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditingBook(book)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => deleteBook(book.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Supprimer
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "users" && (
                <div>
                    <h2 className="text-2xl font-bold mb-2">Gestion des Utilisateurs</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold">Ajouter un lecteur</h3>
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="border p-1 mr-2"
                        />
                        <button onClick={addUser} className="bg-green-500 text-white px-3 py-1 rounded">
                            Ajouter
                        </button>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2">ID</th>
                            <th className="py-2">Nom d'utilisateur</th>
                            <th className="py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center border-t">
                                <td className="py-2">{user.id}</td>
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">
                                    <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "borrowings" && (
                <div>
                    <h2 className="text-2xl font-bold mb-2">Gestion des Emprunts</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2">ID</th>
                            <th className="py-2">ID Livre</th>
                            <th className="py-2">ID Utilisateur</th>
                            {/* Ajoutez d'autres colonnes selon votre DTO */}
                        </tr>
                        </thead>
                        <tbody>
                        {borrowings.map((borrowing) => (
                            <tr key={borrowing.id} className="text-center border-t">
                                <td className="py-2">{borrowing.id}</td>
                                <td className="py-2">{borrowing.bookId}</td>
                                <td className="py-2">{borrowing.userId}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LibrarianDashboard;
