import { fromJS ,Map,toJS } from "immutable"
import { 
	GET_RECOMMEND_MUSIC 
} from "../actions"

const INITIAL_STATE = fromJS({
	 recommendMusicList:[],
})

const recommendMusicState = (state = INITIAL_STATE , action ) =>{
	switch(action.type){
		case GET_RECOMMEND_MUSIC :
			return state.set('recommendMusicList',action.data.result)
			break
		default : 
			return state
	}
}

export default recommendMusicState
