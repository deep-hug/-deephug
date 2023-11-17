export declare type Options = {
    urlsafe?: boolean;
};
export default class Base64 {
    private KEY;
    private SAFEKEY;
    private options;
    private diyFlag;
    constructor(options?: Options);
    private utf8Encode;
    private utf8Decode;
    encode(encodeStr: string): string;
    decode(decodeStr: string): string;
    setKey(keyStr: string): void;
}
