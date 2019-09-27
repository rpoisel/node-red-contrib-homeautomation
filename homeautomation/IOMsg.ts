import { IOCmd } from "./IOCmd";

export class IOMsg {
    public payload: IOCmd[];

    constructor(payload: IOCmd[]) {
        this.payload = payload;
    }
}
