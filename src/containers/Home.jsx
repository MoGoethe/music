import PropTypes from 'prop-types';
import React ,{ Component } from "react"
import { connect } from "react-redux"
import http from "../utils/http"

import "../components/Scss/basic.scss"
import "../components/Scss/iconfont.css"

import FreeScrollbar from "../components/ScrollBar"
import Player from "../components/Player"
import Header from "../components/Header"
import Banner from "../components/Banner"
import RecommendMusic from "../components/RecommendMusic"

import { 
    TOGGLE_PLAY 
} from "../actions"
import actionCreater from "../actions/actionCreater"

class Home extends Component {

    componentDidMount(){
        /*
            获取初始化数据  发送各种action
        */
    }

    render() {
        return (
                <div className="center">
                    <Banner />
                    <RecommendMusic />
                </div>
            )
    }
}
/*
Home.propTypes = {
    todolist: PropTypes.objectOf(
        PropTypes.shape({
            todo: PropTypes.string.isRequired,
            istodo: PropTypes.bool.isRequired,
            doing: PropTypes.bool.isRequired,
            done: PropTypes.bool.isRequired,
        }).isRequired).isRequired,
};
*/

const mapStateToProps = state => {
    //console.log(state.todolist)
    return state
}

export default connect(mapStateToProps)(Home)