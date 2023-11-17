"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFile = (path, options) => {
    const o = Object.assign({ encoding: 'utf8' }, options);
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path, o, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.readFile = readFile;
const writeFile = (path, data, options) => {
    const o = Object.assign({ encoding: 'utf8' }, options);
    return new Promise((resolve) => {
        fs_1.default.writeFile(path, data, o, (err) => {
            err && console.log(err);
            resolve(!err);
        });
    });
};
exports.writeFile = writeFile;
const isDirectory = (path) => {
    return new Promise((resolve) => {
        try {
            fs_1.default.stat(path, (err, stat) => {
                resolve(stat && stat.isDirectory());
            });
        }
        catch (err) {
            resolve(false);
        }
    });
};
exports.isDirectory = isDirectory;
const isFile = (path) => {
    return new Promise((resolve) => {
        try {
            fs_1.default.stat(path, (err, stat) => {
                resolve(stat && stat.isFile());
            });
        }
        catch (err) {
            resolve(false);
        }
    });
};
exports.isFile = isFile;
const mkdir = (path) => {
    return new Promise((resolve) => {
        fs_1.default.mkdir(path, { recursive: true }, (err) => {
            resolve(!err);
        });
    });
};
exports.mkdir = mkdir;
const readFileByDirectory = (dirName, recursionFlag = true, regStr) => {
    const filesList = [];
    const readFileList = (dir, flag, reg) => {
        const files = fs_1.default.readdirSync(dir);
        files.forEach((item) => {
            const fullPath = path_1.default.join(dir, item);
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                flag && readFileList(path_1.default.join(dir, item), flag, reg);
            }
            else {
                const extName = path_1.default.extname(fullPath);
                if (reg) {
                    if (reg.test(extName)) {
                        filesList.push(fullPath);
                    }
                }
                else {
                    filesList.push(fullPath);
                }
            }
        });
    };
    readFileList(dirName, recursionFlag, regStr);
    return filesList;
};
exports.readFileByDirectory = readFileByDirectory;
