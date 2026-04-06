import AllBorrows from "../../data/AllBorrow";
import { EFileName } from "../../enum/EFileName";
import WriteFile from "../file/Write";

export default function SaveBorrow(allBorrows: AllBorrows) {
    const jsonContent = JSON.stringify(allBorrows, null, '\t');
    WriteFile(EFileName.Borrow, jsonContent);
}