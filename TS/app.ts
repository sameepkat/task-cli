import { argsHandler } from "./utils/args";

const command: Array<string> = process.argv.slice(2);
const noOfArguments: number = command.length;

if (noOfArguments < 1) {
  console.error("Argument error. Use help to get help");
  process.exit(1);
}
argsHandler(command);

