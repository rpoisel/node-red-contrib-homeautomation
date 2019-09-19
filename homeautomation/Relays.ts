export class Relays {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    getId(): string {
        return this.id;
    }
    writeOutputs(msg: any): void {

    }
}