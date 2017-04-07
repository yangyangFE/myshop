/**
 * Created by  yangyang11 on 2017/3/16.
 * 填写发货信息。
 */
import React, {Component} from 'react';
import { Picker, Toast, Button, ImagePicker, List, Stepper, TextareaItem, InputItem, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
var bmobGoods = [];
var bombObjId='';
var goodsName = '';
var goodsPrice = '';
var buyer_phone = '';
var buyer_address = '';
class SendGoods extends Component{
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
		  					console.log(results);
			  				goodsName = results.get('goods_name');
			  				goodsPrice= results.get('goods_preice');
			  				buyer_phone = results.get('buyer_id');
			  				buyer_address = results.get('buyer_address');
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
		let { getFieldProps } = this.props.form;
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		var Goods = Bmob.Object.extend("goods");
      	var query = new Bmob.Query(Goods);
        query.get(bombObjId,{
		  			success: function(object) {
		  				  object.set("courier_company", getFieldProps('inputclear')['value']);
		  				  object.set("courier_number", getFieldProps('number')['value']);
		  				  object.set("buy_flag", '已发货');
						        object.save(null, {
						          success: function(objectUpdate) {
						          	Toast.success('发货完成',2);
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
	    	>填写发货信息</NavBar>
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
            value={buyer_phone}
            disabled
          >买家电话</InputItem>
          <TextareaItem
            value={buyer_address}
            title="买家地址"
            disabled
            autoHeight
          />
      	  <InputItem
		    {...getFieldProps('inputclear')}
		    clear
		    maxLength='7'
		    placeholder="请输入快递公司名称"
  		  >快递公司
		  </InputItem>
		  <InputItem
            {...getFieldProps('number')}
            type="number"
            placeholder="请输入快递单号"
          >快递单号</InputItem>
          <Button className="btn" type="primary" onClick={this.handleClick} >确定发货</Button>
      </div>
    );
  }
}
SendGoods = createForm()(SendGoods);
module.exports = SendGoods;
