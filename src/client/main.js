/**
 * Created by  yangyang11 on 2017/3/5.
 * 主页面
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { TabBar, Icon } from 'antd-mobile';
import Home from './home/home';
import Basket from './basket/basket';
import MyMessage from './myMessage/myMessage';
import Sell from './sell/sell';
import './main.css';
/* eslint global-require: 0 */

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,//控制菜单显示与隐藏 hidden: !this.state.hidden,
    };
  }
  /*
   * 点击主页面底部的meau，实现切换。
   * @param  {String} choose 用户点击的meau值。
   */
  renderContent(choose) {
    switch(choose){
    	case 'home':{
    		return (
		      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
		        <Home />
		      </div>
    		);
    	}
    	break;
    	case 'basket':{
    		return (
		      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
		        <Basket />
		      </div>
    		);
    	}
    	break;
    	case 'sell':{
    		return (
		      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
		        <Sell />
		      </div>
    		);
    	}
    	break;
    	default:{
    		return (
		      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
		        <MyMessage />
		      </div>
    		);
    	}
    }
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'home'}
          badge={''}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}
          data-seed="logId"
        >
          {this.renderContent('home')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type="koubei-o" size="md" />}
          selectedIcon={<Icon type="koubei" size="md" />}
          title="上架"
          key="上架"
          badge={''}
          selected={this.state.selectedTab === 'sell'}
          onPress={() => {
            this.setState({
              selectedTab: 'sell',
            });
          }}
          data-seed="logId1"
        >
          {this.renderContent('sell')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="购物车"
          key="购物车"
          dot
          selected={this.state.selectedTab === 'basket'}
          onPress={() => {
            this.setState({
              selectedTab: 'basket',
            });
          }}
        >
          {this.renderContent('basket')}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'myMessage'}
          onPress={() => {
            this.setState({
              selectedTab: 'myMessage',
            });
          }}
        >
          {this.renderContent('myMessage')}
        </TabBar.Item>
      </TabBar>
    );
  }
}
module.exports = Content;
