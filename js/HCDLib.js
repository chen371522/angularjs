//js library, by HCD, Mar 2015

//define a namespace
var HCD = HCD || {};

HCD.toggleCSSPropertyValue = function(obj, property, v1, v2) {
    $(obj).css(property, ($(obj).css(property)==v1) ? v2 : v1);
}

//generate n integers in the range [0 1000)
HCD.randRange1000 = function(n) {
	return HCD.randRange(n, 0, 1000);
}

//generate n integers in the range [low high)
HCD.randRange = function(n, low, high) {
	var list = [];
	var range = high - low;
	for(var i = 0; i < n; i++){
		var rand = Math.random(); //a real random number in [0,1)
		list.push(low + Math.floor(range * rand)); 
	}
	return list;
}

//swap the value of two elements in an array
HCD.swapArr = function(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}
