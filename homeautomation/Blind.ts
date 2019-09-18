import { StateStop, FSM } from './States'

export class Blind {
    id: string;
    fsm: FSM;

    constructor(id: string) {
        this.id = id;
        this.fsm = new FSM(new StateStop());
    }
    getId(): string {
        return this.id;
    }
    buttonUp(): void {
        this.fsm.buttonUp();
    }
    buttonDown(): void {
        this.fsm.buttonUp();
    }
}
