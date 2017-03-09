var PluginUser = require('../plugin/user');
var PluginBlog = require('../plugin/blog');

module.exports = function (app) {
	app.use(function(req,res,next){
		var user  = req.session.user;
		app.locals.user = user;
		next();
	});



	app.get('/',function (req,res,next){
		res.render('index',{ title: 'mengfanjian' });
	});

	app.get('/login',PluginUser.loginNo,PluginUser.login.get);

	app.post('/login',PluginUser.login.post);	

	app.get('/reg',PluginUser.loginNo,PluginUser.reg.get);
	app.post('/reg',PluginUser.reg.post);

	app.get('/logout',PluginUser.loginYes.yes,PluginUser.logout.get);

	app.get('/user/:_id',PluginUser.user.get);

	app.get('/add',PluginUser.loginYes.yes,PluginBlog.add.get);

	app.post('/add',PluginBlog.add.post);

	app.get('/view/:_id',PluginBlog.view.get);

	app.get('/list',PluginBlog.list.get);

	//微博修改
	app.get('/list/:_id/editor', PluginBlog.editor.get);	
	app.post('/list/:_id/editor', PluginBlog.editor.post);	

}