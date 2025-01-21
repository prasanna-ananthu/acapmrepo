namespace acapm.db;
using { managed, Currency } from '@sap/cds/common';
using { OP_API_PRODUCT_SRV_0001 as prod_api } from '../srv/external/OP_API_PRODUCT_SRV_0001';
// using {Attachments} from '@cap-js/sdm';

entity reqHeader : managed {
    key headerID : UUID;
        prNum : String(10);
        prType : String(40);
        reqNum: String(10) @readonly;
        headerDesc : String;
        totalPrice : Decimal(10,2);
        currency : Currency;
        status : Association to status;
        Items: Composition of  many reqItem on Items.Headers = $self;
        // attachments : Composition of many Attachments;
}
entity reqItem : managed {
    key itemID : UUID;
        prItemNum : String(10);
        purOrg : String;
        material: Association to Materials;
        materialDesc: Association to Materials;
        plant : Association to plants;
        quantity: Integer;
        unitOfMeasure: String;
        unitsPrice: Decimal(10, 2);
        itemPrice:Decimal(10,2);
        status : Association to status;
        Headers : Association to reqHeader;
}
entity status{
    key statusID : UUID;
        statusDesc : String(50);
        statusCode : String;
}
entity Materials as projection on prod_api.A_Product{
        key Product as materialID,
            ProductType as materialDesc
};
entity plants as projection on prod_api.A_ProductPlant{
        key Plant as plant
};

entity notes : managed {
    key noteID : UUID @cuid ;
        noteText : String;
}

// extend reqHeader with {
    
// }

