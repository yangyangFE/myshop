import React, {Component} from 'react';
import { Picker, Toast, Button, ImagePicker, List, Stepper, TextareaItem, InputItem, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
var bmobGoods = [];
var bombObjId='';
var goodsName = '';
var goodsPrice = '';
var seller_phone = '';
var buyer_address = '';
var courier_company,courier_number;
class OrderCourier extends Component{
	constructor(props){
	    super(props);
		this.state = {
			focused: false,
			val: 1,
			files: [],
		};
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount(){
		let hash =  location.hash;
		bombObjId = hash.split('=')[1].split('&')[0];
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		bmobGoods.length = 0;
		var Goods = Bmob.Object.extend("goods");
      	var query = new Bmob.Query(Goods);
        query.get(bombObjId,{
		  			success: function(results) {
			  				goodsName = results.get('goods_name');
			  				goodsPrice= results.get('goods_preice');
			  				seller_phone = results.get('u_user_phone');
			  				buyer_address = results.get('buyer_address');
			  				courier_company = results.get('courier_company');
			  				courier_number = results.get('courier_number');
		  					this.setState({
			  					getBmobData:'1'
			  				});
		  			}.bind(this),
		  			error: function(object, error) {
		   			 // 查询失败
		  			}
		});
	}
	/*
	 * 上架物品
	 */
	handleClick(){
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		var Goods = Bmob.Object.extend("goods");
      	var query = new Bmob.Query(Goods);
        query.get(bombObjId,{
		  			success: function(object) {
		  				  object.set("buy_flag", '已完成');
						        object.save(null, {
						          success: function(objectUpdate) {
						          	Toast.success('确认收货',2);
						          	location.hash = '/order';
						          },
						          error: function(model, error) {
						            alert("create object fail");
						          }
						        });
		  				
		  			}.bind(this),
		  			error: function(object, error) {
		   			 // 查询失败
		  			}
		});
	}
  render() {
  	const { getFieldProps } = this.props.form;
  	const files = this.state.files;
  	let h = document.body.clientHeight;
    return (
      <div className='content' style={{height:h}}>
	      <NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)	}
	    	>确认收货</NavBar>
	    	<div style={{height:'2rem'}} />
	    	 <InputItem
            value={goodsName}
            disabled
          >商品名称</InputItem>
           <InputItem
            value={"¥"+goodsPrice}
            disabled
          >成交价格</InputItem>
          <InputItem
            value={seller_phone}
            disabled
          >卖家电话</InputItem>
          <TextareaItem
            value={buyer_address}
            title="送货地址"
            disabled
            autoHeight
          />
      	  <InputItem
            value={courier_company}
            disabled
          >快递公司</InputItem>
		 <InputItem
            value={courier_number}
            disabled
          >快递单号</InputItem>
          <Button className="btn" type="primary" onClick={this.handleClick} >确定收货</Button>
      </div>
    );
  }
}
OrderCourier = createForm()(OrderCourier);
module.exports = OrderCourier;
