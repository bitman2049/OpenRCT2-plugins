/// <reference path="C:/Users/aldra/Documents/source/repos/OpenRCT2/distribution/openrct2.d.ts" />

// Bitman's Track Stacker, created 2020-05-01

var MAX_COPIES = 50;
var MIN_COPIES = 1;
var RIDE_CONSTRUCTION_ID = 13;
var copyCount = MIN_COPIES;
var offset = {x: 0, y: 0, z: 0};
var Widgets;
var mainWindow;

function GetRideID() {
	var wRideConstruct = getWindow()
}

function GetWidget(widget) {
    if (mainWindow) {
        return mainWindow.findWidget(widget.name);
    }
}

function updateSpinner(widget, value) {
	if (!widget) {return; }
	widget.text = value.toString();
	console.log(value.toString());
}

function createWidgets() {
	Widgets = [];
	
	var spinWid = 60;
	var spinOffset = 198-spinWid;
	var widgetHeight = 12;
	var xOffsetLabel = {
		type: 'label',
		x: 2,
		y: 16,
		width: 160,
		height: widgetHeight,
		name: 'labelXOff',
		text: "X Offset"
	};
	
	var xOffsetSpinner = {
		type: 'spinner',
		x: spinOffset,
		y: 16,
		width: spinWid,
		height: widgetHeight,
		name: 'spinXOff',
		text: offset.x.toString(),
		onDecrement: function() {offset.x--; updateSpinner(GetWidget(xOffsetSpinner), offset.x)},
		onIncrement: function() {offset.x++; updateSpinner(GetWidget(xOffsetSpinner), offset.x)},
	};
	
	var yOffsetLabel = {
		type: 'label',
		x: 2,
		y: 16 + (widgetHeight + 2) * 1,
		width: 160,
		height: widgetHeight,
		name: 'labelYOff',
		text: "Y Offset"
	};

	var yOffsetSpinner = {
		type: 'spinner',
		x: spinOffset,
		y: 16 + (widgetHeight + 2) * 1,
		width: spinWid,
		height: widgetHeight,
		name: 'spinYOff',
		text: offset.y.toString(),
		onDecrement: function() {offset.y--; updateSpinner(GetWidget(yOffsetSpinner), offset.y)},
		onIncrement: function() {offset.y++; updateSpinner(GetWidget(yOffsetSpinner), offset.y)},
	};
	
	var zOffsetLabel = {
		type: 'label',
		x: 2,
		y: 16 + (widgetHeight + 2) * 2,
		width: 160,
		height: widgetHeight,
		name: 'labelZOff',
		text: "Z Offset"
	};

	var zOffsetSpinner = {
		type: 'spinner',
		x: spinOffset,
		y: 16 + (widgetHeight + 2) * 2,
		width: spinWid,
		height: widgetHeight,
		name: 'spinZOff',
		text: offset.z.toString(),
		onDecrement: function() {offset.z--; updateSpinner(GetWidget(zOffsetSpinner), offset.z)},
		onIncrement: function() {offset.z++; updateSpinner(GetWidget(zOffsetSpinner), offset.z)},
	};
	
	var copyCountLabel = {
		type: 'label',
		x: 2,
		y: 16 + (widgetHeight + 2) * 3,
		width: 160,
		height: widgetHeight,
		name: 'labelCopyCount',
		text: "Number of copies"
	};
	
	var copyCountSpinner = {
		type: 'spinner',
		x: spinOffset,
		y: 16 + (widgetHeight + 2) * 3,
		width: spinWid,
		height: widgetHeight,
		name: 'spinCopyCount',
		text: copyCount.toString(),
		onDecrement: function() {copyCount = Math.max(copyCount-1, MIN_COPIES); updateSpinner(GetWidget(copyCountSpinner), copyCount)},
		onIncrement: function() {copyCount = Math.min(copyCount+1, MAX_COPIES); updateSpinner(GetWidget(copyCountSpinner), copyCount)},
	};

	var enableCheckbox = {
		type: 'checkbox',
		x: 2,
		y: 16 + (widgetHeight + 2) * 4,
		width: 198,
		height: 10,
		name: 'chkEnable',
		text: "Enabled",
		isChecked: true
	};
	
	Widgets.push(xOffsetSpinner);
	Widgets.push(xOffsetLabel);
	Widgets.push(yOffsetSpinner);
	Widgets.push(yOffsetLabel);
	Widgets.push(zOffsetSpinner);
	Widgets.push(zOffsetLabel);
	Widgets.push(copyCountSpinner);
	Widgets.push(copyCountLabel);
	Widgets.push(enableCheckbox);
};

var openWindow = function() {
	createWidgets();
	mainWindow = ui.openWindow({
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