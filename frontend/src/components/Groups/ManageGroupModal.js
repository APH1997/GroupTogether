function ManageGroup({ group }) {
    function addMember(){

    }
    function removeMember(){
        
    }
    return (
        <div>
            <h1>{group.name} members</h1>
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
                                    <button>Remove</button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default ManageGroup
