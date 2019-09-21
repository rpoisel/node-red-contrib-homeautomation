import { FSM } from "./FSM";
import { IState } from "./IState";
import { StateStop } from "./StateStop";

export class StateMoveUp implements IState {
    public buttonUp(fsm: FSM): void {
        fsm.change(new StateStop());
    }
    public buttonDown(fsm: FSM): void {
        fsm.change(new StateStop());
    }
}
