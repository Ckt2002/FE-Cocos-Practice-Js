import AllBooks from "../../data/AllBooks";
import { EFileName } from "../../enum/EFileName";
import WriteFile from "../file/Write";

export default function SaveBook(allBooks: AllBooks): void {
    const jsonContent: string = JSON.stringify(allBooks, null, '\t');
    WriteFile(EFileName.Book, jsonContent);
}