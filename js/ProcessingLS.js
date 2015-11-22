//ProcessingLS, by HCD, Mar 2015

function LSPrepare(LSUIContainer, paramLesseo, lesseoProc){
    //extending Processing class to ProcessingLS
    ProcessingLS.prototype = new Processing();
    ProcessingLS.prototype.constructor = ProcessingLS;
    ProcessingLS.prototype.paramLesseo = paramLesseo;
    var pLS = new ProcessingLS(LSUIContainer, lesseoProc);
}

//design a new class called ProcessingLS that inherits from Proessing
function ProcessingLS(UILesseo, lesseoProc){
    this.UILesseo = UILesseo;
    //dynamically create the canvas
    $(UILesseo).find("#LSCanvasContainer").empty();
    $(UILesseo).find("#LSCanvasContainer").append(constructCanvas(this.paramLesseo));
    var canvas = $(UILesseo).find("#LSCanvasContainer").children()[0];
    Processing.call(this, canvas, lesseoProc);
}
function constructCanvas(paramLesseo) {
    var s = $.sprintf("<canvas style='width:%dpx;height:%dpx;'></canvas>",
                     paramLesseo.width, paramLesseo.height);
    return(s);
}
function LSInit($p) {
	this.btnPrevious=$p.UILesseo.find("#btnPrevious")[0];
	this.btnNext=$p.UILesseo.find("#btnNext")[0];
	this.canvasContainer = $p.UILesseo.find("#LSCanvasContainer")[0];
	//this.canvas = $p.UILesseo.find("#LSCanvasContainer").children()[0];
	this.canvas = $(this.canvasContainer).children()[0];
	this.infoContainer = $p.UILesseo.find("#LSInfoContainer")[0];
	this.width=$p.paramLesseo.width;
	this.height=$p.paramLesseo.height;
    //draw a tableArray
    this.drawTableArray = function(x,y,nRow,nCol,cellWidth,cellHeight,
                                  lineWidth,lineColorArr,bgColorArr,array,
                                  textColor,m,n,color) {
        this.drawTable(x,y,nRow,nCol,cellWidth,cellHeight,lineWidth,
                      lineColorArr,bgColorArr);
        for (var j = 1; j <= nRow; j++) {
            for (var i = 1; i <= array.length; i++) {
                var s=$.sprintf("%3d",array[i - 1]);
                $p.textAlign($p.CENTER,$p.CENTER);
                if (i == m || i == n) {
                    $p.Lib.fillArr(color);
                    $p.text(s, ((x + cellWidth/2) + (i - 1) * cellWidth) , 
                        (y + cellHeight/2) + (j - 1) * cellHeight );
                } else {
                    $p.Lib.fillArr(textColor);
                    $p.text(s, ((x + cellWidth/2) + (i - 1) * cellWidth) , 
                        (y + cellHeight/2) + (j - 1) * cellHeight );
                  } 
            }
        }
        
    } 
    //draw a table
    this.drawTable = function(x, y, nRow, nCol, cellWidth, cellHeight,
                            lineWidth, lineColorArr, bgColorArr) {
        $p.Lib.fillArr(bgColorArr);
        $p.Lib.strokeArr(lineColorArr);
        $p.strokeWeight(lineWidth);  
    	var tableWidth = cellWidth * nCol;
		var tableHeight = cellHeight * nRow;
		$p.rect(x, y, tableWidth, tableHeight);
        var y1 = y;
		for (var row = 1; row <= nRow - 1; row++) {
			y1 += cellHeight;
			$p.line(x, y1, x + tableWidth - 1, y1);
		}
        var x1 = x;
		for (var col = 1; col <= nCol - 1; col++) {
			x1 += cellWidth;
			$p.line(x1, y, x1, y + tableHeight);
		}
    }
    this.forward = function() {
        $p.Show.direction = +1;
        $p.redraw();
    };
    this.backward = function() {
        $p.Show.direction = -1;
        $p.redraw();
    };
    this.preliminarySetup = function() {
        $p.UILesseo.find("#TitleBody").text($p.paramLesseo.title);
        $p.size($p.paramLesseo.width, $p.paramLesseo.height);
		$p.Lib.backgroundArr($p.paramLesseo.bgColorArr);
    };
    //去掉了这个函数
//  this.preliminaryDraw = function() {
//  	
//  		 if (this.frameNo == 0 && this.direction == -1) {
//          this.frameNo = this.frameNum;
//          this.x = this.xEnd;
//      } else if (this.frameNo+1 == this.frameNum && this.direction == +1) {
//          this.frameNo = 0;
//          this.x = this.xBegin;
//      } else {
//      
//          this.frameNo += this.direction;
//          this.x += this.direction * this.xStep;
//      }
//  	
//  };
    this.finalDraw = function() {
        this.showInfo();
    };
    this.showInfo = function () {
        var showInfoDiv = $p.UILesseo.find("#showInfoDiv")[0];
        $(showInfoDiv).append(this.infoItemWrapper());
        $p.LS.infoContainer.scrollTop = $p.LS.infoContainer.scrollHeight;
        $($p.UILesseo.find("#FrameNo")[0]).children().first().text(
        		$.sprintf("%d/%d", this.frameNo+1, this.frameNum));
    };
    this.infoItemWrapper = function() {
        return '<div class="infoItem infoItem' + 
            (($p.Show.direction == +1) ? 'F' : 'B') +
            '">' + this.infoItemContent() + '</div>';
    };
    this.infoItemContent = function() {
       // return 'x='+this.x;
    };
    this.flipTOC2Show = function () {
        console.log(this);
    };
    (function() {
        $p.LS.btnPrevious.onclick = $p.LS.backward;
        $p.LS.btnNext.onclick = $p.LS.forward;
    })();
}
//should be executed as the 1st statement in a show proc
function lesseoProcInit($p) {
	$p.Lib={}; //lib functions added in processingLS
	LibInit.call($p.Lib,$p);
	$p.LS={}; //functions closed related to processingLS UI
	LSInit.call($p.LS,$p);
	$p.Show={}; //functions specific to a show
	ShowInit.call($p.Show,$p);
}
var ParamLesseo = function(title, width, height, bgColorArr) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.bgColorArr = bgColorArr; //RGBA, 3 or 4 elements
}

//Lib functions in processingLS
function LibInit($p) {
	this.backgroundArr = function(rgbArr) {
		if (rgbArr.length == 3)
			$p.background(rgbArr[0], rgbArr[1], rgbArr[2]);
		else //rgbArr.length == 4, with opacity
			$p.background(rgbArr[0], rgbArr[1], rgbArr[2], rgbArr[3]);
	}
	this.fillArr = function(rgbArr) {
		if (rgbArr.length == 3)
			$p.fill(rgbArr[0], rgbArr[1], rgbArr[2]);
		else //rgbArr.length == 4, with opacity
			$p.fill(rgbArr[0], rgbArr[1], rgbArr[2], rgbArr[3]);
	}
	this.strokeArr = function(rgbArr) {
		if (rgbArr.length == 3)
			$p.stroke(rgbArr[0], rgbArr[1], rgbArr[2]);
		else //rgbArr.length == 4, with opacity
			$p.stroke(rgbArr[0], rgbArr[1], rgbArr[2], rgbArr[3]);
	}
}

//Initializing elements for a show
function ShowInit($p) {
	(function() {
		$p.Show.firstRun=true;
		$p.Show.stepStack=new PLS.Stack();
    	$p.Show.direction=+1;
	})();
}
