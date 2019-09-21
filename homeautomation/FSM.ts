import { IState } from "./IState";

export class FSM {
    private curState: IState;
    constructor(initState: IState) {
        this.curState = initState;
    }
    public buttonUp(): void {
        this.curState.buttonUp(this);
    }
    public buttonDown(): void {
        this.curState.buttonDown(this);
    }
    public change(newState: IState): void {
        this.curState = newState;
    }
}
