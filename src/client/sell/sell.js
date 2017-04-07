/**
 * Created by  yangyang11 on 2017/3/5.
 * 上架物品页面，可以展示已上架物品，也可以选择上架新物品
 */
import React, {Component} from 'react';
import { Checkbox, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
import MyPopover from './myPopover';
import './sell.css';
var goodsTable=[];
var bmobGoodsTable = [];
const CheckboxItem = Checkbox.CheckboxItem;
class Sell extends Component{
	 constructor(props) {
    super(props);
    this.state = {
    	goodsTable1:[],
    }
    this.getBmobGoods = this.getBmobGoods.bind(this);
  }
	getBmobGoods(){
		return this.state.goodsTable1[0].goodsName;
	}
  componentWillMount(){
  	//console.log(this);
  	let user_id = localStorage.getItem("user_id");
  	Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
  					bmobGoodsTable.length = 0;
			        var Goods = Bmob.Object.extend("goods");
			        var query = new Bmob.Query(Goods);
			        query.equalTo("seller_id",user_id);
			       	query.find({
			  			success: function(results) {
			  				for (let i = 0;i<results.length;i++){
			  					let path_name;
			  					if(results[i].get('buy_flag') == '已付款'){
			  						path_name = 'sendGoods';
			  					}else{
			  						path_name = 'goodsShow';
			  					}
			  					bmobGoodsTable.push(
			  						<Link to={{ pathname:path_name + '?id=' + results[i].id}} style={{ textDecoration:'underline' }} key={i}>
				  						<div className="goodsDiv" key={i} >
				  							<div className='selectButton'>
				  								 <CheckboxItem  onChange={() => console.log('changed')}>
										          </CheckboxItem>
				  							</div>
				  							<div className='goodsImage'>
				  								<img src={results[i].get('goods_pic')[0].url} 
				  								alt={''} 
				  								className="noPhoto" 
				  								style={{display:'block',width:'90%',height:'100%'}}
				  							/>
				  							</div>
				  							<div className='right'>
				  								<div className='name'>
				  									{results[i].get('goods_name')}
				  								</div>
				  								<div className='r_middle'>
					  								<div className="goods_class">
					  									分类:{results[i].get('goods_class')}
					  								</div>
					  								<div className='buy_flag'>
					  									状态:{results[i].get('buy_flag')}
					  								</div>
					  							</div>	
				  								<div className='r_bottom'>
				  									<div className='price'>¥{results[i].get('goods_preice')}</div>
				  									<div className='number'>数量:{results[i].get('goods_number')}</div>
				  								</div>
				  							</div>
				  						</div>
			  						</Link>
			  					);
			  				}
			  				this.setState({
			  					goodsTable1:bmobGoodsTable
			  				});
			  				//console.log(bmobGoodsTable);
						//var score = results[0].get('keyword');
			  			}.bind(this),
			  			error: function(object, error) {
			   			 // 查询失败
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
        <MyPopover />
        <div className='goods_divTable'>
        	{bmobGoodsTable}
        </div>
      </div>
    );
  }
}
module.exports = Sell;
