export interface Car {
    [key: string]: any;
}

export class Car {
    id: number;
    year: number;
    make: string;
    model: string;
    color: string;
    dateAdded: Date;


    constructor(id?: number, year?: number, make?: string, model?: string, color?: string, dateAdded?: Date) {
        this.id = id ?? 0;
        this.year = year ?? 2000;
        this.make = make ?? "";
        this.model = model ?? "";
        this.color = color ?? "";
        this.dateAdded = dateAdded ?? new Date();
    }
}