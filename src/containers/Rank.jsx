import React ,{ Component } from "react"
import { connect } from "react-redux"

class Rank extends Component {

    render() {
    	console.log("rank")
        return ( <div> Rank </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Rank)