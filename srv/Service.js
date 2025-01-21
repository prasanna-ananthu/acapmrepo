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

    const { reqHeaderSet, reqItemSet } = this.entities;
    // generating the reqNum 
    this.before('CREATE', 'reqHeaderSet', async (req) => {
        console.log('CREATE event triggered for reqHeader');
        
        const tx = cds.transaction(req);
        console.log("Triggering transaction");
    
        // Fetch the last record sorted by reqNum
        const lastRecord = await tx.run(
            SELECT.from(reqHeaderSet)
                .columns('reqNum')
                .orderBy('reqNum DESC')
                .limit(1)
        );
    
        console.log("Last record:", lastRecord);
    
        let newReqNum = 'RE00001'; // Default for the first record
        if (lastRecord.length > 0 && lastRecord[0].reqNum) {
            const lastReqNum = lastRecord[0].reqNum;
            const numericPart = parseInt(lastReqNum.slice(2), 10); // Get the numeric part
            const incremented = numericPart + 1;
            
            newReqNum = `RE${incremented.toString().padStart(5, '0')}`;
        }
    
        console.log(`Generated new request number: ${newReqNum}`);
        req.data.reqNum = newReqNum; // Assign to the new request
    });

    // Calculate `itemPrice` and 'totalPrice'
    this.after(['CREATE', 'UPDATE'], 'reqHeaderSet', async (req) => {
        console.log("trigger",req);
        const { headerID } = req;
        console.log("headerID",headerID);
        const items = req.Items || []; // Access the Items association directly from the reqHeader object
        console.log('Before', items);
        // Calculate itemPrice and update totalPrice
    let totalPrice = 0;
    items.forEach(item => {
    const quantity = parseFloat(item.quantity || 0);
    const unitsPrice = parseFloat(item.unitsPrice || 0);
     
    item.itemPrice = quantity * unitsPrice;
    totalPrice += item.itemPrice;
    });
     
    console.log("Calculated items with prices:", items);
        console.log("Total price of all items:", totalPrice);

        // Update the totalPrice in the reqHeaderSet in the database
        await UPDATE(reqHeaderSet)
          .set({ totalPrice })
          .where({ headerID });
     
        console.log(`Updated totalPrice for headerID ${headerID}: ${totalPrice}`);
      });
    this.after(['READ'], reqItemSet, (each) => {
      if (each.quantity != null && each.unitsPrice != null) {
        each.itemPrice = each.quantity * each.unitsPrice;
      }
    }); 

    

})