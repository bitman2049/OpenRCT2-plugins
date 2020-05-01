var offset = [0, 0, 0];

var openWindow = function() {
	var w = ui.openWindow({
		classification: "custom.my",
		width: 200,
		height: 100,
		title: "Bitman's Track Stacker",
		widgets: [
			{
				type: 'spinner',
				x: 2,
				y: 16,
				width: 196,
				height: 10,
				name: 'offx',
				text: offset[0].toString(),
				onDecrement: function() {
					offset[0]--; 
					console.log(offset[0].toString());
					var wid = findWidget('offx'); 
					wid.text = offset[0].toString();
				},
				onIncrement: function() {this.text = (++offset[0]).toString()},
			},
			{
				type: 'spinner',
				x: 2,
				y: 28,
				width: 196,
				height: 10,
				name: 'offy',
				text: offset[1].toString(),
				onDecrement: function() {offset[1]--; updateSpinner();},
				onIncrement: function() {offset[1]++; updateSpinner();},
			},
			{
				type: 'spinner',
				x: 2,
				y: 40,
				width: 196,
				height: 10,
				name: 'offz',
				text: offset[2].toString(),
				onDecrement: function() {offset[2]--; updateSpinner();},
				onIncrement: function() {offset[2]++; updateSpinner();},
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
    name: 'Bitman\'s Track Stacker',
    version: '1.0',
    authors: ['bitman2049'],
    type: 'remote',
    main: main
});