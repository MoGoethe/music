import React ,{ Component } from "react"
import { connect } from "react-redux"
import { fromJS ,Map,toJS } from "immutable"
import { 
    TOGGLE_PLAY 
} from "../../actions"
import actionCreater from "../../actions/actionCreater"

import "./player.scss"

class Player extends Component{

    _setCanvasAni(){
        const that = this
        const canvas = that.refs.playerBg
        const audio = that.refs.audio
        const ctx = canvas.getContext('2d')
        const actx = new AudioContext()

        let _cw = canvas.clientWidth
        const _ch = canvas.clientHeight

        canvas.setAttribute('width',2*_cw)
        canvas.setAttribute('height',2*_ch)

        const colort = ctx.createLinearGradient(0, 0, 0, _ch * 2)
        colort.addColorStop(0, "rgba(255,0,0,.75)")
        colort.addColorStop(1, "rgba(18,196,139,.75)")

        const analyser = actx.createAnalyser()
        const audioSrc = actx.createMediaElementSource(audio)
        audioSrc.connect(analyser)
        analyser.connect(actx.destination)
        const num = 40
        const w = _cw / 40
        function draw() {

            let voicehigh = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(voicehigh)
            let step = Math.round(voicehigh.length / num)
            ctx.clearRect(0, 0, 2 * _cw, 2 * _ch)
            ctx.beginPath()
            for (let i = 1; i < num; i++) {
                let value = voicehigh[step * i]
                ctx.fillStyle = colort
                ctx.fillRect(_cw +(i-1) * w , 2 * _ch, 0.8 * w, -value + 1 )
                ctx.fillRect(_cw - i * w , 2 * _ch, 0.8 * w, -value + 1)
                ctx.fill()
            }
            requestAnimationFrame(draw)
        }
        draw()
    }

    _setProgressBar(audio){
        var that = this
        const duration = ~~audio.duration
        const progressBar = document.querySelector("#progress-bar");

        let progressTimer = setInterval(function(){
            let currentTime = audio.currentTime
            progressBar.style.width = (100 * currentTime / duration)+'%'
            that._setProgressTime(currentTime,duration)
            if(currentTime / duration > 0.999){
                progressBar.style.width = '0%'
                that._setProgressTime()
                that.props.dispatch(actionCreater(TOGGLE_PLAY))
                clearInterval(that.progressTimer)
            }
        },1000)

        this.progressTimer = progressTimer
    }

    _setProgressTime(t1=0,t2=0){
        const that = this
        const totalTime = that.refs.totalTime
        const curTime = that.refs.curTime
        function FormatTime(t){
            t = Math.floor(t)
            let m = (Math.floor(t / 60) >= 10) ? t : '0'+Math.floor(t / 60)
            let s = (t%60 >=10) ? t%60 : '0'+ t%60
            return m + ':' + s 
        }
        curTime.innerHTML = FormatTime(t1)
        totalTime.innerHTML = FormatTime(t2)
    }

    togglePlay(isPlaying){
        const that = this 
        const audio = that.refs.audio
        if(isPlaying){
            audio.pause()
            if(that.progressTimer){
                clearInterval(that.progressTimer)
            }
        }else{
            audio.play()
            that._setProgressBar(audio)
        }
        that.props.dispatch(actionCreater(TOGGLE_PLAY))
    }

    componentDidMount(){
        const that = this
        that._setCanvasAni()
    }

    render() {

        const {state} = this.props

        const isPlaying = state.get("isPlaying")
        const playingMusicId = state.get("playingMusicId")

        return (<div className="player">
            <audio ref="audio" preload="auto" crossOrigin="anonymous" className="audio" src={ "http://music.163.com/song/media/outer/url?id="+state.getIn(["playList",playingMusicId,"id"])+".mp3" }></audio>
            <div className="audio-bg"><canvas ref="playerBg"></canvas></div>
            <div className="player-i-a">
                <div className="i-photo"><img src={ state.getIn(["playList",playingMusicId,"picUrl"]) } alt="音乐图片" /></div>
                <div className="player-info">
                    <div className="i-text">
                        <span className="title">{ state.getIn(["playList",playingMusicId,"name"]) }</span>
                        <span className="actor">{ state.getIn(["playList",playingMusicId,"ar","name"]) }</span>
                    </div>
                    <div className="player-action">
                        <button title="上一曲" className="p-btn iconfont icon-shangyiqu101"></button>
                        <button onClick={this.togglePlay.bind(this,isPlaying)} title="播放/暂停" className={ isPlaying ? " p-btn p-lg-btn iconfont  icon-zantingstop" : "p-btn p-lg-btn iconfont  icon-bofang1"}></button>
                        <button title="下一曲" className="p-btn iconfont icon-shangyiqu1011"></button>
                        <button title="播放列表" className="p-btn iconfont icon-icon-liebiao btn-list"></button>
                        <button title="喜欢" className="p-btn iconfont icon-favorites"></button>
                        <button title="切换播放模式" className="p-btn iconfont icon-suijibofang01"></button>
                    </div>
                </div>
            </div>
            <div className="player-progress">
                <div className="progress"><div className="progress-bar" id="progress-bar"></div></div>
                <div className="progress-info"><span ref="curTime" className="cur-time">00:00</span> / <span ref="totalTime" className="total-time">00:00</span></div>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {

    return {state:state.playerState}
}

export default connect(mapStateToProps)(Player)