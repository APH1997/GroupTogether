function ManageGroup({group}){
    console.log(Object.values(group.Memberships))
    return (
        <div>
            <h1>Manage {group.name}</h1>
            <h2>Your members</h2>
            {Object.values(group.Memberships)
            .map(membership =>
                membership.User.id !== group.organizerId &&
                <div>
                    <p>
                        {membership.User.firstName} {membership.User.lastName}
                    </p>
                    <p>{membership.status}</p>
                </div>
            )}
        </div>
    )
}

export default ManageGroup
