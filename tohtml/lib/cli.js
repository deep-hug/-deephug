#!/usr/bin/env node
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const utils_1 = require("./utils");
const path = __importStar(require("path"));
const main_1 = require("./main");
const getVersions = () => __awaiter(void 0, void 0, void 0, function* () {
    const packageObj = yield utils_1.readFile(path.join(__dirname, '../package.json'));
    return JSON.parse(packageObj).version;
});
const initCli = () => __awaiter(void 0, void 0, void 0, function* () {
    const version = yield getVersions();
    commander_1.default.version(version);
    commander_1.default.option('-t --template <template>');
    commander_1.default.option('-r --recursive <recursive>');
    commander_1.default.parse(process.argv);
    const workOptions = {};
    if (commander_1.default.args[0]) {
        workOptions.targetPath = commander_1.default.args[0];
    }
    else {
        console.error('参数异常');
        process.exit(1);
    }
    commander_1.default.template && (workOptions.templatePath = commander_1.default.template);
    commander_1.default.recursive && (workOptions.recursionFlag = commander_1.default.recursive);
    main_1.docxtohtml(workOptions);
});
initCli();
