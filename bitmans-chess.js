/// <reference path="../../../source/repos/OpenRCT2/distribution/openrct2.d.ts" />

// Bitman's Chess, created 2020-05-06

var Widgets;
var mainWindow;
var Surfaces;

var GetSurfaceElement = function(tile)
{
    for (var i = 0; i < tile.elements.length; i++) {
        if (tile.elements[i].type === "surface")
            return tile.elements[i];
    }
    return null;
}

var CreateBoard = function(boardPos) {
    if (((boardPos.x + 32 * 4) > map.size.x) || ((boardPos.y + 32 * 4) > map.size.y))
    {
        // out of range
        return;
    }

    var height = 0;
    Surfaces = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var currTile = map.getTile(boardPos.x + i * 32, boardPos.y + j * 32);
            var currSurface = GetSurfaceElement(currTile);
            height = Math.max(height, currSurface.height);
            Surfaces.push(currSurface);
        }
    }

    for (var i = 0; i < Surfaces.length; i++)
    {
        Surfaces[i].slope = 0;
        Surfaces[i].height = height;
        Surfaces[i].surfaceStyle = 5; // TERRAIN_CHECKERBOARD
    }

}

var GetWidget = function(widget) {
    if (mainWindow !== null) {
        return mainWindow.findWidget(widget.name);
	}
	return null;
}

var UpdateSpinner = function(widget, value) {
	if (!widget) {return; }
	widget.text = value.toString();
}

var createWidgets = function() {
	Widgets = [];

};

var onActionExecute = function(e) {
	if (network.mode !== "none"/* || e.player === network.currentPlayer*/)
	{

	}
};

var openWindow = function() {
	context.subscribe("action.execute", onActionExecute);
	createWidgets();
	mainWindow = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 200,
		title: "Chess Settings",
		widgets: Widgets
	});
};

var main = function() {
	if (typeof ui !== 'undefined')
	{
		ui.registerMenuItem("Chess Settings", function() {
			openWindow();
		});
	}
};

registerPlugin({
    name: "Bitman's Chess",
    version: '1.0',
    authors: ['bitman2049'],
    type: 'remote',
    main: main
});