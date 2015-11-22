//ProcessingLS shows, by HCD, Mar 2015

//define a namespace
var PLS = PLS || {};

//line movement
PLS.simpleLineMovementTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.simpleLineMovement();
}
PLS.simpleLineMovement = function() {
	var paramLesseo = new ParamLesseo("Simple Line Movement",
		200, 200, [255, 255, 255]);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.simpleLineMovementProc);
}
PLS.simpleLineMovementProc = function($p) {
	lesseoProcInit($p);
	$p.setup = function() {
		$p.LS.preliminarySetup();
		$p.Show.x = 20;
		$p.Show.xStep = 10;
		$p.noLoop();
	}
	$p.draw = function() {
		//替代了以前的frameNUM功能
		if ($p.Show.firstRun) {
			$p.line($p.Show.x, 0, $p.Show.x, $p.LS.height);
			$p.Show.firstRun = false;
		} else if ($p.Show.direction == +1 && $p.Show.x>$p.LS.width) {
			$p.Show.x=0;
		} else if ($p.Show.direction == -1 && $p.Show.x<0) {
			$p.Show.x=$p.LS.width;
		} else {
			$p.Show.x += $p.Show.direction * $p.Show.xStep;
		}
		$p.Lib.backgroundArr($p.paramLesseo.bgColorArr);
		$p.line($p.Show.x, 0, $p.Show.x, $p.LS.height);
	    $p.LS.finalDraw();
	}
	$p.LS.infoItemContent = function() {
		return 'x='+$p.Show.x;
	}
}
//sine wave
PLS.sineWaveTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.sineWave();
}
PLS.sineWave = function() {
	var paramLesseo = new ParamLesseo("Sine Wave",
		400, 500, 202);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.sineWaveProc);
}
PLS.sineWaveProc = function($p) {
		lesseoProcInit($p);
		$p.setup = function() {
			$p.LS.preliminarySetup();
			$p.Show.x=20;
			$p.Show.xStep=10;
			$p.Show.xBegin=20;
			$p.background(0);
			$p.Show.radius = 6;
			// $p.fill(96);
			$p.noLoop();
		}
		$p.draw = function() {
			if($p.Show.firstRun){
				$p.Show.alpha = Math.PI * 2 / ($p.paramLesseo.width * 0.8) * ($p.Show.x - $p.Show.xBegin);
				$p.Show.y = $p.paramLesseo.height / 2 -
					$p.paramLesseo.height / 2 * 0.8 * Math.sin($p.Show.alpha);
				$p.Show.stepStack.push([$p.Show.x, $p.Show.y, $p.Show.radius, $p.Show.radius]);
				$p.ellipse($p.Show.x, $p.Show.y, $p.Show.radius, $p.Show.radius);
				$p.Show.firstRun = false;
				
			}else{
				if($p.Show.direction == +1 && $p.Show.x>$p.LS.width){
					$p.Show.x=0;
				}else{
					$p.Show.x += $p.Show.direction * $p.Show.xStep;
				}
			}
			$p.Show.alpha = Math.PI * 2 / ($p.paramLesseo.width * 0.8) 
							* ($p.Show.x - $p.Show.xBegin);
			$p.Show.y = $p.paramLesseo.height / 2 -
				$p.paramLesseo.height / 2 * 0.8 * Math.sin($p.Show.alpha);
			if ($p.Show.direction == 1) {
				$p.fill(255);
				$p.noStroke();
				$p.Show.stepStack.push([$p.Show.x, $p.Show.y, $p.Show.radius, $p.Show.radius]);
				$p.ellipse($p.Show.x, $p.Show.y, $p.Show.radius, $p.Show.radius);
			}else{
				if($p.Show.x>0){
					var arr = $p.Show.stepStack.pop();
					$p.fill(0);
					$p.ellipse(arr[0], arr[1], arr[2] + 1, arr[3] + 1);
				}
			}
			$p.LS.finalDraw();

		}
		$p.LS.infoItemContent = function() {
			return $.sprintf("x=%d, alpha=%5.1f, y=%5.1f", $p.Show.x,
				$p.Show.alpha * 180 / Math.PI, $p.Show.y);
		}

	}
	//Bubble Sort

PLS.bubbleSortTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.bubbleSort();
}
PLS.bubbleSort = function() {
	//ParamLesseo = function(width, height, bgColor, xBegin, xEnd, xStep, x)
	var paramLesseo = new ParamLesseo("Bubble Sort",
		600, 600, 202, 20, 900, 50, 20);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.bubbleSortProc);
}

