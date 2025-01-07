sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'acapm.allcapapp',
            componentId: 'reqItemSetObjectPage',
            contextPath: '/reqHeaderSet/Items'
        },
        CustomPageDefinitions
    );
});