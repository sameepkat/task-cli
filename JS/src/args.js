import { read } from "./reader.js";
import { write } from "./writer.js";

export function argsHandler(input) {
  switch (input[2]) {
    case 'list':
      console.log(read());
      break;
    case 'write':
      write(input[3]);
      break;
    default:
      console.error("Unrecognized command.", input[2])
      break;
  }
}
