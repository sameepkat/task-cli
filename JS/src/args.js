import { read } from "./reader.js";
import { write, update, del, markInProgress, markDone } from "./writer.js";

export function argsHandler(input) {
  switch (input[2]) {
    case 'list':
      console.log(input[3])
      console.log(read());
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
