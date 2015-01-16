/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// create namespace
if (typeof Mozilla == 'undefined') {
    var Mozilla = {};
}

Mozilla.SVGAnimCheck = function() {
    var isOldIE = /MSIE/.test(navigator.userAgent);
    var isIE = /Trident|Edge/.test(navigator.userAgent);
    var isOldOpera= /Presto/.test(navigator.userAgent);

    return Mozilla.SVGAnimCheck.supportsInlineSVG() && !isOldIE && !isIE && !isOldOpera;
};

Mozilla.SVGAnimCheck.supportsInlineSVG = function () {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
};

