import { read, convertToTable } from "./reader.js";
import { write, update, del, markInProgress, markDone } from "./writer.js";

export function argsHandler(input) {
  input[2] = input[2].toLowerCase();
  switch (input[2]) {
    case 'list':
      if (!input[3])
        console.log(convertToTable(read()));
      else {
        input[3] = input[3].toLowerCase();
        switch (input[3]) {
          case 'done':
            console.log(convertToTable(read('done')))
            break;
          case 'progress':
            console.log(convertToTable(read('progress')))
            break;
          case 'todo':
            console.log(convertToTable(read('todo')))
            break;
          default:
            console.error("Invalid filter. Displaying all");
            console.log(convertToTable(read()));
            break;
        }
      }
      break;
    case 'write':
      write(input[3]);
      break;
    case 'update':
      update(input[3], input[4]);
      break;
    case 'delete':
      del(input[3])
      break;
    case 'mark-in-progress':
      markInProgress(input[3]);
      break;
    case 'mark-done':
      markDone(input[3]);
      break;
    case 'help':
      help();
      break;
    default:
      console.error("Unrecognized command.", input[2])
      break;
  }
}


function help() {
  console.log(`
                 Help section
_____________________________________________
Usage:     node app.js write "Task 1"


write "{Task name}"           -- add a task
update {id} "{New name}"      -- update an existing task
delete {id}                   -- delete task at that id
mark-in-progress {id}         -- mark the task at that id as progress
mark-done {id}                -- mark the task at that id as done
list                          -- list all the tasks
list todo                     -- list all the task with status todo
list progress                 -- list all the task with status progress
list done                     -- list all the task with status done
help                          -- print this info
`)
}

