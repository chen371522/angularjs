var PLS=PLS||{};
 PLS.Stack=function() {
	this.dataStore = [];
	this.top = 0;
}
PLS.Stack.prototype.push=function(element){
	this.dataStore[this.top++] = element;
}
PLS.Stack.prototype.peek=function(){
	return this.dataStore[this.top - 1];
}
PLS.Stack.prototype.pop=function(){
	return this.dataStore[--this.top];
}
PLS.Stack.prototype.clear=function(){
	this.top = 0;
}
PLS.Stack.prototype.length=function(){
	return this.top;
}

	function bubbleSort (dataStore) {
	
}





