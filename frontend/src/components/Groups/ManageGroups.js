import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

function ManageGroupsPage(){
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const {userId} = useParams()
    console.log(user.id, userId)

    if (!user) return <h1>Loading..</h1>
    if (user.id !== Number(userId)) history.push('/')

    return (
        <h1>Managing groups</h1>
    )
}

export default ManageGroupsPage
