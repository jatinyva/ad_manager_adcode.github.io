var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function () {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
})();

(function () {

    var REFRESH_KEY = "refresh";
    var REFRESH_VALUE = "true";
    var SECONDS_TO_WAIT_AFTER_VIEWABILITY = Math.floor(Math.random() * (35 - 30 + 1)) + 30;
    ;

    function setupGoogleTag() {
        googletag
            .pubads()
            .addEventListener("impressionViewable", function (event) {
                var slot = event.slot;
                if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
                    setTimeout(function () {
                        googletag.pubads().refresh([slot]);
                    }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
                }
            });
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    }

    googletag.cmd.push(function () {
        setupGoogleTag();
    });


    function constructAds() {
        try {


            var allAds = document.querySelectorAll("div[data-adslot]");
            if (allAds.length > 0) {


                allAds.forEach(function (ele) {
                    var adSlot = ele.getAttribute('data-adslot');
                    var adSize = JSON.parse(ele.getAttribute('data-size'));
                    var adType = ele.getAttribute('data-ad-type');
                    var refresh = ele.getAttribute('data-ad-refresh');
                    let r = (Math.random() + 1).toString(36).substring(7);
                    ele.setAttribute('id', r);
                    if (typeof googletag != 'undefined') {


                        googletag.cmd.push(function () {

                            var sizeMap = {
                                Responsive_Ad: googletag
                                    .sizeMapping()
                                    .addSize([992, 0], [[728, 90]])
                                    .addSize([768, 0], [[300, 250]])
                                    .addSize([320, 0], [[300, 250]])
                                    .addSize(
                                        [0, 0],
                                        [
                                            [320, 50],
                                            [1, 1],
                                        ]
                                    )
                                    .build(),
                                Sticky_Ad: googletag
                                    .sizeMapping()
                                    .addSize([992, 0], [[728, 90]])
                                    .addSize([768, 0], [[320, 50]])
                                    .addSize([320, 0], [[320, 50]])
                                    .addSize(
                                        [0, 0],
                                        [
                                            [320, 50],
                                            [1, 1],
                                        ]
                                    )
                                    .build(),
                                Sidebar_Ad: googletag
                                    .sizeMapping()
                                    .addSize([1760, 0], [[300, 600]])
                                    .addSize([1470, 0], [[160, 600]])
                                    .addSize([1380, 0], [[120, 600]])
                                    .addSize([0, 0], [])
                                    .build(),
                                Two_Side_Ad: googletag
                                    .sizeMapping()
                                    .addSize([992, 0], [[300, 250]])
                                    .addSize([768, 0], [[320, 50]])
                                    .addSize([320, 0], [[320, 50]])
                                    .addSize([0, 0], [])
                                    .build()
                            };

                            var adSizeMapping = sizeMap[adType];
                            var slot = googletag.defineSlot(adSlot, adSize, r);

                            if (adSizeMapping) {
                                slot.defineSizeMapping(adSizeMapping);
                            }

                            if (refresh === 'true') {

                                slot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
                            }

                            slot.addService(googletag.pubads());
                        });
                    }

                });
            }
        } catch (e) {
            console.log("constructAd:" + e);
        }
    }

    async function displayAds() {
        try {
            await constructAds();
            var allAds = document.querySelectorAll("div[data-adslot]");
            if (allAds.length > 0) {
                allAds.forEach(function (ele) {
                    var adSlot = ele.getAttribute('data-adslot');
                    var divId = ele.getAttribute('id');
                    if (typeof googletag != 'undefined') {
                        googletag.cmd.push(function () {
                            googletag.display(divId);
                        });
                        ele.removeAttribute('data-adslot');
                    }

                });
            }
        } catch (e) {
            console.log("displayAds:" + e);
        }
    }

    window.addEventListener('DOMContentLoaded', function () {
        displayAds();
    });
})();