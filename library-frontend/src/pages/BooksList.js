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
    borrowDate: Date ;
    returnDate: Date ;
}

const userId = 1;

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get<Book[]>("http://localhost:8088/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
        }
    };

    const fetchBorrowingHistory = async () => {
        try {
            const response = await axios.get<Borrowing[]>(
                `http://localhost:8088/api/borrowings/history/${userId}`
            );
            setBorrowings(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique :", error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchBorrowingHistory();
    }, []);

    // Emprunter un livre
    const handleBorrow = async (bookId: number) => {
        try {
            const response = await axios.post("http://localhost:8088/api/borrowings", { bookId, userId });
            console.log("Livre emprunté :", response.data);
            fetchBooks();
            fetchBorrowingHistory();
        } catch (error) {
            console.error("Erreur lors de l'emprunt :", error);
        }
    };

    const handleReturn = async (borrowingId: number) => {
        try {
            const response = await axios.put(`http://localhost:8088/api/borrowings/return/${borrowingId}`);
            console.log("Livre retourné :", response.data);
            await fetchBooks();
            await fetchBorrowingHistory();
        } catch (error) {
            console.error("Erreur lors du retour :", error);
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
        return borrowings.find((b) => b.bookId === bookId);
    };

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
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
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
