import { GET_ARTICLE_LIST } from "../actions"
import { fromJS, Map, toJS } from "immutable"
import {
    TOGGLE_PLAY
} from "../actions"

const INITIAL_STATE = fromJS({
    isPlaying: false, //播放状态
    isMute: false, //静音
    playList: [{
        id:523251118,
        name:"说散就散",
        alia:"电影《前任3：再见前任》主题曲",
        picUrl:"http://p1.music.126.net/e50cdn6BVUCFFHpN9RIidA==/109951163081271235.jpg",
        ar:{
            id:"10473",
            name:"袁娅维",
        }
    },{
        id:526464369,
        name:"氤氲",
        alia:"",
        picUrl: "http://p1.music.126.net/hjBt8ts9iNGSuH0k2XO2Gg==/109951163095111913.jpg",
        ar:{
            id:"1080047",
            name:"宗儒",
        }
    },{
        id:528271287,
        name:"犴达罕",
        alia:"",
        picUrl: "http://p1.music.126.net/xd3UWxrOVrwwMPNQB8RfJw==/109951163101029187.jpg",
        ar:{
            id:"1058228",
            name:"陈鸿宇",
        }
    },
    ],
    isShowPlayList: false, //播放列表是否展示
    playingMusicId: 0, //正在播放的音乐，使用数组下标
    playModel: 0, //播放模式,包括 1：循环    2： 随机    3：单曲循环
})

const playerState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_PLAY:
            return state.set('isPlaying', !state.get('isPlaying'))
            break
        default:
            return state
    }
}

export default playerState