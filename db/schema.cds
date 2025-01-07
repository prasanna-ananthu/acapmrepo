namespace acapm.db;
using { managed, Currency } from '@sap/cds/common';
using { OP_API_PRODUCT_SRV_0001 as prod_api } from '../srv/external/OP_API_PRODUCT_SRV_0001';

entity reqHeader : managed {
    key headerID : UUID;
        prNum : String(10);
        prType : String(40);
        reqNum: String(10) @readonly;
        headerDesc : String;
        totalPrice : Decimal;
        currency : Currency;
        status : Association to status;
        Items: Composition of  many reqItem on Items.Headers = $self;
        Files: Composition of  many attachments on Files.Header = $self;
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
        price: Decimal(10, 2);
        status : Association to status;
        Headers : Association to one reqHeader;
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

// entity notes : managed {
//     key noteID : UUID @cuid ;
//         noteText : String;
// }

entity attachments: managed {
    key attachmentID : UUID @cuid ;
        attachmentType : String;
        Header: Association to reqHeader;
}
