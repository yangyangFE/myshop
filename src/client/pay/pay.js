/**
 * Created by  yangyang11 on 2017/3/23.
 * 付款页面
 */
import React, {Component} from 'react';
import {Toast, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import './pay.css';
var bmobGoods = [];
var bombObjId;
var shouldPay;
class Pay extends Component{
	constructor(props){
	    super(props);
		this.state = {
			getBmobData:'0',
		};
		this.pay=this.pay.bind(this);
	}
	componentWillMount(){
		let hash =  location.hash;
		bombObjId = hash.split('=')[1].split('&')[0];
		console.log(bombObjId);
		let user_id = localStorage.getItem("user_id");
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		
		bmobGoods.length = 0;
		var Goods = Bmob.Object.extend("goods");
      	var query = new Bmob.Query(Goods);
        query.get(bombObjId,{
  			success: function(results) {
  					//console.log(results);
  				shouldPay = results.get('goods_preice');
  				bmobGoods.push(
  					<div className='message'>
  						<div className='user_message'>
  							<div className='p_message_top'>
  								<div className='p_userName'>
  									{localStorage.getItem("user_name")}
  								</div>
  								<div className='p_userId'>
  									{localStorage.getItem("user_id")}
  								</div>
  							</div>
  							<div className='p_userAddress'>
  								{localStorage.getItem("user_address")}
  							</div>
  						</div>
	  					<Link to={{ pathname: 'goodsShow?id='+ results.id}} style={{ textDecoration:'underline' }}>
		  					<div className='goodsDiv1' >
		  						<div className='goodsImg1'>
		  							<img src={results.get('goods_pic')[0].url} 
		  								alt={''} 
		  								className="noPhoto" 
		  								style={{display:'block',width:'90%',height:'100%'}}
		  							/>
		  						</div>
		  						<div className='right1'>
		  							<div className='goods_message1'>
		  								{results.get('goods_name')}  {results.get('goods_description')}
		  							</div>
		  							<div className='goods_price1'>
		  								¥  {results.get('goods_preice')} 
		  							</div>
		  							<div className='joinBasket1'>
		  							</div>
		  						</div>
		  					</div>
	  					</Link>
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
		console.log(bmobGoods);
	}
	pay(){
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
			var Goods = Bmob.Object.extend("goods");
		    var goods = new Bmob.Query(Goods);
		    goods.get(bombObjId, {
		      success: function(object) {
		        // The object was retrieved successfully.
		        object.set("buy_flag", "已付款");
		        object.set("buyer_id", localStorage.getItem("user_id"));
		        object.set("buyer_address", localStorage.getItem("user_address"));
		        object.save(null, {
		          success: function(objectUpdate) {
		          	Toast.success('购买成功',2);
		          },
		          error: function(model, error) {
		            alert("create object fail");
		          }
		        });
		      },
		      error: function(object, error) {
		        alert("query object fail");
		      }
		    });
	}
  render() {
    return (
    	<div className='classSearch'>
    		<div className='navbar'>
	    		<NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)}
			    >填写订单</NavBar>
			</div>
    		{bmobGoods}
    		<div className='bottom_div'>
    			<div className='p_joinBasket'>
    				实付款:¥ {shouldPay}
    			</div>
    			<div className='g_buy' onClick={this.pay}>
    				提交订单
    			</div>
    		</div>
    	</div>
    );
  }
}
module.exports = Pay;
