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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const parser_1 = require("./parser");
const utils_1 = require("./utils");
const assetsPath = path.join(__dirname, './assets/');
const docxReg = /.docx$/;
const defaultTemplatePath = path.join(assetsPath, 'template/base.template.html');
const compiledToHtml = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = options.templatePath || defaultTemplatePath;
    const items = yield parser_1.docxParser(options.targetPath);
    const htmlTemp = yield utils_1.readFile(templatePath);
    const compiled = lodash_1.default.template(htmlTemp);
    let baseName = path.basename(options.targetPath);
    baseName = baseName.replace(docxReg, '');
    const htmlStr = compiled({ items: items, baseName: baseName });
    const writePath = path.resolve(`${baseName}.html`);
    if (options.isWirteFile) {
        utils_1.writeFile(writePath, htmlStr);
    }
    else {
        return { htmlStr };
    }
});
exports.compiledToHtml = compiledToHtml;
const docxtohtml = (options) => __awaiter(void 0, void 0, void 0, function* () {
    let defaultOptions = {
        targetPath: path.join(assetsPath, 'test.docx'),
        templatePath: defaultTemplatePath,
        isWirteFile: true,
        recursionFlag: false
    };
    defaultOptions = Object.assign(defaultOptions, options);
    if (yield utils_1.isDirectory(defaultOptions.targetPath)) {
        const docxFiles = utils_1.readFileByDirectory(defaultOptions.targetPath, defaultOptions.recursionFlag, docxReg);
        docxFiles.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield compiledToHtml({
                targetPath: item,
                isWirteFile: defaultOptions.isWirteFile,
                templatePath: defaultOptions.templatePath,
            });
        }));
    }
    else {
        if (yield utils_1.isFile(defaultOptions.targetPath)) {
            yield compiledToHtml(defaultOptions);
        }
        else {
            console.error('参数无效');
        }
        return;
    }
});
exports.docxtohtml = docxtohtml;
