import { content } from "./content.interface";

export interface ikco {
    _id: string;
    car_name: string;
    Mechanicals: content[];
    Injector: content[];
    Engine: content[];
    Air_bag: content[];
    Wiring: content[];
}
