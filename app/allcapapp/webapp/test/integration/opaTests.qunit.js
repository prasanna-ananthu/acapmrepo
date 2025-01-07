sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'acapm/allcapapp/test/integration/FirstJourney',
		'acapm/allcapapp/test/integration/pages/reqHeaderSetList',
		'acapm/allcapapp/test/integration/pages/reqHeaderSetObjectPage',
		'acapm/allcapapp/test/integration/pages/reqItemSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, reqHeaderSetList, reqHeaderSetObjectPage, reqItemSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('acapm/allcapapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThereqHeaderSetList: reqHeaderSetList,
					onThereqHeaderSetObjectPage: reqHeaderSetObjectPage,
					onThereqItemSetObjectPage: reqItemSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);