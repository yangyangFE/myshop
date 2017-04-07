import React, {Component} from 'react';
import { Checkbox, NavBar, Icon } from 'antd-mobile';
import { Link } from 'react-router';
var goodsTable=[];
var bmobGoodsTable = [];
var user_goods_objID = [];
const CheckboxItem = Checkbox.CheckboxItem;
class Order extends Component{
	 constructor(props) {
    super(props);
    this.state = {
    	goodsTable1:[],
    	selectGoodsIdArray:[],
    }
  }
  componentWillMount(){
	let user_id = localStorage.getItem("user_id");
	console.log(user_id);
	Bmob.initialize("696b9e6995b8fe80ced12fa1f1c3b5ac", "30d3e9ba07c4ac727d5a808b2fa58c75");
	bmobGoodsTable.length = 0;
    var Goods = Bmob.Object.extend("goods");
    var query = new Bmob.Query(Goods);
    query.equalTo("buyer_id",user_id);
   	query.find({
		success: function(results) {
	  // 查询成功，调用get方法获取对应属性的值
	  	for(let i=0;i<results.length;i++){
	  	  if(this.props.orderClass == 'waitGetGoods'){
	  	  	if(results[i].get('buy_flag') == '已发货'){
	  	  		bmobGoodsTable.push(
					<div className="goodsDiv" key={i} >
						<Link to={{ pathname: 'order/orderCourier?id='+ results[i].id}} style={{ textDecoration:'underline' }}>	
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
						</Link>		
					</div>
  		 		 ); 
	  	  	}
	  	  }else if(this.props.orderClass == 'done'){
	  	    if(results[i].get('buy_flag') == '已完成'){
	  	  		bmobGoodsTable.push(
					<div className="goodsDiv" key={i} >
						<Link to={{ pathname: 'order/doneAfter?id='+ results[i].id}} style={{ textDecoration:'underline' }}>	
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
						</Link>		
					</div>
  		 		 ); 
	  	  	}
	  	  }else{
	  	  	bmobGoodsTable.push(
					<div className="goodsDiv" key={i} >
						<Link to={{ pathname: 'order/orderCourier?id='+ results[i].id}} style={{ textDecoration:'underline' }}>	
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
						</Link>		
					</div>
  		 		 ); 
	  	  }
	      
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
  render() {
  	let h = document.body.clientHeight;
  	h = h - 100;
    return (
      <div>
        <div>
        	{bmobGoodsTable}
        </div>
      </div>
    );
  }
}
module.exports = Order;
