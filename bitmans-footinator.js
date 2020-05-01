var openWindoww = function() {
	var w = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 250,
		title: "Footinator"
	});
}

var main = function() {
    ui.registerMenuItem("Footinator", function() {
        openWindoww();
    });
};

registerPlugin({
    name: 'Footinator',
    version: '1.0',
    authors: ['bitman2049'],
    type: 'local',
    main: main
});