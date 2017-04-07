/**
 * Created by  yangyang11 on 2017/3/18.
 * 购物车页面
 */
import React, {Component} from 'react';
import { Checkbox, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import './basket.css';
var goodsTable=[];
var bmobGoodsTable = [];
var user_goods_objID = [];
const CheckboxItem = Checkbox.CheckboxItem;
class Basket extends Component{
	 constructor(props) {
    super(props);
    this.state = {
    	goodsTable1:[],
    	selectGoodsIdArray:[],
    }
    this.getBmobGoods = this.getBmobGoods.bind(this);
    this.selectGoods = this.selectGoods.bind(this);
  }
	getBmobGoods(){
		return this.state.goodsTable1[0].goodsName;
	}
	selectGoods(goods_id){
		let arr = this.state.selectGoodsIdArray;
		arr.push(goods_id);
	}
  componentWillMount(){
  	//console.log(this);
  	let user_id = localStorage.getItem("user_id");
		Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
			bmobGoodsTable.length = 0;
	        var User_goods = Bmob.Object.extend("user_goods");
	        var user_goods = new Bmob.Query(User_goods);
	        user_goods.equalTo("user_id",user_id);
	       	user_goods.find({
	  			success: function(results) {
	  				for (let i = 0;i<results.length;i++){
	  					  var Goods = Bmob.Object.extend("goods");
  							var goods = new Bmob.Query(Goods);
						    goods.get(results[i].get('goods_objId'), {
								  success: function(result1) {
								    // 查询成功，调用get方法获取对应属性的值
								      if(result1.get('buy_flag') == '在售中'){
									      bmobGoodsTable.push(
					  						<div className="goodsDiv" key={i} >
					  							<div className='selectButton'>
					  								 <CheckboxItem onChange={()=>this.selectGoods(result1.id)} className='check'>
											        </CheckboxItem>
					  							</div>
					  							<Link to={{ pathname: 'goodsShow?id='+ result1.id}} style={{ textDecoration:'underline' }}>	
					  							<div className='goodsImage'>
					  								<img src={result1.get('goods_pic')[0].url} 
					  								alt={''} 
					  								className="noPhoto" 
					  								style={{display:'block',width:'90%',height:'100%'}}
					  							/>
					  							</div>
					  							<div className='right'>
					  								<div className='name'>
					  									{result1.get('goods_name')}
					  								</div>
					  								<div className='r_middle'>
						  								<div className="goods_class">
						  									分类:{result1.get('goods_class')}
						  								</div>
						  								<div className='buy_flag'>
						  									状态:{result1.get('buy_flag')}
						  								</div>
						  							</div>	
					  								<div className='r_bottom'>
					  									<div className='price'>¥{result1.get('goods_preice')}</div>
					  									<div className='number'>数量:{result1.get('goods_number')}</div>
					  								</div>
					  							</div>
					  							</Link>		
					  						</div>
		  								   );
	  					  			   }
	  					this.setState({
	  					goodsTable1:bmobGoodsTable
	  					});
								  }.bind(this),
								  error: function(object, error) {
								    // 查询失败
								  }
					});
	  				}
	  				this.setState({
	  					goodsTable1:bmobGoodsTable
	  				});
				//var score = results[0].get('keyword');
	  			}.bind(this),
	  			error: function(object, error) {
	   			 console.log('fail');
	  			}
			});
					//console.log(goodsTable);
						//console.log(results1);
//				for (let i = 0;i<results1.length;i++){
//							//console.log(results1[i]);
//			  					goodsTable.push(
//			  						<div key={i} className='goodsDiv'>
//			  							{results1[i]}
//			  						</div>
//			  					)
//			  				}
  }
  render() {
  	let h = document.body.clientHeight;
  	h = h - 100;
    return (
      <div className='sell'style={{height:h}}>
       <NavBar>购物车</NavBar>
        <div className='goods_divTable'>
        	{bmobGoodsTable}
        </div>
        <div className='b_bottom_div'>
    			<div className='b_buy' >
    				立即购买
    			</div>
    		</div>
      </div>
    );
  }
}
module.exports = Basket;
