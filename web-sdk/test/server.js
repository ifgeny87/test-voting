const Express = require('express');
const path = require('path');
const app = new Express();
app.use(Express.static('.'));
app.get('/js/bundle.js', (req, res) => {
	res
		.sendFile(path.resolve(__dirname, '../dist/bundle.js'));
})
app.listen(88, () => {
	console.log('Server running http://localhost:88');
});
