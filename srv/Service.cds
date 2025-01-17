using { acapm.db } from '../db/schema';

service MainService @(path:'mainservice') {

    entity reqHeaderSet @(odata.draft.enabled:true) as projection on db.reqHeader{
        *,
        Items
    };
    entity reqItemSet as projection on db.reqItem;
    entity materialSet as projection on db.Materials;
    entity plantSet as projection on db.plants;
    // entity attachmentSet as projection on db.attachments;
    // entity InternalNotes as projection on db.notes;
}