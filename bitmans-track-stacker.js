/// <reference path="../../../source/repos/OpenRCT2/distribution/openrct2.d.ts" />

// Bitman's Track Stacker, created 2020-05-01

var MAX_COPIES = 255;
var MIN_COPIES = 1;
var RIDE_CONSTRUCTION_ID = 13;
var copyCount = MIN_COPIES;
var offset = {x: 0, y: 0, z: 0};
var Widgets;
var mainWindow;
var enabled = true;

function GetWidget(widget) {
    if (mainWindow !== null) {
        return mainWindow.findWidget(widget.name);
	}
	return null;
}

function UpdateSpinner(widget, value) {
	if (!widget) {return; }
	widget.text = value.toString();
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
		onDecrement: function() {offset.x--; UpdateSpinner(GetWidget(mainWindow, xOffsetSpinner), offset.x)},
		onIncrement: function() {offset.x++; UpdateSpinner(GetWidget(mainWindow, xOffsetSpinner), offset.x)},
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
		onDecrement: function() {offset.y--; UpdateSpinner(GetWidget(mainWindow, yOffsetSpinner), offset.y)},
		onIncrement: function() {offset.y++; UpdateSpinner(GetWidget(mainWindow, yOffsetSpinner), offset.y)},
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
		onDecrement: function() {offset.z--; UpdateSpinner(GetWidget(mainWindow, zOffsetSpinner), offset.z)},
		onIncrement: function() {offset.z++; UpdateSpinner(GetWidget(mainWindow, zOffsetSpinner), offset.z)},
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
		onDecrement: function() {copyCount = Math.max(copyCount-1, MIN_COPIES); UpdateSpinner(GetWidget(mainWindow, copyCountSpinner), copyCount)},
		onIncrement: function() {copyCount = Math.min(copyCount+1, MAX_COPIES); UpdateSpinner(GetWidget(mainWindow, copyCountSpinner), copyCount)},
	};

	var enableCheckbox = {
		type: 'checkbox',
		x: 2,
		y: 16 + (widgetHeight + 2) * 4,
		width: 198,
		height: widgetHeight,
		name: 'chkEnable',
		text: "Enabled",
		isChecked: true,
		onChange: function(isChecked) {enabled=isChecked}
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

var onTrackPlaceAction = function(e) {
	var x = e.result.position.x;
	var y = e.result.position.y;
	var z = e.result.position.z;
}

var onTrackRemoveAction = function(e) {

}

var onActionExecute = function(e) {
	if (network.mode === "none"/* || e.player === network.currentPlayer*/)
	{
		if (e.type === 3 && e.result.expenditureType === "ride_construction")
		{
			console.log("placed a track piece");
		}
		if (e.type === 4 && e.result.expenditureType === "ride_construction")
		{
			console.log("removed a track piece");
		}
	}
};

var openWindow = function() {
	context.subscribe("action.execute", onActionExecute);
	createWidgets();
	mainWindow = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 200,
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
    name: "Bitman's Track Stacker",
    version: '1.0',
    authors: ['bitman2049'],
    type: 'remote',
    main: main
});