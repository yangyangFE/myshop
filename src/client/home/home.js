/**
 * Created by  yangyang11 on 2017/3/10.
 * 首页
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {SearchBar } from 'antd-mobile';
import MyCarousel from './myCarousel';
import './home.css';
class Home extends Component{
	constructor(props){
	    super(props);
		this.state = {
		};
	}
  render() {
  	let h = document.body.clientHeight;
  	h = h - 100;
  	let h1 = h-500;
    return (
      <div className='content' style={{height:h}}>
          <header>
          	  <div className='searchBar'>
          	  	 <SearchBar placeholder="搜索" />
          	  </div>
              <div className='carousel'>
              	<MyCarousel />
              </div>
          </header>
          <section style={{height:h1}}>
          	<div className='assortment'>
                <Link to={{ pathname: 'classSearch?id=' + 'book'}} style={{ textDecoration:'underline' }}>
	                <div className='ass1'>
	                   二手书籍
	                </div>
	            </Link>
	            <Link to={{ pathname: 'classSearch?id='+ 'appliances'}} style={{ textDecoration:'underline' }}>
	                <div className='ass1' >
	                   二手电器
	                </div>
                </Link>
                <Link to={{ pathname: 'classSearch?id='+ 'clothes'}} style={{ textDecoration:'underline' }}>
	                <div className='ass1'>
	                   二手衣物
	                </div>
                </Link>
                <Link to={{ pathname: 'classSearch?id='+ 'others'}} style={{ textDecoration:'underline' }}>
	                <div className='ass1' >
	                   其他物品
	                </div>
                </Link>
            </div>
            <div className='intr1'>
            	带你走进原生态农场
            </div>
            <div className='tag1'>精选农场品
            </div>
            <div className='assortment'>
            	<div className='ass2'>推荐1
            	</div>
            	<div className='ass2'>推荐2
            	</div>
							<div className='ass2'>推荐3
            	</div>
							<div className='ass2'>推荐4
            	</div>
            	<div className='ass2'>推荐5
            	</div>
            	<div className='ass2'>推荐6
            	</div>
            	<div className='ass2'>推荐7
            	</div>
            	<div className='ass2'>推荐8
            	</div>
            </div>
          </section>
      </div>
    );
  }
}
module.exports = Home;
