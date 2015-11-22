var CY = CY || {};

CY.simpleRectMovementTOC = function()  {

    $("#btnTOC2Show").click();
    $("#showInfoDiv").empty();
    CY.simpleRectMovement();
}
CY.simpleRectMovement = function()  {
    //ParamLesseo = function(width, height, bgColor, xBegin, xEnd, xStep, x)
    var paramLesseo = new ParamLesseo(200, 200, 202, 0, 200, 2, 10);
    LSPrepare($(".LSUIContainer"), paramLesseo, CY.simpleRectMovementProc);
}

CY.simpleRectMovementProc = function($p) {
	
    lesseoProcInit($p);
    $p.setup = function() {
    	
        $p.preliminarySetup();
        $p.noLoop();
    }
    $p.draw = function() {
    	
        $p.preliminaryDraw();
        $p.background($p.paramLesseo.bgColor, 0);
      //  $p.line($p.x, 0, $p.x, $p.paramLesseo.height);
       $p.rect($p.x,20,30,30);
    
        $p.finalDraw();
    }
}