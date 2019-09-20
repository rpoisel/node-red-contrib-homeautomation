export class IOCmd {
    source: string;
    constructor(source: string) {
        this.source = source;
    }
}

export class IOCmdDigital extends IOCmd {
    value: boolean;
    constructor(source: string, value: boolean) {
        super(source);
        this.value = value;
    }
}

export class IOMsg {
    payload: IOCmd;
    constructor(payload: IOCmd) {
        this.payload = payload;
    }
}