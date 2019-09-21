import { IOCmd } from "./IOCmd";

export class IOMsg {
    private payload: IOCmd;
    constructor(payload: IOCmd) {
        this.payload = payload;
    }
    public getPayload(): IOCmd {
        return this.payload;
    }
}
