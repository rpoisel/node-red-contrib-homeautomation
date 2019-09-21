import { FSM } from "./FSM";

export interface IState {
    buttonUp(fsm: FSM): void;
    buttonDown(fsm: FSM): void;
}
