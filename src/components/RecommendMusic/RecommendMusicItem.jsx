import React from "react"

const RecommendMusicItem = ({data}) =>(
	<div className="m-list-item">
	    <a href={"/list-detail/"+data.id} className="item-link">
	        <img className="item-img" src={""+data.picUrl+""}  />
	        <img className="item-cd" src="/static/cd.svg"  />
	    </a>
	    <span className="item-play-count">{data.playCount}</span>
	    <p className="item-tag">{data.alg}</p>
	    <p className="item-name">{data.name}</p>
	</div>
)

export default RecommendMusicItem