function hcdtest() {
    //console.log(Processing.prototype);
    //console.log(Processing);
    //console.log(CTWrapper);
    /*
    CTWrapper.prototype.abc = "abc";
    CTWrapper.prototype.f = function() {
        console.log("CTWrapper.prototype.f");
    }
    w = new CTWrapper("123", 100, 200, 200, 202);
    console.log(CTWrapper.prototype);
    //onsole.log(w.prototype); //undefined
    console.log(w.abc);
    w.f();
    w.f = function() {
        console.log("new CTWrapper.prototype.f");
    }
    w.f();*/
    //gClassTest();
    //console.log(this.cc);
    //console.log(cc);
    //TestUDF();
    //testInherits();
    //console.log("in pjstest");
    //toggleDiv();
    //displayTest();
  //  displayTestL();
    //checkCanvas();
    //testsprintf();
    //testchildren();
    alert(123);
    console.log("123");
}

function testchildren() {
    console.log($("#LSCanvasContainer").children().length);
    $("#LSCanvasContainer").empty();
    console.log($("#LSCanvasContainer").children().length);
}
function testsprintf() {
    var s = $.sprintf("%s:%d", "aaa", 123);
    console.log(s);
}
function checkCanvas() {
    console.log($("#LSCanvas").width());
    console.log($("#LSCanvas").height());
    console.log($("#LSCanvas").css("width"));
    console.log($("#LSCanvas").css("height"));
}

function displayTestL() {
    HCD.toggleCSSPropertyValue($("#LSCanvasContainer"), "visibility", "hidden", "visible");
    HCD.toggleCSSPropertyValue($("#TOC"), "visibility", "hidden", "visible");
    $("#LSShowContainer").getNiceScroll().resize();
    console.log($("#LSCanvas").css("display"));
    console.log($("#TOC").css("display"));
}
function displayTest() {
    HCD.toggleCSSPropertyValue($("#showInfoDiv"), "display", "none", "block");
    HCD.toggleCSSPropertyValue($("#confInfoDiv"), "display", "none", "block");
    console.log($("#showInfoDiv").css("display"));
    console.log($("#confInfoDiv").css("display"));
}
function toggleDiv() {
    var d1 = $(".d1");
    var d2 = $(".d2");
    console.log(d1.css("zIndex"));
    d1.css("zIndex", 1-d1.css("zIndex"));
    d2.css("zIndex", 1-d2.css("zIndex"));
}
function testInherits() {
    //console.log(Class.extend);
    //console.log(RootLesseo);
    var r = new RootLesseo(666);
    r.draw();
    var c = new ChildLesseo(888);
    c.draw();
    console.log(c);
    console.log(ChildLesseo.prototype);
}

function TestUDF() {
    console.log("arguments.callee");
    myf();
    console.log("after");
}
function ProcessingLSTest() {
}

function gClassTest() {
    this.cc = 133;
    console.log(this.cc);
    console.log(cc);
    cc = 134;
    console.log(this.cc);
    console.log(cc);
}
function randomText(){
	var arrs=HCD.random(5,0,1000);
	alert(arrs[0]);
}
