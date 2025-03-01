import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFolderStructure = (dir, ignore = ["node_modules", ".git"]) => {
  const result = {};

  fs.readdirSync(dir).forEach((file) => {
    if (ignore.includes(file)) return;

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result[file] = getFolderStructure(filePath, ignore);
    } else {
      result[file] = "file";
    }
  });

  return result;
};

// Jalankan dan cetak hasilnya
console.log(JSON.stringify(getFolderStructure(__dirname), null, 2));
