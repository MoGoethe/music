import React ,{ Component } from "react"
import { connect } from "react-redux"

class PlayList extends Component {

    render() {
        return ( <div> PlayList page </div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(PlayList)