PLS.bubbleSortProc = function($p) {
	lesseoProcInit($p);
	$p.setup = function() {
		$p.Show.arrs = HCD.random(5,0,1000);
		$p.Show.length = $p.Show.arrs.length;
		$p.Show.inner = 0;//内层循环的控制变量
		$p.Show.outer = $p.Show.length;//外层循环的控制变量
		$p.Show.x=0;//表格开始的起始x坐标
		$p.Show.y=0;//表格开始的y坐标
		$p.Show.y1=0;//变换的y坐标
		$p.Show.yStep=60;//y坐标变化的步长
		$p.Show.width=50;//表格的宽度
		$p.Show.height=50;//表格的高度
		$p.noLoop();
	}
	$p.draw = function() {
		if($p.Show.firstRun){//判断是否是第一次
			$p.textSize(15);
			//$p.fill(0);
			$p.LS.drawTable($p.Show.x,$p.Show.y,1,5,$p.Show.width,$p.Show.height);
			for (var i = 1; i <= $p.Show.arrs.length; i++) {
				$p.fill(0);
				var s=$.sprintf("%d",$p.Show.arrs[i - 1])
				$p.text(s, ($p.Show.x + (i-1) * $p.Show.width) , ($p.Show.y + $p.Show.height) / 2);
			}
			$p.Show.firstRun = false;
		}else{
			$p.Show.y1 += $p.Show.direction * $p.Show.yStep;
			$p.textSize(15);
			if($p.Show.outer>=2){//控制的外层循环
				if($p.Show.inner<$p.Show.outer-1){//控制的内层循环
					if($p.Show.arrs[$p.Show.inner] > $p.Show.arrs[$p.Show.inner + 1]){//交换的时候
						HCD.swap($p.Show.arrs, $p.Show.inner, $p.Show.inner + 1);
						$p.fill(255);
						//应该在这里加入控制canvas的高度，但是没有实现
						$p.LS.drawTable($p.Show.x,$p.Show.y1+$p.Show.y,1,5,$p.Show.width,$p.Show.height);
						for(var i=1;i<=$p.Show.arrs.length;i++){//循环输出数据
							if (i-1 == $p.Show.inner || i - 1 == $p.Show.inner + 1) {//颜色的控制
								$p.fill(255,0,0);
								$p.text($p.Show.arrs[i - 1], ($p.Show.x + (i-1) * $p.Show.width) , ($p.Show.y + $p.Show.height) / 2+$p.Show.y1+$p.Show.y);
							}else{
								$p.fill(0);
								$p.text($p.Show.arrs[i - 1], ($p.Show.x + (i-1) * $p.Show.width) , ($p.Show.y + $p.Show.height) / 2+$p.Show.y1+$p.Show.y);
							}
						}
					}else{//不交换的时候
						$p.fill(255);
						$p.LS.drawTable($p.Show.x,$p.Show.y1+$p.Show.y,1,5,$p.Show.width,$p.Show.height);
						for(var i=1;i<=$p.Show.arrs.length;i++){
							if (i-1 == $p.Show.inner || i - 1 == $p.Show.inner + 1) {//颜色的控制
								$p.fill(255,0,0);
								$p.text($p.Show.arrs[i - 1], ($p.Show.x + (i-1) * $p.Show.width) , ($p.Show.y + $p.Show.height) / 2+$p.Show.y1+$p.Show.y);
							}else{
								$p.fill(0);
								$p.text($p.Show.arrs[i - 1], ($p.Show.x + (i-1) * $p.Show.width) , ($p.Show.y + $p.Show.height) / 2+$p.Show.y1+$p.Show.y);
							}
						}
					}
					$p.Show.inner++;//内层变量在每一趟循环中都改变
				}else{//完成一趟循环的变量改变
					$p.Show.outer--;
					$p.Show.inner=0;
					$p.fill(0);
					var o=$p.Show.arrs.length-$p.Show.outer;
					$p.text("第"+o+"趟排序", $p.Show.x,($p.Show.y + $p.Show.height) / 2+$p.Show.y+$p.Show.y1);
				}
				
			}
		}
	}


}

//canvas sizing test
PLS.canvasSizingTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.canvasSizing();
}
PLS.canvasSizing = function() {
	var paramLesseo = new ParamLesseo("Canvas Sizing",
		200, 200, [255, 255, 255]);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.canvasSizingProc);
}
PLS.canvasSizingProc = function($p) {
	lesseoProcInit($p);
	$p.setup = function() {
		$p.LS.preliminarySetup();
		$p.Show.xStep = 20;
		$p.Show.yStep = 30;
		$p.line(30, 20, 50, 70);
		$p.noLoop();
	}
	$p.draw = function() {
		if ($p.Show.firstRun) {
			$p.Show.firstRun = false;
		} else if ($p.Show.direction == +1) {
			$p.size($p.width + $p.Show.xStep, $p.height + $p.Show.yStep);
		} else {
			$p.size($p.width - $p.Show.xStep, $p.height - $p.Show.yStep);
		}
		$($p.LS.canvasContainer).getNiceScroll().resize();
	    $p.LS.finalDraw();
	}
	$p.LS.infoItemContent = function() {
		return $.sprintf("width=%d, height=%5.1f", $p.width, $p.height);
	}
}

//canvas sizing test
PLS.tableTestTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.tableTest();
}
PLS.tableTest = function() {
	var paramLesseo = new ParamLesseo("Table test",
		200, 200, [255, 255, 255]);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.tableTestProc);
}
PLS.tableTestProc = function($p) {
	lesseoProcInit($p);
	$p.setup = function() {
		$p.LS.preliminarySetup();
		$p.LS.drawTable(10, 5, 2, 3, 50, 50, 1, [255, 0, 0], [0, 255, 0]);
	}
}
//draw a tableArray
PLS.tableArrayTestTOC = function() {
	$("#btnTOC2Show").click();
	$("#showInfoDiv").empty();
	PLS.tableArrayTest();
}
PLS.tableArrayTest = function() {
	var paramLesseo = new ParamLesseo("Table test",
		200, 200, [255, 255, 255]);
	LSPrepare($(".LSUIContainer"), paramLesseo, PLS.tableArrayTestProc);
}
PLS.tableArrayTestProc = function($p) {
	lesseoProcInit($p);
	$p.setup = function() {
		$p.LS.preliminarySetup();
		$p.LS.drawTableArray(10, 5, 2, 3, 50, 50, 1, [255, 0, 0], [0, 255, 0],[234,34,56],[0,0,0],1,3,[255,0,0]);
	}
}