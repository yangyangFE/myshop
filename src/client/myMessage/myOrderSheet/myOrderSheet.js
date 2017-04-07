import React, {Component} from 'react';
import {NavBar, Tabs, WhiteSpace} from 'antd-mobile';
import { Link } from 'react-router';
import Order from './order';
const TabPane = Tabs.TabPane;
var bmobGoodsTable = [];
class MyOrderSheet extends Component{
	 constructor(props) {
    super(props);
    this.state = {
    	goodsTable1:[],
    	selectGoodsIdArray:[],
    }
    this.callback = this.callback.bind(this);
  }
	callback(){
		
	}
  componentWillMount(){
  	//console.log(this);
										      bmobGoodsTable.push();
  }
  render() {
  	let h = document.body.clientHeight;
  	h = h - 100;
  	let h1 = h - 87;
    return (
      <div style={{height:h}}>
      	 <NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)}
		      
		    >我的订单</NavBar>
		<div style={{height:'2rem'}} />
		<Tabs defaultActiveKey="2" onChange={this.callback}>
	      <TabPane tab="全部订单" key="1">
	        <div style={{  height: h1, backgroundColor: '#fff' }}>
	         <Order orderClass = {'all'}/>
	        </div>
	      </TabPane>
	      <TabPane tab="待收货" key="2">
	        <div style={{ height: h1, backgroundColor: '#fff' }}>
	          <Order orderClass = {'waitGetGoods'}/>
	        </div>
	      </TabPane>
	      <TabPane tab="已成交" key="3">
	        <div style={{ height: h1, backgroundColor: '#fff' }}>
	        <Order orderClass = {'done'}/>
	        </div>
	      </TabPane>
        </Tabs>
    <WhiteSpace />
      </div>
    );
  }
}
module.exports = MyOrderSheet;
