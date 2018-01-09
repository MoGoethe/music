import React ,{ Component } from "react"
import { connect } from "react-redux"

class Search extends Component {

    render() {
    	console.log("Search")
        return ( <div> Search page </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Search)