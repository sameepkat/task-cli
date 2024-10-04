import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { parse } from 'path'
import Table from "cli-table";
import colors from 'colors';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
__dirname = path.dirname(__dirname)
const fileToTasks = `${__dirname}/data/tasks.json`


export function convertToTable(obj) {
  try {
    const table = new Table({ head: ["ID".blue, "Title".blue, "Status".blue, "createdAt".blue] });
    const allTasks = obj;
    allTasks.forEach(task => {
      let taskData = [];
      taskData.push(task.id);
      taskData.push(task.title);
      taskData.push(task.status);
      taskData.push(task.createdAt);
      table.push(taskData);
      taskData = []
    })
    return (table.toString());
  } catch {
    console.error("Error reading data. Verify that data/tasks.json exists ")
  }
}


export function read(filter) {
  try {
    const data = fs.readFileSync(fileToTasks, 'utf8');
    const parsedData = JSON.parse(data);
    switch (filter) {
      case 'done':
        return (parsedData.tasks.filter(task => task.status == 'Done'))
      case 'progress':
        return (parsedData.tasks.filter(task => task.status == 'Progress'))
      case 'todo':
        return (parsedData.tasks.filter(task => task.status == 'Todo'))
      default:
        return (parsedData.tasks)
    }
  } catch (err) {
    console.error("Error reading file", err);
    return;
  }
}

export function hole() {
  const json = read();
  let existingIDs = [];
  try {
    const length = json.tasks.length
    for (let i = 0; i < length; i++) {
      existingIDs.push(json.tasks[i].id)
    }
  } catch {
    return 0;
  }
  if (existingIDs.length == 0) {
    return 0;
  }
  let i = 0;
  for (i = 0; i <= Math.max(...existingIDs); i++) {
    if (!existingIDs.includes(i)) {
      return i;
    }
  }
  return i++;
}


