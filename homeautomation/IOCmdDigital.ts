import { IOCmd } from "./IOCmd";

export class IOCmdDigital extends IOCmd {
    private value: boolean;
    constructor(source: string, value: boolean) {
        super(source);
        this.value = value;
    }
    public getValue(): boolean {
        return this.value;
    }
}
