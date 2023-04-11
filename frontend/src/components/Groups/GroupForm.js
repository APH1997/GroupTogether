import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function GroupForm({ formType, group }) {
    const [name, setName] = useState(group?.name);
    const [about, setAbout] = useState(group?.about);
    const [type, setType] = useState(group?.type);
    const [isPrivate, setIsPrivate] = useState(group?.private);
    const [imgUrl, setImgUrl] = useState('');
    const [cityState, setCityState] = useState(`${group?.city}, ${group?.state}`)
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        const imgSuffixes = ['png','jpeg','jpg']
        const errObj = {};
        if (cityState === ",") errObj.location = "Location is required";
        if (!name.length) errObj.name = "Name is required";
        if (about.length < 30) errObj.about = "Description must be at least 30 characters long";
        if (!type.length) errObj.type = "Group Type is required";
        if (!isPrivate.length) errObj.private = "Visibility type is require";
        if(!imgSuffixes.includes(imgUrl.split('.')[imgUrl.split('.').length - 1])) errObj.img = "Image URL must end in .png, .jpg, or .jpeg";
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>{formType === 'Create' ? 'Start a New Group' : 'Update Your Group'}</h1>
            <div>
                <h2>Set your group's location</h2>
                <p>Meetup groups meet locally, in person and online. We'll connect you with people
                    in your area, and more can join you online.</p>
                    <input
                        type="text"
                        placeholder="city, STATE"
                        value={formType==='Create' ? null : cityState}
                        onChange={(e) => setCityState(e.target.value)}
                    />

            </div>
            <div>
                <h2>What will your group's name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about.
                    Feel free to get creative! You can edit this later if you change your mind.</p>
                <input
                    type="text"
                    placeholder="What is your group name?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <h2>Describe the purpose of your group.</h2>
                <p>People will see this when we promote your group, but you'll be able to add to it later, too</p>
                <ol>
                    <li>What's the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea
                    value={about}
                    placeholder="Please write at least 30 characters."
                    onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            <div>
                <h2>Final steps...</h2>

                <label htmlFor='groupType'>Is this an in person or online group?</label>
                <select name='groupType' onChange={e => setType(e.target.value)} value={type}>
                    <option value="" disabled>(select one)</option>
                    <option value="In person" >In person</option>
                    <option value="Online">Online</option>
                </select>

                <label htmlFor='groupPrivacy'>Is this group private or public?</label>
                <select name='groupPrivacy' onChange={e => setIsPrivate(e.target.value)} value={isPrivate}>
                    <option value="" disabled>(select one)</option>
                    <option value={true}>Private</option>
                    <option value={false}>Public</option>
                </select>

                <label>
                    Please add an image url for your group below:
                    <input
                        type="text"
                        value={imgUrl}
                        placeholder="Image Url"
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </label>

            </div>
            <div>
                <button>{formType} Group</button>
            </div>
        </form>


    )
}
export default GroupForm;
