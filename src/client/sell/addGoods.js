/**
 * Created by  yangyang11 on 2017/3/16.
 * 上架新物品
 */
import React, {Component} from 'react';
import { Picker, Toast, Button, ImagePicker, List, Stepper, TextareaItem, InputItem, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import './addGoods.css';
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
const district =  [
    {
      label: '二手书籍',
      value: '二手书籍',
    },
    {
      label: '二手电器',
      value: '二手电器',
    },
    {
      label: '二手衣物',
      value: '二手衣物',
    },
    {
      label: '其他物品',
      value: '其他物品',
    },
  ];
class AddGoods extends Component{
	constructor(props){
	    super(props);
		this.state = {
			focused: false,
			val: 1,
			files: [],
		};
		this.stepperOnChange = this.stepperOnChange.bind(this);
		this.ImagePickerOnChange = this.ImagePickerOnChange.bind(this);
		this.sendGoodsMessage = this.sendGoodsMessage.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	 onChange(value){
    console.log('checkbox');
    this.setState({
      value,
    });
  }
	/*
	 * 上架物品
	 */
	sendGoodsMessage(){
		let { getFieldProps } = this.props.form;
		let user_id = localStorage.getItem("user_id");
		let goods_name = getFieldProps('autofocus')['value'];
		let goods_description = getFieldProps('textarea')['value'];
		let goods_class = getFieldProps('district3')['value'];
		let goods_number = this.state.val;
		let goods_preice = getFieldProps('preice')['value'];
		let u_user_phone = getFieldProps('phone')['value'];
		let goods_pic = this.state.files;
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
        var Goods = Bmob.Object.extend("goods");
        var goods = new Goods();
        goods.set("seller_id",user_id);
        goods.set("goods_name",goods_name);
        goods.set("goods_description",goods_description);
        goods.set("goods_class",goods_class);
        goods.set("goods_number",goods_number);
        goods.set("goods_preice",goods_preice);
        goods.set("u_user_phone",u_user_phone);
        goods.set("buy_flag",'在售中');
        goods.set("buyer_id",'');
        goods.set("goods_pic",goods_pic);
        goods.save(null, {
		  success: function(gameScore) {
		    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
		    Toast.success('上架成功', 2);
		    history.go(-1);
		  },
		  error: function(gameScore, error) {
		    // 添加失败
		   console.log('失败');
		  }
		});
		console.log(user_id+goods_name+goods_description+goods_number+goods_preice+u_user_phone+goods_pic);
	}
	stepperOnChange(val){
	 this.setState({ val:val });
	}
	ImagePickerOnChange(files, type, index){
		console.log(files, type, index);
	    this.setState({
	      files:files
	    });
	}
  render() {
  	const { getFieldProps } = this.props.form;
  	const files = this.state.files;
  	let h = document.body.clientHeight;
    return (
      <div className='content' style={{height:h}}>
	      <NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)	}
	      rightContent={[
	        <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
	        <Icon key="1" type="ellipsis" />,
	      ]}
	    	>添加商品</NavBar>
	    	<div style={{height:'2rem'}}/>
	    	 <InputItem
            {...getFieldProps('autofocus')}
            clear
            placeholder="请输入商品名称"
            autoFocus
          >名称</InputItem>
           <TextareaItem
           	{...getFieldProps('textarea')}
            title="描述"
            placeholder="请输入商品描述"
            data-seed="logId"
            autoHeight
          />
      		<Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
          	<List.Item arrow="horizontal">选择分类</List.Item>
       	 </Picker>
           <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber max={10} min={1} value={this.state.val} onChange={this.stepperOnChange}
          />}
          wrap
        >
        件数
        </List.Item>
           <InputItem
            {...getFieldProps('preice')}
            placeholder="0.00"
            extra="元"
          >售价</InputItem>
            <InputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder="888 888 8888"
          >手机号码</InputItem>
          <div className="am-list-item am-input-item">实物照片</div>
          <ImagePicker
          files={files}
          onChange={this.ImagePickerOnChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          />
	      <div className='sumbitButton'>
	      	<Button className="btn" type="primary" onClick={this.sendGoodsMessage}>上架</Button>
	      </div>
      </div>
    );
  }
}
AddGoods = createForm()(AddGoods);
module.exports = AddGoods;
