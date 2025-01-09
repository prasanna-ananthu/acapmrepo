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
    
})