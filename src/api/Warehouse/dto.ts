export interface WarehouseItem {

    id: number;
    name: string;
    location: string;
    totalParts: number;

}

export class AddWarehouseDto {
    name: string = '';
    location: string = '';
}