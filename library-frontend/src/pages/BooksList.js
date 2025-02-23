import { useState, useEffect } from "react";
import axios from "axios";

const BooksList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/livres")
            .then(response => setBooks(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Liste des Livres</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="p-2 border-b">
                        {book.titre} - {book.auteur}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksList;
