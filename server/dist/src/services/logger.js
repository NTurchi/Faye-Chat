"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const customForm = winston_1.format.printf(log => {
    return `[${log.timestamp}] - [${log.label}] - ${log.level} => ${log.message}`;
});
exports.logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.label({ label: 'FayeServer' }), winston_1.format.timestamp(), customForm),
    transports: [new winston_1.transports.Console()]
});
