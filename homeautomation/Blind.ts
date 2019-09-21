import { FSM } from "./FSM";
import { StateStop } from "./StateStop";

export class Blind {
    private id: string;
    private fsm: FSM;

    constructor(id: string) {
        this.id = id;
        this.fsm = new FSM(new StateStop());
    }
    public getId(): string {
        return this.id;
    }
    public buttonUp(): void {
        this.fsm.buttonUp();
    }
    public buttonDown(): void {
        this.fsm.buttonUp();
    }
}
