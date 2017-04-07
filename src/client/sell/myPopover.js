import React,{Component} from 'react';
import { Popover, NavBar, Icon } from 'antd-mobile';

const Item = Popover.Item;

class MyPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	visible: false,
    	selected: ''
    }
    this.onSelect=this.onSelect.bind(this);
    this.handleVisibleChange=this.handleVisibleChange.bind(this);
  }
  onSelect(opt){
  	 this.setState({
      visible: false,
      selected: opt.props.value,
    });
    location.hash='/addGoods';
  }
  handleVisibleChange(visible){
  	 this.setState({
      visible,
    });
  }
  render() {
    let offsetX = -10; // just for pc demo
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }
    return (<div>
      <NavBar iconName={false} mode="light" rightContent={
        <Popover mask
          visible={this.state.visible}
          overlay={[
            (<Item key="4" value="scan" icon={ <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />} data-seed="logId">添加</Item>),
          ]}
          popupAlign={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [offsetX, 15],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 0.3rem',
            marginRight: '-0.3rem',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      }
      >
        物品上架
      </NavBar>
    </div>);
  }
}
module.exports = MyPopover;
