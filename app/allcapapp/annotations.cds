using MainService as service from '../../srv/Service';

annotate service.reqHeaderSet with @(
    UI.SelectionFields :[
        headerID,
        prNum,
        totalPrice
    ],
    UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General',
            Facets :[
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Header Details',
                    Target : '@UI.Identification'
                }
            ]
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Item Details',
            Target : 'Items/@UI.LineItem'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Attachment Details',
            Target : 'Files/@UI.LineItem'
        }
    ],
    UI.Identification:[
        {
            $Type : 'UI.DataField',
            Label : 'Request Number',
            Value : headerID
        },
        {
            $Type : 'UI.DataField',
            Label : 'Header Description',
            Value : headerDesc
        },
        {
            $Type : 'UI.DataField',
            Label : 'prNum',
            Value : prNum
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Price',
            Value : totalPrice
        },
        {
            $Type : 'UI.DataField',
            Label : 'Request Num',
            Value : reqNum
        }
    ],
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Label : 'Header ID',
            Value : headerID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Header Description',
            Value : headerDesc,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Price',
       	    Value : totalPrice,
        },
    ]
);

annotate service.reqItemSet with @(
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Label : 'Item ID',
            Value : itemID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material ID',
            Value : material_materialID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Plant',
            Value : plant_plant,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Item Price',
            Value : itemPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : quantity,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Units Price',
            Value : unitsPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'UnitsofMeasure',
            Value : unitOfMeasure,
        }
    ],
    UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General',
            Facets :[
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Item Details',
                    Target : '@UI.Identification'
                }
            ],
        },
    ],
    UI.Identification:[
        {
            $Type : 'UI.DataField',
            Label : 'Item Number',
            Value : itemID
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material ID',
            Value : material_materialID
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : quantity
        },
        {
            $Type : 'UI.DataField',
            Label : 'Units Price',
            Value : unitsPrice
        },
        {
            $Type : 'UI.DataField',
            Label : 'Units Of Measure',
            Value : unitOfMeasure
        }
    ]
);
@cds.odata.valuelist
annotate service.materialSet with @(
    // UI.Identification:[{
    //     $Type: 'UI.DataField',
    //     Value: ID,
    // }]
);
// annotate service.InternalNotes with @(
//     UI.LineItem:[
//         {
//             Value : noteText,
//             Label : 'Comments'
//         },
//         {
//             Value : modifiedAt,
//             Label : 'Modified'
//         }
//     ]
// );

annotate service.attachmentSet with @(
    UI.LineItem:[
        {
            $Type : 'UI.DataField',
            Label : 'Attachment ID',
            Value : attachmentID,
        },
    ]
);


