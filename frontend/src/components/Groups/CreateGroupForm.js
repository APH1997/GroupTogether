import GroupForm from "./GroupForm";

const CreateGroupForm = () => {
    const group = {
        name: "",
        about: "",
        type: "",
        private: "",
        city: "easton",
        state: "CT"
    };

    return (
        <GroupForm formType="create" group={group}/>
    )
}

export default CreateGroupForm;
