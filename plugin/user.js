var ModelUser = require('../model/user');

module.exports.login = {
	get : function(req,res,next){	
		res.render('login',{ title: '登陆' });
	},
	post : function(req,res,next){
		var postData = {
			name : req.body.name
		};
		var resJson = {
			status : false,
			msg : ''
		};
		ModelUser.findOne(postData,function(err,data){
			if(err){
				console.log(err);
			}

			if(data){
				if(data.password == req.body.password){
					req.session.user = data;
					resJson.msg = '登陆成功';
					resJson.status = true;
					res.send(resJson);
					//res.redirect('/user/'+data._id);
				}else{
					resJson.msg = '密码错误';
					res.send('resJson');
				}

			}else{
				resJson.msg = '用户名不存在！';
				res.send(resJson);
			}

		});		
		//res.send(postData);
	}
};

module.exports.reg = {
	get : function(req,res,next){
		res.render('reg',{ title: '注册' });
	},
	post : function (req,res,next){		
		var postData = {
			name : req.body.name,
			password : req.body.password
		};
		var resJson = {
			status : false,
			msg : ''
		};
		ModelUser.findOne({
			name : req.body.name
		},function (err,data){
			console.log('====================111');
			if(err){
				console.log('====================222');
				console.log(err);
			}
			if(data){
				resJson.msg = '此用户已被注册';
				res.send(resJson);
			}else{
				ModelUser.create(postData,function (err,data){
					if(err){
						resJson.msg = '注册异常';
						res.send(resJson);
					}

					resJson.msg = '注册成功';
					resJson.status = true;
					req.session.user = data;
					res.send(resJson);

				});
			}
		});
		//res.send('注册成功');
	}

};

module.exports.logout = {
	get : function(req,res,next){
		delete req.session.user;
		res.redirect('/');
	}

};

module.exports.user = {
	get : function(req,res,next){
		var getData = {
			_id : req.param('_id')
		}
		ModelUser.findById(getData,function (err,data){
			if(err){
				console.log(err);
			}
			if(data){
				res.render('user',{
					title : data.name + '的个人资料',
					view : data
				});
			}else {
				res.send('查询不到数据');
			}

		});
		//res.send('哈哈');
	}

};

// 登陆后才能访问
module.exports.loginYes = {
	 yes : function (req,res,next){
	 	var user = req.session.user;
	 	if(!user){
	 		res.redirect('/login');
	 	}else{
	 		next();
	 	}
	 }
};

// 登陆后不能访问
module.exports.loginNo = function (req,res,next){
	var user = req.session.user;
	if(user){
		res.redirect('/user/'+user._id);
	}else{
		next();
	}
};