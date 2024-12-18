"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const bump_command_1 = __importDefault(require("./command/bump-command"));
var argv = require('minimist')(process.argv.slice(2));
let privateKey;
if (process.env.PRIVATE_KEY) {
    privateKey = process.env.PRIVATE_KEY;
}
else {
    privateKey = argv.privateKey;
}
const tokenAddress = argv.tokenAddress;
const walletAddress = argv.walletAddress;
const bumper = new bump_command_1.default(privateKey, tokenAddress, walletAddress);
bumper.main();
