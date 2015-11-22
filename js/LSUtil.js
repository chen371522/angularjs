var Util=Util||{};
Util.btnTOC2ShowClick = function(caller) {
    if ($(caller).children().first().text() == "TOC")
        $(caller).children().first().text("Show");
    else
        $(caller).children().first().text("TOC");
    Util.TOCxShow();
}
Util.TOCxShow = function() {
    HCD.toggleCSSPropertyValue($("#LSCanvasContainer"), "visibility", "hidden", "visible");
    HCD.toggleCSSPropertyValue($("#TOC"), "visibility", "hidden", "visible");
    $("#LSShowContainer").getNiceScroll().resize();
}
