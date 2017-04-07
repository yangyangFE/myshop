/**
 * Created by  yangyang11 on 2017/3/13.
 * 商品展示页
 */
import React, {Component} from 'react';
import {Toast, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import './goodsShow.css';
var bmobGoods = [];
var bombObjId;
class GoodsShow extends Component{
	constructor(props){
	    super(props);
		this.state = {
			getBmobData:'0',
		};
		//this.buy = this.buy.bind(this);
		this.joinBasket = this.joinBasket.bind(this);
	}
	/*
	 * url解析商品objId,查询BOMB后端云，获取商品详细信息，进行展示。
	 */
	componentWillMount(){
		let hash =  location.hash;
		bombObjId = hash.split('=')[1].split('&')[0];
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		
		bmobGoods.length = 0;
		var Goods = Bmob.Object.extend("goods");
      	var query = new Bmob.Query(Goods);
        query.get(bombObjId,{
		  			success: function(results) {
		  					console.log(results);
			  				bmobGoods.push(
			  					<div className='goodsShow' >
			  						<div className='g_img_carousel'>
			  							<img src={results.get('goods_pic')[0].url} alt={''} className="noPhoto" style={{display:'block',width:'60%',height:'100%',marginLeft:'20%'}}/>
			  						</div>
			  						<div className='g_description'>
				  						{results.get('goods_name')}  {results.get('goods_description')}
				  					</div>
				  					<div className='g_price'>
				  						¥ {results.get('goods_preice')}
				  					</div>
			  					</div>
			  				);
		  					this.setState({
			  					getBmobData:'1'
			  				});
		  			}.bind(this),
		  			error: function(object, error) {
		   			 // 查询失败
		  			}
		});
	}
	joinBasket(){
		if(localStorage.getItem("user_id")){
			Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
			var User_goods = Bmob.Object.extend("user_goods");
	      	var ug = new User_goods;
	      	ug.set('user_id',localStorage.getItem("user_id"));
	      	ug.set('goods_objId',bombObjId);
	      	ug.set('basket_flag','已加入购物车');
	       	ug.save(null, {
			  success: function(gameScore) {
			    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
			    Toast.success('已加入购物车', 2);
			    location.hash = '/';
			  },
			  error: function(gameScore, error) {
			    // 添加失败
			   console.log('失败');
			  }
			});
		}else{
			Toast.offline('请登录后再操作',2);
			location.hash = '/login';
		}
	}
//	buy(){
//		if(localStorage.getItem("user_id")){
//			Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
//			var Goods = Bmob.Object.extend("goods");
//	      	var query = new Bmob.Query(Goods);
//	      	query.get(bombObjId, {
//				    success: function(gameScore) {
//				      // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
//				      gameScore.set('buy_flag', '交易中');
//				      gameScore.save();
//					  alert('购买成功');
//				      // The object was retrieved successfully.
//				    },
//				    error: function(object, error) {
//	
//	    			}
//			});
//		}else{
//			Toast.offline('请登录后再操作',2);
//			location.hash = '/login';
//		}
//	}
  render() {
    return (
    	<div className='classSearch'>
    		<div className='navbar'>
	    		<NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)}
			    >商品详情</NavBar>
			</div>
    		{bmobGoods}
    		<div className='bottom_div'>
    			<div className='g_joinBasket' onClick={this.joinBasket}>
    				加入购物车
    			</div>
    			<Link to={{ pathname: 'pay?id='+ bombObjId}} style={{ textDecoration:'underline' }}>
	    			<div className='g_buy'>
	    				立即购买
	    			</div>
	    		</Link>
    		</div>
    	</div>
    );
  }
}
module.exports = GoodsShow;
