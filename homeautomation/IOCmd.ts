export class IOCmd {
    private source: string;
    constructor(source: string) {
        this.source = source;
    }
    public getSource(): string {
        return this.source;
    }
}
