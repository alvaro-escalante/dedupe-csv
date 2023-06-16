"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deduper = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const json2csv_1 = require("json2csv");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const { cyan, yellow, green } = chalk_1.default;
const writeCSV = (dest, data) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = Object.keys(data[0]);
    const opts = { fields };
    try {
        const parser = new json2csv_1.Parser(opts);
        const csv = parser.parse(data);
        yield (0, promises_1.writeFile)(dest, csv);
    }
    catch (err) {
        throw new ReferenceError(err);
    }
});
const Deduper = (column, file, logger = console.log) => __awaiter(void 0, void 0, void 0, function* () {
    const json = [];
    const unique = new Set();
    let counter = 0;
    console.log(cyan('Working...'));
    const filePath = (0, path_1.resolve)(__dirname, file); // Resolve the absolute file path
    (0, fs_1.createReadStream)(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('error', (error) => console.log(error))
        .on('data', (data) => {
        if (!unique.has(data[column])) {
            unique.add(data[column]);
            json.push(data);
        }
        else {
            counter++;
        }
    })
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        if (counter > 0) {
            const plural = counter > 1 ? 's' : '';
            yield writeCSV(`${file.split('.csv')[0]}_dedupped.csv`, json);
            console.log(yellow.bold(`${counter.toString()} duplicate${plural} found`));
        }
        else {
            console.log(green.bold('No duplicates found'));
        }
    }));
});
exports.Deduper = Deduper;
// Read command-line arguments and call Deduper
const column = process.argv[2];
const file = process.argv[3];
(0, exports.Deduper)(column, file);
//# sourceMappingURL=index.js.map