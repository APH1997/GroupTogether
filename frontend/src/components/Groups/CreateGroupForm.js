import GroupForm from "./GroupForm";

const CreateGroupForm = () => {
    const group = {
        name: "",
        about: "",
        type: "",
        private: "",
        city: "",
        state: ""
    };

    return (
        <GroupForm formType="Create" group={group}/>
    )
}

export default CreateGroupForm;
