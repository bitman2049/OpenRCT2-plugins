var MAX_COPIES = 50;
var MIN_COPIES = 1;
var copyCount = MIN_COPIES;
var offset = {x: 0, y: 0, z: 0};
var Widgets
var Window

function GetWidget(widget) {
    if (Window) {
        return Window.findWidget(widget.name);
    }
}

function updateSpinner(widget, value) {
	if (!widget) {return; }
	widget.text = value.toString();
	console.log(value.toString());
}

function createWidgets() {
	Widgets = [];
	
	var xOffsetLabel;
	
	var xOffsetSpinner = {
		type: 'spinner',
		x: 2,
		y: 16,
		width: 196,
		height: 10,
		name: 'spinXOff',
		text: offset.x.toString(),
		onDecrement: function() {offset.x--; updateSpinner(GetWidget(xOffsetSpinner), offset.x)},
		onIncrement: function() {offset.x++; updateSpinner(GetWidget(xOffsetSpinner), offset.x)},
	};
	
	var xOffsetLabel;
	
	var yOffsetSpinner = {
		type: 'spinner',
		x: 2,
		y: 28,
		width: 196,
		height: 10,
		name: 'spinYOff',
		text: offset.y.toString(),
		onDecrement: function() {offset.y--; updateSpinner(GetWidget(yOffsetSpinner), offset.y)},
		onIncrement: function() {offset.y++; updateSpinner(GetWidget(yOffsetSpinner), offset.y)},
	};
	
	var xOffsetLabel;
	
	var zOffsetSpinner = {
		type: 'spinner',
		x: 2,
		y: 40,
		width: 196,
		height: 10,
		name: 'spinZOff',
		text: offset.z.toString(),
		onDecrement: function() {offset.z--; updateSpinner(GetWidget(zOffsetSpinner), offset.z)},
		onIncrement: function() {offset.z++; updateSpinner(GetWidget(zOffsetSpinner), offset.z)},
	};
	
	var copyCountLabel;
	
	var copyCountSpinner = {
		type: 'spinner',
		x: 2,
		y: 52,
		width: 196,
		height: 10,
		name: 'spinCopyCount',
		text: copyCount.toString(),
		onDecrement: function() {copyCount = Math.max(copyCount-1, MIN_COPIES); updateSpinner(GetWidget(copyCountSpinner), copyCount)},
		onIncrement: function() {copyCount = Math.min(copyCount+1, MAX_COPIES); updateSpinner(GetWidget(copyCountSpinner), copyCount)},
	};
	
	
	Widgets.push(xOffsetSpinner);
	Widgets.push(yOffsetSpinner);
	Widgets.push(zOffsetSpinner);
	Widgets.push(copyCountSpinner);
};

var openWindow = function() {
	createWidgets();
	Window = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 100,
		title: "Bitman's Track Stacker",
		widgets: Widgets
	});
};

var main = function() {
	if (typeof ui !== 'undefined')
	{
		ui.registerMenuItem("Track Stacker", function() {
			openWindow();
		});
	}
};

registerPlugin({
    name: 'Bitman\'s Track Stacker',
    version: '1.0',
    authors: ['bitman2049'],
    type: 'remote',
    main: main
});