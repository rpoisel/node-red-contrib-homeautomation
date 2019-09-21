import { FSM } from "./FSM";
import { IState } from "./IState";
import { StateMoveDown } from "./StateMoveDown";
import { StateMoveUp } from "./StateMoveUp";

export class StateStop implements IState {
    public buttonUp(fsm: FSM): void {
        fsm.change(new StateMoveUp());
    }
    public buttonDown(fsm: FSM): void {
        fsm.change(new StateMoveDown());
    }
}
