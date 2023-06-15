import { useDispatch, useSelector } from "react-redux"
import { deleteMembershipThunk } from "../../store/groups"

function ManageGroup({ group }) {
    const dispatch = useDispatch()
    const currGroup = useSelector(state => state.groups.singleGroup)
    function addMember(){

    }
    function removeMember(id){
        dispatch(deleteMembershipThunk(group.id, id))
    }

    return (
        <div>
            <h1>{group.name} members</h1>
            {Object.values(group.Memberships).length > 1 ?
            <table id="manage-members-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(group.Memberships)
                        .map(membership =>
                            membership.User.id !== group.organizerId &&
                            <tr className="member-card-container">
                                <td>
                                    {membership.User.firstName} {membership.User.lastName}
                                </td>
                                <td>{membership.status}</td>
                                <td>
                                    {membership.status === "pending" &&
                                        <button>Accept</button>
                                    }
                                    <button onClick={() =>removeMember(membership.User.id)}>Remove</button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            :
            <>
                <h2>Any minute now...</h2>
                <p>Someone's bound to join your awesome group!</p>
            </>

            }
        </div>
    )
}

export default ManageGroup
