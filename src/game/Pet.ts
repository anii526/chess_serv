import { Iterable } from "./Iterable";
/**
 *  Курьер, которым управляет игрок
 */
export class Pet implements Iterable {
    public hp: number;
    public mana: number;
    public inventory: null;
    constructor() {}
    public init() {}
    public update() {}
}
