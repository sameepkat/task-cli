import { read } from "./reader.js";
import { write, update, del, markInProgress, markDone } from "./writer.js";

export function argsHandler(input) {
  input[2] = input[2].toLowerCase();
  switch (input[2]) {
    case 'list':
      if (!input[3])
        console.log(read());
      else {
        input[3] = input[3].toLowerCase();
        switch (input[3]) {
          case 'done':
            console.log(read('done'));
            break;
          case 'progress':
            console.log(read('progress'));
            break;
          case 'todo':
            console.log(read('todo'));
            break;
          default:
            console.error("Invalid filter. Displaying all");
            console.log(read());
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
    default:
      console.error("Unrecognized command.", input[2])
      break;
  }
}
