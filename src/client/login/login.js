/**
 * Created by  yangyang11 on 2017/3/21.
 * 登录页面
 */
import React, {Component} from 'react';
import { createForm } from 'rc-form';
import {  Popup ,Toast, InputItem, Button } from 'antd-mobile';
import {
  BrowserRouter as Router,
  Route,
  Link,
  history
} from 'react-router-dom';
import './login.css';
import Join from './join';
class Login extends Component{
	constructor(props){
	    super(props);
		this.state = {
		};
		this.login = this.login.bind(this);
		this.join = this.join.bind(this);
	}
	componentWillMount(){
//		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
//		var TestObject = Bmob.Object.extend("u_user");
//  	var testObject = new TestObject();
//    	testObject.save({name: "123",keyword:'123'}, {	
//	      success: function(object) {
//	      },
//	      error: function(model, error) {
//	      }
//    	});
		
	}
	join(){
		location.hash = '/join';
	}
	login(){
				let { getFieldProps } = this.props.form;
        let userId=getFieldProps('inputclear')['value'];//读用户ID
        let userKeywords=getFieldProps('password')['value'];//读用户密码
        if(userId){
        	if(userKeywords){
        		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
       			Bmob.Cloud.run(
        				'login',
        				{"user_id":userId,
        				"userKeywords":userKeywords,
        				},
        				{
        					success:function(result){
    								switch(result){
    									case "登录成功":{
    										location.hash = '/';
    									}break;
    									case "此账号不存在":{
    										Toast.fail('此账户不存在', 1);
    									}break;
    									default: {
    										Toast.fail('密码错误', 1);
    									}
    								}
        	  			},
        	  			error:function(error){
        	  				Toast.fail('网络错误', 1);
        	  			}
        	
        				}
        		)
        	}else{
    				Toast.fail('请输入密码', 1);
      		}
        }else{
      		Toast.fail('请输入账号', 1);
      	}
	}
  render() {
  	 	const { getFieldProps } = this.props.form;
   		return (
      		<div className='login'>
      	  		<div className='idInput' > 
		      	   	<InputItem
			            {...getFieldProps('inputclear')}
			            clear
			            placeholder="请输入账号"
			          ></InputItem>
		        </div>
		        <div className='passwordInput'>
			      	<InputItem
			            {...getFieldProps('password')}
			            type="password"
			            placeholder="****"
			          ></InputItem>
			    </div>      
        		<div className='loginButton'>
        			<Button className="btn" type="primary" onClick={this.login} >登录</Button>
        		</div>
        		<div className='join' onClick={this.join}>
        			新用户注册
        		</div>
      </div>
      
    	);
  }
}
Login = createForm()(Login);
module.exports = Login;
