const cds = require('@sap/cds');

module.exports = cds.service.impl( async function(){

    const prod_api = await cds.connect.to('OP_API_PRODUCT_SRV_0001');
    // Generic Handlers - on, before, after
    this.on('READ', 'materialSet', (req) => {
        req.query.where("Product <> ''");
        req.query.SELECT.count = false;
        return prod_api.run(req.query);
    });
    
    this.on('READ', 'plantSet', async (req) => {
        // Add filters or specific query logic if needed
        req.query.where("Plant <> ''"); // Example filter: Fetch plants where Plant is not empty
        req.query.SELECT.count = false; // Disable count for performance
        return prod_api.run(req.query); // Forward the query to the external API
    });

    const { reqHeader } = this.entities;
    this.before('CREATE', 'reqHeader', async (req) => {
        const tx = cds.transaction(req);

        // Fetch the latest `reqNum` from the table
        const lastRecord = await tx.run(
            SELECT.one(['reqNum']).from(reqHeader).orderBy('reqNum desc')
        );

        let newReqNum = 'RE00001'; // Default value if no record exists

        if (lastRecord && lastRecord.reqNum) {
            // Extract the numeric part of the last `reqNum` and increment it
            const numericPart = parseInt(lastRecord.reqNum.slice(2), 10); // Remove 'RE' prefix
            const incremented = numericPart + 1;

            // Pad the incremented value with leading zeros to maintain 5 digits
            newReqNum = `RE${String(incremented).padStart(5, '0')}`;
        }

        // Assign the new `reqNum` to the incoming request
        req.data.reqNum = newReqNum;
    });

})