import type Provider from './provider.js';
import type Staff from './Staff.js';

export default class PurchaseOrder {
    id: string;
    createdDate: Date;
    idManager: Staff;
    idProvider: Provider;

    constructor(
        id: string,
        createdDate: Date,
        idManager: Staff,
        idProvider: Provider,
    ) {
        this.id = id;
        this.createdDate = createdDate;
        this.idManager = idManager;
        this.idProvider = idProvider;
    }
}
