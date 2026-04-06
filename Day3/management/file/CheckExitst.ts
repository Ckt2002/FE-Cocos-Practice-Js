import * as fs from 'fs';
import { EFile } from '../../enum/EFile';

export default function CheckExist(fileName: string): boolean {
    const filePath = `${EFile.FilePath}/${fileName}.${EFile.JsonType}`;
    return fs.existsSync(filePath);
}