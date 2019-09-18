export interface State {
    buttonUp(fsm: FSM): void;
    buttonDown(fsm: FSM): void;
}

export class FSM {
    curState: State;
    constructor(initState: State) {
        this.curState = initState;
    }
    buttonUp(): void {
        this.curState.buttonUp(this);
    }
    buttonDown(): void {
        this.curState.buttonDown(this);
    }
    change(newState: State): void {
        this.curState = newState;
    }
}

export class StateMoveUp implements State {
    buttonUp(fsm: FSM): void {
        fsm.change(new StateStop());
    }
    buttonDown(fsm: FSM): void {
        fsm.change(new StateStop());
    }
}

export class StateMoveDown implements State {
    buttonUp(fsm: FSM): void {
        fsm.change(new StateStop());
    }
    buttonDown(fsm: FSM): void {
        fsm.change(new StateStop());
    }
}

export class StateStop implements State {
    buttonUp(fsm: FSM): void {
        fsm.change(new StateMoveUp());
    }
    buttonDown(fsm: FSM): void {
        fsm.change(new StateMoveDown());
    }

}