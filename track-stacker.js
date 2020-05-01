var openWindow = function() {
	var w = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 250,
		title: "Track Stacker"
		widgets: [
			{
				type: 'spinner',
				x: 2,
				y: 2,
				width: 196,
				height: 10,
				name: 'offset x'
			},
			{
				type: 'spinner',
				x: 2,
				y: 14,
				width: 196,
				height: 10,
				name: 'offset y'
			},
			{
				type: 'spinner',
				x: 2,
				y: 26,
				width: 196,
				height: 10,
				name: 'offset z'
			},
		]
	});
}

var main = function() {
	if (typeof ui !== 'undefined')
	{
		ui.registerMenuItem("Track Stacker", function() {
			openWindow();
		});
	}
};

registerPlugin({
    name: 'Track Stacker',
    version: '1.0',
    authors: ['bitman2049'],
    type: 'local',
    main: main
});