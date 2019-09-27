export class IOCmd {
    public srcNode: string;
    public srcIo: string;
    public value: any;

    constructor(srcNode: string, srcIo: string, value: any) {
        this.srcNode = srcNode;
        this.srcIo = srcIo;
        this.value = value;
    }
}
