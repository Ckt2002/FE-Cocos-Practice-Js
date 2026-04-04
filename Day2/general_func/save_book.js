import { createNewFile } from "../file_json.js";

export default function saveBook(books) {
    const jsonContent = JSON.stringify(books, null, '\t');
    createNewFile('Books', jsonContent);
}