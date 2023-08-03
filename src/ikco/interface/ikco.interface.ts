import { Content } from "./content.interface";

export interface ikco {
    _id: string;
    car_name: string;
    Mechanicals: Content[];
    Injector: Content[];
    Engine: Content[];
    Air_bag: Content[];
    Wiring: Content[];
}
