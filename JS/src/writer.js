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
    const date = new Date();
    let newTask = {
      id: id,
      description: null,
      status: 'todo',
      createdAt: `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
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

export function update(id, content) {
  if (id == undefined || !content) {
    console.error("Incorrect use of update command");
    return;
  }
  try {
    const json = read();
    json.tasks.forEach(task => {
      if (task.id == id) {
        task.title = content;
      }
    })
    fs.writeFileSync(fileToTasks, JSON.stringify(json, null, 2))
    console.log("Task written successfully");
  } catch {
    console.error("Some kind of error while updating. Debug please")
  }
}

export function markInProgress(id) {
  if (id == undefined) {
    console.error("Invalid ID");
    return;
  }
  try {
    const json = read();
    json.tasks.forEach((task) => {
      if (task.id == id) {
        task.status = "progress"
      }
    })
    fs.writeFileSync(fileToTasks, JSON.stringify(json, null, 2))
    console.log("Task is progress");
  } catch {
    console.error("Some kind of error while marking in progress. Debug please")
  }
}

export function markDone(id) {
  if (id == undefined) {
    console.error("Invalid ID");
    return;
  }
  try {
    const json = read();
    json.tasks.forEach((task) => {
      if (task.id == id) {
        task.status = "done"
      }
    })
    fs.writeFileSync(fileToTasks, JSON.stringify(json, null, 2))
    console.log("Task marked Done");
  } catch {
    console.error("Some kind of error while marking as done. Debug please")
  }
}

export function del(id) {
  if (id == undefined) {
    console.error("Wrong ID");
    return;
  }
  try {
    const json = read();
    json.tasks = json.tasks.filter((task) => {
      return task.id != id;
    })
    fs.writeFileSync(fileToTasks, JSON.stringify(json, null, 2))
    console.log("Task deleted successfully")
  } catch {
    console.error("Some kind of error occured while deleting. Debug please")
  }
}

