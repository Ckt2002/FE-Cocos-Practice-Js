import * as fs from 'fs';
import { EFile } from '../../enum/EFile';

export default function WriteFile(fileName: string, data: string): void {
    const filePath = `${EFile.FilePath}/${fileName}.${EFile.JsonType}`;
    fs.writeFileSync(filePath, data);
}