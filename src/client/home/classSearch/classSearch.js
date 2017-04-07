/**
 * Created by  yangyang11 on 2017/3/13.
 * 首页分类查找
 */
import React, {Component} from 'react';
import {NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import './classSearch.css';
var bmobGoodsTable = [];
class ClassSearch extends Component{
	constructor(props){
	    super(props);
		this.state = {
			getBmobData:'0',
		};
	}
	/*
	 * 在home页面点击分类选项，将类别值通过url传递过来，在页面加载时根据类别值查询数据库。
	 */
	componentWillMount(){
		let hash =  location.hash;
		let goodsClass = hash.split('=')[1].split('&')[0];
		console.log(goodsClass);
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
		bmobGoodsTable.length = 0;
		var Goods = Bmob.Object.extend("goods");
        var query = new Bmob.Query(Goods);
        switch(goodsClass){
        	case 'book':{
        		goodsClass = '二手书籍';
        	}
        	break;
        	case 'appliances':{
        		goodsClass = '二手电器';
        	}
        	break;
        	case 'clothes':{
        		goodsClass = '二手衣物';
        	}
        	break;
        	case 'others':{
        		goodsClass = '其他物品';
        	}
        	break;
        }
        query.equalTo("goods_class",goodsClass);
        query.find({
  			success: function(results) {
				for (let i = 0;i<results.length;i++){
					if(results[i].get('buy_flag') == '在售中'){
		  				bmobGoodsTable.push(
		  				<Link to={{ pathname: 'goodsShow?id='+ results[i].id}} style={{ textDecoration:'underline' }}>
		  					<div className='goodsDiv1' key={i}>
		  						<div className='goodsImg1'>
		  							<img src={results[i].get('goods_pic')[0].url} 
		  								alt={''} 
		  								className="noPhoto" 
		  								style={{display:'block',width:'90%',height:'100%'}}
		  							/>
		  						</div>
		  						<div className='right1'>
		  							<div className='goods_message1'>
		  								{results[i].get('goods_name')}  {results[i].get('goods_description')}
		  							</div>
		  							<div className='goods_price1'>
		  								¥  {results[i].get('goods_preice')} 
		  							</div>
		  							<div className='joinBasket1'>
		  							</div>
		  						</div>
		  					</div>
		  				</Link>	
		  				);
	  				}
  				}
				this.setState({
  					getBmobData:'1'
  				});
  			}.bind(this),
  			error: function(object, error) {
   			 console.log('失败');
  			}
		});
	}
  render() {
    return (
    	<div className='classSearch'>
    		<NavBar leftContent="返回" mode="light" onLeftClick={() => history.go(-1)}
		    >商品展示</NavBar>
    		<div className='g_table'>
    			{bmobGoodsTable}
    		</div>
    	</div>
    );
  }
}
module.exports = ClassSearch;
