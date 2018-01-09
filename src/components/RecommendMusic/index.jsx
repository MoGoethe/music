import React ,{ Component } from "react"
import { connect } from "react-redux"

import http from "../../utils/http"
import {
    RECOMMEND_HOT_MUSIC_LIST,
    RECOMMEND_FM,
    RECOMMEND_NEW_MUSIC_LIST,
    BANNER
} from "../../utils/api"

import { 
    GET_RECOMMEND_MUSIC 
} from "../../actions"
import actionCreater from "../../actions/actionCreater"

import RecommendMusicItem from "./RecommendMusicItem"

import "./rmusic.scss"

class RecommendMusic extends Component{

    async getRecommendMusic(){
        const that = this
        const res = await http.get(RECOMMEND_HOT_MUSIC_LIST,{limit:10})
        that.props.dispatch(actionCreater(GET_RECOMMEND_MUSIC,res.data))
    }

    componentDidMount(){
        const that = this
        //that.getRecommendMusic()
    }

    render() {

        const {state} = this.props
        return (<div className="recommend-music">
            <div className="rm-title">推荐歌单 <a href="#">More</a></div>
            <div className="rm-list">
                { 
                    state.get('recommendMusicList').map((item,index) => <RecommendMusicItem key={index} data={ item } />)
                }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {state : state.recommendMusicState}
}

export default connect(mapStateToProps)(RecommendMusic)