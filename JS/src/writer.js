import { read, hole } from './reader.js';
import { fileURLToPath } from 'url';
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
__dirname = path.dirname(__dirname)
const fileToTasks = `${__dirname}/data/tasks.json`


export function write(content) {
  if (!content) {
    console.error("Nothing to write.")
    return;
  }
  try {
    const json = read();
    const id = hole();
    let newTask = {
      id: id,
      title: content
    }
    json.tasks.push(newTask)
    fs.writeFileSync(fileToTasks, JSON.stringify(json, null, 2))
    return "File written successfully."
  }
  catch (err) {
    console.error("Error writing file.", err)
    return
  }
}

write("Demo")
