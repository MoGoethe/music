import React ,{ Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import "./header.scss"

class Header extends Component{

	render() {
        return (<div className="header">
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/">发现音乐</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/rank">排行榜</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/playlist">歌单</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/fm">主播电台</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/new">最新音乐</Link>
        	<span className="cut-line">/</span>
        	<Link className="menu-link-item" to="/search">搜索</Link>
        	<span className="cut-line">/</span>
        </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Header)