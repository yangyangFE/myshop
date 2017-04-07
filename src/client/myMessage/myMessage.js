import React, {Component} from 'react';
import { Toast, Button, Checkbox, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import './myMessage.css';
var goodsTable=[];
var bmobGoodsTable = [];
var user_goods_objID = [];
const CheckboxItem = Checkbox.CheckboxItem;
class MyMessage extends Component{
	 constructor(props) {
    super(props);
    this.state = {
    	goodsTable1:[],
    	selectGoodsIdArray:[],
    }
    this.handleClick = this.handleClick.bind(this);	
  }
  componentWillMount(){
  	//console.log(this);
  	let user_id = localStorage.getItem("user_id");
  	if(!user_id){
  		Toast.fail('请先登录',2);
  		location.hash = '/login';
  	}
										      bmobGoodsTable.push();
  }
  handleClick(){
  	localStorage.clear();
  	location.hash='/login';
  }
  render() {
  	let h = document.body.clientHeight;
  	h = h - 100;
    return (
      <div className='myMessage' style={{height:h}}>
        <NavBar>
        账户管理
        </NavBar>
        <Link to={{ pathname: 'join?id='+ localStorage.getItem("user_id")}} style={{ textDecoration:'underline' }}>
	        <div className='m_user_message'>
	        	<div className='m_user_img'>用户头像
	        	</div>
	        	<div className='m_u_mright'>
	        		<div className='m_userName'>
	        			姓名:{localStorage.getItem("user_name")}
	        		</div>
	        		<div className='m_userId'>
	        			账号:{localStorage.getItem("user_id")}
	        		</div>
	        	</div>
	        	<div className='m_openMessage'>
	        			>
	        	</div>
	        </div>
	      </Link>
	      <Link to={{ pathname: 'order'}} style={{ textDecoration:'underline' }}>
	      	全部订单
	      </Link>
			    {bmobGoodsTable}
	    	<div className='m_button'>
	    		<Button className="btn" type="primary" onClick={this.handleClick} >退出登录</Button>
	    	</div>
      </div>
    );
  }
}
module.exports = MyMessage;
