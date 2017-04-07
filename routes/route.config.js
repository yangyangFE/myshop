module.exports = {
	//主页
	'/':require('../src/client/main'),
	//登录
	'login':require('../src/client/login/login'),
	//注册
	'join':require('../src/client/login/join'),
	//分类搜索
	'classSearch':require('../src/client/home/classSearch/classSearch'),
	//商品展示页
	'goodsShow':require('../src/client/home/goodsShow/goodsShow'),
	//上架物品操作页
	'addGoods':require('../src/client/sell/addGoods'),
	//上架物品展示页
	'sell':require('../src/client/sell/sell'),

	
	
	'pay':require('../src/client/pay/pay'),
	//我的订单
	'order':require('../src/client/myMessage/myOrderSheet/myOrderSheet'),
	'sendGoods':require('../src/client/sell/sendGoods'),
	'order/orderCourier':require('../src/client/myMessage/myOrderSheet/orderCourier/orderCourier'),
	'order/doneAfter':require('../src/client/myMessage/myOrderSheet/doneAfter/doneAfter'),
	
}
