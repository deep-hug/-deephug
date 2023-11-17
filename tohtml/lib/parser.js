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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admZip = require("adm-zip");
const fs = __importStar(require("fs"));
const docxParser = (absoluteWordPath) => __awaiter(void 0, void 0, void 0, function* () {
    const resultList = [];
    return new Promise((resolve, reject) => {
        fs.open(absoluteWordPath, 'r', err => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error(`${absoluteWordPath} 不存在`);
                    reject();
                }
            }
            else {
                const zip = new admZip(absoluteWordPath);
                const contentXml = zip.readAsText('word/document.xml');
                const matchedWP = contentXml.match(/<w:p.*?>.*?<\/w:p>/gi);
                if (matchedWP) {
                    matchedWP.forEach(function (wpItem) {
                        const matchedWT = wpItem.match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
                        let textContent = '';
                        if (matchedWT) {
                            matchedWT.forEach(function (wtItem) {
                                if (wtItem.indexOf('xml:space') === -1) {
                                    textContent += wtItem.slice(5, -6);
                                }
                                else {
                                    textContent += wtItem.slice(26, -6);
                                }
                            });
                            resultList.push(textContent);
                        }
                    });
                    resolve(resultList);
                }
            }
        });
    });
});
exports.docxParser = docxParser;
