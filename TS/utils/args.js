"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsHandler = argsHandler;
function argsHandler(input) {
    switch (input[0]) {
        case 'list':
            console.log("List all data: ", input);
            break;
        case 'write':
            console.log("Writing");
            break;
        case 'update':
            console.log("Updating");
            break;
        case 'delete':
            console.log("Deleting");
            break;
        case 'mark-in-progress':
            console.log("Marking in progress");
            break;
        case 'mark-done':
            console.log("Marking as done");
            break;
        case 'help':
            console.log("Trying to help");
            break;
        default:
            console.error("Unrecognized command. ", input[0]);
            break;
    }
}
