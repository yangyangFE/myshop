/**
 * Created by  yangyang11 on 2017/3/20.
 * 注册页面
 */
import React, {Component} from 'react';
import {TextareaItem, NavBar, Icon ,Toast ,Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import './join.css';
class Join extends Component{
	constructor(props){
	    super(props);
		this.state = {
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		let { getFieldProps } = this.props.form;
		let userId=getFieldProps('autofocus')['value'];//读用户ID
		let userName=getFieldProps('inputclear')['value'];//用户姓名
		let userAddress=getFieldProps('textarea')['value'];//收货地址
        let userKeywords=getFieldProps('password')['value'];//读用户密码
        let repeatKeywordsAgain=getFieldProps('passwordagain')['value'];//读用户验证密码
        if( (userId == undefined)||
        	(userName == undefined)||
        	(userAddress == undefined)||
        	(userKeywords == undefined)||
        	(repeatKeywordsAgain == undefined)
          ){
        	Toast.fail('请确保每一项都已经填写完毕',2);
        }else{
	        if(userKeywords == repeatKeywordsAgain){
		        Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		        var User1 = Bmob.Object.extend("u_user");
		        var User = new User1();
		        User.set("userId",userId);
		        User.set("user_name",userName);
		        User.set("user_address",userAddress);
		        User.set("keyword",userKeywords);
		        User.save(null, {
				  success: function(gameScore) {
				    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
				    Toast.success('注册成功，请登录', 2);
				    localStorage.setItem("user_name",userName);
				    localStorage.setItem("user_address",userAddress);
				   	location.hash = '/login';
				  },
				  error: function(gameScore, error) {
				    // 添加失败
				   console.log('失败');
				  }
				});
			}else{
				Toast.fail('两次输入密码不一致',3);
				this.props.form.setFieldsValue({
	        		password: '',
					passwordagain: '',	
				});
			}
        }
	}
  render() {
  	 const { getFieldProps } = this.props.form;
    return (
      <div className='joinPage'>
		    <NavBar leftContent="返回" mode="light" onLeftClick={() => location.href = '/'}
		      
		    >新用户注册</NavBar>
      		<div className='inputDiv'>
	      		<InputItem
		            {...getFieldProps('autofocus')}
		            type="phone"
		            clear
		            placeholder="请输入您的手机号"
		            autoFocus
	          		>手机号
	          	</InputItem>
	          	<InputItem
		            {...getFieldProps('inputclear')}
		            clear
		            maxLength='7'
		            placeholder="用户名最长为7"
		          >姓名
			    </InputItem>
	            <TextareaItem
		           	{...getFieldProps('textarea')}
		            title="收货地址"
		            placeholder="请输入收货地址"
		            data-seed="logId"
		            autoHeight
		          />
	            <InputItem
		            {...getFieldProps('password')}
		            type="password"
		            placeholder="****"
		          >密码
	            </InputItem>
	            <InputItem
		            {...getFieldProps('passwordagain')}
		            type="password"
		            placeholder="****"
		            >验证密码
	          	</InputItem>
	          <Button className="btn" type="primary" onClick={this.handleClick} >注册</Button>
          </div>
      </div>
    );
  }
}
Join = createForm()(Join);
module.exports = Join;
