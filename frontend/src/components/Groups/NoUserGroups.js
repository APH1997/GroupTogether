import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function NoGroups(){
    const history = useHistory()
    return (
        <div>
            <h1>Oops! No groups!</h1>

            <p>
                Browse our Groups and join one, or create your own!
            </p>
            <div>
                <button onClick={(e) => history.push('/groups/all')}>Find Groups</button>
                <button onClick={(e) => history.push('/groups/new')}>Create a Group</button>
            </div>
        </div>
    )
}

export default NoGroups
