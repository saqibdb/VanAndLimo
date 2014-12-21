$(document).ready(function(){
    //function init_map() {
    //    var myOptions = {zoom: 14, center: new google.maps.LatLng(39.290598, -76.609619), mapTypeId: google.maps.MapTypeId.ROADMAP};
    //    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    //    /*marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(40.805478, -73.96522499999998)});
    //    infowindow = new google.maps.InfoWindow({content: "<b>Baltimore</b><br/>2880 Broadway<br/> New York" })
    //    ;
    //    google.maps.event.addListener(marker, "click", function () {
    //        infowindow.open(map, marker);
    //    });
    //    infowindow.open(map, marker);*/
    //}
    //google.maps.event.addDomListener(window, 'load', init_map);
    //
    //
    //var rad = function(x) {
    //    return x * Math.PI / 180;
    //};
    //
    //var getDistance = function(p1, p2) {
    //    var R = 6378137; // Earth’s mean radius in meter
    //    var dLat = rad(p2.lat() - p1.lat());
    //    var dLong = rad(p2.lng() - p1.lng());
    //    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    //            Math.sin(dLong / 2) * Math.sin(dLong / 2);
    //    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //    var d = R * c;
    //    return d; // returns the distance in meter
    //};

});

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {

        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);