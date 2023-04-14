import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEventThunk, updateEventThunk } from '../../store/events';

function EventForm({ formType, event, group }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    //Halt right there, criminal scum!
    if (!sessionUser) {
        history.push('/')
    };

    if (sessionUser.id !== group.organizerId) {
        history.push('/')
    };

    //Error stuff
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState("");
    //New event variables
    const hostId = sessionUser.id;
    const [name, setName] = useState(event.name || "");
    const [type, setType] = useState(event.type || "");
    const [price, setPrice] = useState(event.price || "");
    const [description, setDescription] = useState(event.description || "");
    const [startDate, setStartDate] = useState(event.startDate || "");
    const [endDate, setEndDate] = useState(event.endDate || "");
    const [imgUrl, setImgUrl] = useState("")

    useEffect(() => {
        const imgSuffixes = ['png','jpeg','jpg'];
        const errObj = {};
        if (!name) errObj.name = 'Name is required';
        if (!type) errObj.type = 'Event Type is required';
        if (!price && price !== 0) errObj.price = 'Price is required';
        if (!description || description.length < 30) errObj.description = 'Description must be at least 30 characters long'
        if (!startDate) errObj.startDate = 'Event start is required';
        if (!endDate) errObj.endDate = 'Event end is required';
        if (imgUrl && !imgSuffixes.includes(imgUrl.split('.')[imgUrl.split('.').length - 1])) errObj.img = "Image URL must end in .png, .jpg, or .jpeg";

        if (Object.keys(errObj).length){
            setErrors(errObj);
        } else setErrors({})

    },[name, type, price, description, startDate, endDate, imgUrl])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length) return window.alert('Cannot submit');

        const newEvent = {
            venueId: null,
            hostId,
            name,
            type,
            price,
            description,
            startDate,
            endDate,
            capacity: 10
        }

        setHasSubmitted(false);

        if (formType === "Create"){
            try {
                const createdEvent = await dispatch(createEventThunk(newEvent, group.id))
                history.push(`/events/${createdEvent.id}`)
            } catch(e){
                const body = await e.json()
                return setErrors(body.errors);
            }
        } else {
            try{
                const editedEvent = await dispatch(updateEventThunk(newEvent, event.id));
                history.push(`/events/${event.id}`);
            } catch (e){
                const body = await e.json();
                return setErrors(body.errors)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <h1>{formType === 'Create' ? `Create an event for ${group.name}` : 'Update your event'}</h1>

                <label htmlFor='nameInput'>What is the name of your event?</label>
                <input
                    name="nameInput"
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {hasSubmitted && errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <div>
                <div>
                    <label htmlFor="typeSelect">Is this an in person or online event?</label>
                    <select name='typeSelect' onChange={e => setType(e.target.value)} value={type}>
                        <option value="" disabled>(select one)</option>
                        <option value="In person" >In person</option>
                        <option value="Online">Online</option>
                    </select>
                {hasSubmitted && errors.type && <p className='error'>{errors.type}</p>}
                </div>
                <div>
                    <label htmlFor="priceInput">What is the price for your event?</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)}
                    />
                </div>
                {hasSubmitted && errors.price && <p className='error'>{errors.price}</p>}
            </div>
            <div>
                <div>
                    <label htmlFor='startDateInput'>When does your event start?</label>
                    <input
                        type="text"
                        name='startDateInput'
                        value={startDate}
                        placeholder='MM/DD/YYYY, HH/mm AM'
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                {hasSubmitted && errors.startDate && <p className='error'>{errors.startDate}</p>}
                <div>
                    <label htmlFor='endDateInput'>When does your event end?</label>
                    <input
                        type="text"
                        name='endDateInput'
                        value={endDate}
                        placeholder='MM/DD/YYYY, HH/mm PM'
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                {hasSubmitted && errors.endDate && <p className='error'>{errors.endDate}</p>}

            </div>
            <div>
                <label htmlFor='imageInput'>Please add an image url for your event below</label>
                <input
                    type='text'
                    name='imageInput'
                    value={imgUrl}
                    placeholder='Image URL'
                    onChange={(e) => setImgUrl(e.target.value)}
                />
            </div>
            {hasSubmitted && errors.img && <p className='error'>{errors.img}</p>}
            <div>
                <label htmlFor='describeInput'>Please describe your event:</label>
                <textarea
                    name='describeInput'
                    value={description}
                    placeholder='Please include at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {hasSubmitted && errors.description && <p className='error'>{errors.description}</p>}
            <div>
                <button>{formType === 'Create' ? 'Create' : 'Update'} Event</button>
            </div>

        </form>
    )
}

export default EventForm;
