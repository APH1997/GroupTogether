import { useDispatch, useSelector } from "react-redux"
import { deleteMembershipThunk, editMembershipThunk } from "../../store/groups"

function ManageGroup({ group, event }) {
    const dispatch = useDispatch()
    const currGroup = useSelector(state => state.groups.singleGroup)

    function addMember(id) {
        dispatch(editMembershipThunk(group.id, id))
    }
    function removeMember(id) {
        dispatch(deleteMembershipThunk(group.id, id))
    }

    function handleChangeAttendeeStatus(){
        
    }
    return (
    <>
        {!event && (
            <div>
                <h1>{`${group.name} members`}</h1>
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
                                                <button onClick={() => addMember(membership.userId)}>Accept</button>
                                            }
                                            <button onClick={() => removeMember(membership.userId)}>Remove</button>
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
        )}
        {event && (
             <div>
             <h1>{`${event.name} attendees`}</h1>
             {Object.values(event.attendances).length > 1 ?
                 <table id="manage-attendees-table">
                     <thead>
                         <tr>
                             <th>Name</th>
                             <th>Status</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {Object.values(event.attendances)
                             .map(attendee =>
                                 attendee.userId !== event.Group.organizerId &&
                                 <tr className="member-card-container">
                                     <td>
                                         {attendee.User.firstName} {attendee.User.lastName}
                                     </td>
                                     <td>
                                     <select >
                                            <option
                                                value="waitlist"
                                                selected={attendee.status === "waitlist"}
                                            > Waitlist </option>
                                            <option
                                                value="attending"
                                                selected={attendee.status === "attending"}
                                            > Attending</option>
                                        </select>
                                     </td>
                                     <td>
                                         <button onClick={1}>Remove</button>
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
        )}
    </>
    )
}

export default ManageGroup
