import { argsHandler } from "./src/args.js";

const command = process.argv
const noOfArguments = command.length;

if (noOfArguments <= 2) {
  console.error("Arg error. Use help to get help.")
  process.exit(1);
}
else {
  argsHandler(command);
}

