import React, {Component} from "react"

class Attendance extends Component{
    
    addMemberRow =(member, i) => {
        return(
            <tr key={i}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        )
    }

    render(){
    return(
        <div>
            <h2>Attendance - {this.props.audience.length} Members</h2>
            <table className="table table-striped">
                <thead>
                    <tr>Audience Member</tr>
                    <tr>Socket ID</tr>
                </thead>
                <tbody>
                    {this.props.audience.map(this.addMemberRow)}
                </tbody>
            </table>
        </div>
    )}
}

export default Attendance