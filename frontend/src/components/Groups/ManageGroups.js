import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import GroupsPage from "."

function ManageGroupsPage(){
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const {userId} = useParams()

    if (!user) return <h1>Loading..</h1>
    if (user.id !== Number(userId)) history.push('/')

    return (
        <GroupsPage manage={true} user={user}/>
    )
}

export default ManageGroupsPage
