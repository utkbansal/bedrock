;(function($, Mozilla) {
    'use strict';

    function trackDefaultSearchEngine() {
        Mozilla.UITour.getConfiguration('selectedSearchEngine', function (data) {
            var selectedEngineID = data.searchEngineIdentifier;

            if (!selectedEngineID) {
                return;
            }

            if (selectedEngineID === 'yahoo') {
                Mozilla.UITour.setTreatmentTag('srch-chg-treatment', 'firstrun_yahooDefault');
                Mozilla.UITour.setTreatmentTag('srch-chg-action', 'ViewPage');
                gaTrack(['_trackEvent', 'firstrun srch-chg interactions', 'yahooDefault', 'ViewPage']);
            } else {
                Mozilla.UITour.setTreatmentTag('srch-chg-treatment', 'firstrun_otherDefault');
                Mozilla.UITour.setTreatmentTag('srch-chg-action', 'ViewPage');
                gaTrack(['_trackEvent', 'firstrun srch-chg interactions', 'otherDefault', 'ViewPage']);
            }
        });
    }

    //track if this is the first time a user has seen tour
    function trackFirstTimeUse() {
        var firstTime = 'True';
        try {
            if (localStorage.getItem('mozUITourGlobalFlag') === 'taken') {
                firstTime = 'False';
            } else {
                localStorage.setItem('mozUITourGlobalFlag', 'taken');
            }
            gaTrack(['_trackEvent', 'Tour Interaction', 'First Time Seeing Tour', firstTime, 0, true]);
        } catch (e) {}
    }

    //Only run the tour if user is on Firefox 29 for desktop.
    if (window.isFirefox() && !window.isFirefoxMobile() && window.getFirefoxMasterVersion() >= 36) {

        // Query if the UITour API is working before we start the tour
        Mozilla.UITour.getConfiguration('sync', function (config) {

            var tour = new Mozilla.BrowserTour({
                id: $('#tour-page').data('telemetry'),
                allowScroll: true
            });

            tour.init();

            trackFirstTimeUse();
            trackDefaultSearchEngine();
        });
    }

})(window.jQuery, window.Mozilla);
