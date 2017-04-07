/**
 * Created by  yangyang11 on 2017/3/11.
 * 首页轮播图插件
 */
import React, {Component} from 'react';
import {Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import './myCarousel.css';

class MyCarousel extends React.Component {
  constructor(props){
	    super(props);
		this.state = {
			data: ['', '', ''],
    		initialHeight: 200
		};
	}
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'AiyWuByWklrrUDlFignR'],
      });
    }, 100);
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <WingBlank>
        <div className="sub-title">normal</div>
        <Carousel
          className="my-carousel" autoplay={true} infinite={true} selectedIndex={1} 
          beforeChange={(from, to) => console.log()}
          afterChange={index => console.log()}
        >
          {this.state.data.map(ii => (
            <a href="http://www.baidu.com" key={ii} style={hProp}>
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
module.exports = MyCarousel;