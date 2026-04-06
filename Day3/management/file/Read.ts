import * as fs from "fs";
import { EFile } from '../../enum/EFile';

export default function ReadFile(fileName: string) {
    const filePath = `${EFile.FilePath}/${fileName}.${EFile.JsonType}`;
    const content = fs.readFileSync(filePath);
    return content;
}