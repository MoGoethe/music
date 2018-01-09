import React ,{ Component } from "react"
import { connect } from "react-redux"

class New extends Component {

    render() {
        return ( <div> New page</div>)
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(New)