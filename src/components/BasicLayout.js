import React from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    marginLeft:200,
    paddingRight:224,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      marginLeft: this.state.collapsed?200:80,
      paddingRight: this.state.collapsed?224:104
    });
  }

  render() {
    const { content, open, select } = this.props;
    console.log(this.props);
    const openKeys = [open + ''];
    const selectKeys = [select + ''];
    console.log(openKeys);
    return (
      <LocaleProvider locale={zh_CN}><Layout>
        <Sider
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={selectKeys} defaultOpenKeys={["sub1", "sub2","sub3"]}>
            <SubMenu key="sub2" title={<span><Icon type="warning" theme="outlined" /><span>系统管理</span></span>}>
              <Menu.Item key="3">
                <Link to="/sys/user-manager"><span>设计单详情</span></Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sys/log-manager"><span>质量记录文件</span></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/sys/param-setting"><span>参数管理</span></Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/sys/role-manager"><span>角色配置</span></Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/sys/online-design"><span>在线设计单</span></Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.marginLeft }}>
          <Header style={{ background: '#fff', padding: 0,height:'64px',width:'100%', position:'fixed',zIndex:99,borderBottom:'1px solid #f1f1f1' }}>
            <table style={{width:'100%',height:'64'}}>
              <tbody>
                <tr>
  <td style={{width:'50%',paddingLeft:24}}><Icon style={{ fontSize: 24 }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}/>
                    </td>
                    <td style={{textAlign:'right',paddingRight:this.state.paddingRight}}>
                      <Avatar size="small" icon="user"/>&nbsp;&nbsp;用户
                    </td></tr>
              </tbody>
            </table>

          </Header>
          <Content style={{ marginTop: 64, padding: 24, height: '100%'  }}>
            {content}
          </Content>
        </Layout>
      </Layout></LocaleProvider>
    );
  }
}
