import { FSM } from "./FSM";
import { StateStop } from "./StateStop";

export class Blind {
    private fsm: FSM;

    constructor() {
        this.fsm = new FSM(new StateStop());
    }
    public buttonUp(): void {
        this.fsm.buttonUp();
    }
    public buttonDown(): void {
        this.fsm.buttonUp();
    }
}
