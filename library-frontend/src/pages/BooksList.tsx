import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    available: boolean;
}

interface Borrowing {
    id: number;
    bookId: number;
    userId: number;
    borrowDate: Date;
    returnDate: Date;
}

const userId = 3;

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.get<Book[]>("http://localhost:8088/api/books", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
            setError("Erreur lors de la récupération des livres.");
        } finally {
            setLoading(false);
        }
    };

    const fetchBorrowingHistory = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.get<Borrowing[]>(
                `http://localhost:8088/api/borrowings/history/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setBorrowings(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique :", error);
            setError("Erreur lors de la récupération de l'historique.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchBooks();
            await fetchBorrowingHistory();
        };
        fetchData();
    }, []);

    const handleBorrow = async (bookId: number) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error("Aucun token d'authentification trouvé.");
            setError("Aucun token d'authentification trouvé.");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:8088/api/borrowings",
                { bookId, userId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log("Livre emprunté :", response.data);
            await fetchBooks();
            await fetchBorrowingHistory();
        } catch (error) {
            console.error("Erreur lors de l'emprunt :", error);
            setError("Erreur lors de l'emprunt.");
        }
    };

    const handleReturn = async (borrowingId: number) => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.put(`http://localhost:8088/api/borrowings/return/${borrowingId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Livre retourné :", response.data);
            await fetchBooks();
            await fetchBorrowingHistory();
        } catch (error) {
            console.error("Erreur lors du retour :", error);
            setError("Erreur lors du retour.");
        }
    };

    const handleConsult = (book: Book) => {
        alert(
            `Détails du livre:\nTitre : ${book.title}\nAuteur : ${book.author}\nGenre : ${book.genre}\nDisponible : ${
                book.available ? "Oui" : "Non"
            }`
        );
    };

    const getBorrowingForBook = (bookId: number): Borrowing | undefined => {
        const borrowing = borrowings.find((b) => b.bookId === bookId);
        console.log(`Recherche d'emprunt pour le livre ${bookId} :`, borrowing); // Ajoutez cette ligne
        return borrowing;
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Liste des livres</h2>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">Titre</th>
                    <th className="py-2">Auteur</th>
                    <th className="py-2">Genre</th>
                    <th className="py-2">Disponibilité</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => {
                    const borrowing = getBorrowingForBook(book.id);
                    return (
                        <tr key={book.id} className="text-center border-t">
                            <td className="py-2">{book.title}</td>
                            <td className="py-2">{book.author}</td>
                            <td className="py-2">{book.genre}</td>
                            <td className="py-2">{book.available ? "Oui" : "Non"}</td>
                            <td className="py-2 space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleConsult(book)}
                                >
                                    Consulter
                                </button>
                                {book.available && !borrowing && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleBorrow(book.id)}
                                    >
                                        Emprunter
                                    </button>
                                )}
                                {borrowing && (
    console.log("Borrowing trouvé :", borrowing), // Ajoutez cette ligne pour déboguer
    <button
        className="bg-pink-500 text-white px-3 py-1 rounded"
        onClick={() => handleReturn(borrowing.id)}
    >
        Retourner
    </button>
)}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;