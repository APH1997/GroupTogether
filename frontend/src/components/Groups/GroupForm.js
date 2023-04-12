import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupThunk, updateGroupThunk } from '../../store/groups';

function GroupForm({ formType, group }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser){
        history.push('/')
    }
    
    if (formType === "Update" && sessionUser.id !== group.organizerId){
        history.push('/')
    }

    const dispatch = useDispatch();

    const [name, setName] = useState(group?.name);
    const [about, setAbout] = useState(group?.about);
    const [type, setType] = useState(group?.type);
    const [isPrivate, setIsPrivate] = useState(group?.private);
    const [imgUrl, setImgUrl] = useState('');

    const [cityState, setCityState] = useState(group?.city && group?.state ? `${group.city}, ${group.state}` : "")
    const [city, setCity] = useState(group?.city || '')
    const [state, setState] = useState(group?.state || '');

    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const setCityAndState = (e, city, state) => {
        let trimmedState;
        if (state){
            trimmedState = state.trim();
        } else trimmedState = state;

        setCityState(e.target.value);
        setCity(city)
        setState(trimmedState)
    }
    useEffect(() => {
        const imgSuffixes = ['png','jpeg','jpg']
        const errObj = {};
        if (!city || !state) errObj.location = "Location is required";
        if (!name) errObj.name = "Name is required";
        if (about < 30) errObj.about = "Description must be at least 30 characters long";
        if (!type) errObj.type = "Group Type is required";
        if (typeof isPrivate !== 'boolean') errObj.private = "Visibility type is required";
        if (imgUrl && !imgSuffixes.includes(imgUrl.split('.')[imgUrl.split('.').length - 1])) errObj.img = "Image URL must end in .png, .jpg, or .jpeg";

        if (Object.keys(errObj).length){
            setErrors(errObj);
        } else setErrors({})

    }, [name, about, type, isPrivate, imgUrl, cityState])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);

        if (Object.keys(errors).length) return window.alert('Cannot submit')

        const newGroup = {
            name,
            about,
            type,
            private: isPrivate,
            city,
            state
        }
        setHasSubmitted(false);

        if (formType === "Create"){
            const createdGroup = await dispatch(createGroupThunk(newGroup))
            if (createdGroup.errors){
                setErrors(createdGroup.errors)
            } else {
                history.push(`/groups/${createdGroup.id}`)
            }
        } else {
            const update = await dispatch(updateGroupThunk(newGroup, group.id))
            if (update.errors){
                setErrors(update.errors)
            } else {
                history.push(`/groups/${update.id}`)
            }
        }
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
                        value={cityState}
                        onChange={(e) => setCityAndState(e, e.target.value.split(',')[0], e.target.value.split(',')[1])}
                    />
                    {hasSubmitted && errors.location && <p className='errors'>{errors.location}</p>}

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
                {hasSubmitted && errors.name && <p className='errors'>{errors.name}</p>}
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
                {hasSubmitted && errors.about && <p className='errors'>{errors.about}</p>}
            </div>
            <div>
                <h2>Final steps...</h2>

                <label htmlFor='groupType'>Is this an in person or online group?</label>
                <select name='groupType' onChange={e => setType(e.target.value)} value={type}>
                    <option value="" disabled>(select one)</option>
                    <option value="In person" >In person</option>
                    <option value="Online">Online</option>
                </select>
                {hasSubmitted && errors.type && <p className='errors'>{errors.type}</p>}

                <label htmlFor='groupPrivacy'>Is this group private or public?</label>
                <select name='groupPrivacy' onChange={e => setIsPrivate(e.target.value === "true" ? true : false)} value={isPrivate}>
                    <option value="" disabled>(select one)</option>
                    <option value={true}>Private</option>
                    <option value={false}>Public</option>
                </select>
                {hasSubmitted && errors.private && <p className='errors'>{errors.private}</p>}

                <label>
                    Please add an image url for your group below:
                    <input
                        type="text"
                        value={imgUrl}
                        placeholder="Image Url"
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </label>
                {hasSubmitted && errors.img && <p className='errors'>{errors.img}</p>}

            </div>
            <div>
                <button>{formType} Group</button>
            </div>
        </form>


    )
}
export default GroupForm;
