import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEventImageThunk, createEventThunk, updateEventThunk } from '../../store/events';
import './EventForm.css';
import MapContainer from '../Maps';
import states from '../Maps/states';
import { useMarker } from '../../context/MarkerCoords';

function EventForm({ formType, event, group }) {
    const { setLat, lat, setLng, lng } = useMarker()

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
    const [price, setPrice] = useState(event.price || 0);
    const [description, setDescription] = useState(event.description || "");
    const [startDate, setStartDate] = useState(event.startDate.split('T')[0] || "");
    const [endDate, setEndDate] = useState(event.endDate.split('T')[0] || "");
    const [image, setImage] = useState(null)
    const [startTime, setStartTime] = useState(event.startTime || "")
    const [endTime, setEndTime] = useState(event.endTime || "")

    //want to set lat/lng context ONCE
    useEffect(() => {
        if (formType === "Update") {
            setLat(event.lat)
            setLng(event.lng)
        } else {
            setLat(states[group.state].lat)
            setLng(states[group.state].lng)
        }
    }, [])

    function handleStartTimeErrors(){
        const [startHour, startMinute] = startTime.split(':').map(ele => Number(ele))
        const [endHour, endMinute] = endTime.split(':').map(ele => Number(ele))
        if (startHour < endHour){
            return true
        }
        if (startHour === endHour){
            if (startMinute < endMinute){
                return true
            }
        }
        return false
    }

    useEffect(() => {
        const errObj = {};
        if (!name || !name.trim()) errObj.name = 'Name is required';
        if (!type) errObj.type = 'Event Type is required';
        if (!price && price !== 0) errObj.price = 'Price is required';
        if (!description || !description.trim() || description.length < 30) errObj.description = 'Description must be at least 30 characters long'
        if (!startDate) errObj.startDate = 'Event start date is required';
        if (new Date(startDate) < Date.now()) {
            console.log(startDate)
            errObj.startDate = "Events must begin tomorrow or later"
        }
        if (!startTime) errObj.startTimeReq = 'Event start time is required';
        if (!endDate) errObj.endDate = 'Event end date is required';
        if (new Date(endDate) < new Date(startDate)){
            errObj.endDate = 'End date cannot be before start date'
        }

        if (startTime && !handleStartTimeErrors()) errObj.startTime = "Start time must be before end time"

        if (!endTime) errObj.endTime = 'Event end time is required';


        if (Object.keys(errObj).length) {
            setErrors(errObj);
        } else setErrors({})


    }, [name, type, price, description, startDate, endDate, startTime, endTime])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length) return;

        const newEvent = {
            lat,
            lng,
            hostId,
            name,
            type,
            price,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
            capacity: 10
        }

        setHasSubmitted(false);

        if (formType === "Create") {
            try {
                const createdEvent = await dispatch(createEventThunk(newEvent, group.id))
                //Check if image was given
                if (image) {
                    await dispatch(createEventImageThunk(createdEvent.id, image))
                }

                history.push(`/events/${createdEvent.id}`)
            } catch (e) {
                const body = await e.json()
                return setErrors(body.errors);
            }
        } else {
            try {
                const editedEvent = await dispatch(updateEventThunk(newEvent, event.id));
                if (image) {
                    await dispatch(createEventImageThunk(editedEvent.id, image))
                }

                history.push(`/events/${event.id}`);
            } catch (e) {
                const body = await e.json();
                return setErrors(body.errors)
            }
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };
    return (
        <form id="event-form" onSubmit={handleSubmit}>

            <div className='event-form-section-one'>
                <h2>{formType === 'Create' ? `Create an event for ${group.name}` : 'Update your event'}</h2>

                <label htmlFor='nameInput'>What is the name of your event?</label>
                <input
                    name="nameInput"
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {hasSubmitted && errors.name && <p className='errors'>{errors.name}</p>}
            </div>
            <div className="event-form-section-two">
                <div>
                    <label htmlFor="typeSelect">Is this an in person or online event?</label>
                    <select name='typeSelect' onChange={e => setType(e.target.value)} value={type}>
                        <option value="" disabled>(select one)</option>
                        <option value="In person" >In person</option>
                        <option value="Online">Online</option>
                    </select>
                    {hasSubmitted && errors.type && <p className='errors'>{errors.type}</p>}
                </div>
                {type === "In person" &&
                    <div>
                        Drop a pin for attendees!
                        <MapContainer
                            eventLoc={{ lat, lng }}
                            editing={true}
                        />
                    </div>
                }
                <div>
                    <label htmlFor="priceInput">What is the price for your event?</label>
                    <div id="currency-symbol">$</div>
                    <input
                        type="number"
                        step=".01"
                        placeholder="0.00"
                        value={price === 0 ? "" : price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        min={0}
                        max={999}
                    />

                </div>
                {hasSubmitted && errors.price && <p className='errors'>{errors.price}</p>}
            </div>
            <div className='event-form-section-three'>
                <div>
                    <label htmlFor='startDateInput'>When does your event start?</label>
                    <div className='date-and-time-inputs'>
                        <input
                            type="date"
                            name='startDateInput'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>at</label>
                        <input
                            type='time'
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                </div>
                {hasSubmitted && errors.startDate && <p className='errors'>{errors.startDate}</p>}
                {hasSubmitted && errors.startTimeReq && <p className='errors'>{errors.startTimeReq}</p>}
                {errors.startTime && <p className='errors'>{errors.startTime}</p>}
                <div>
                    <label htmlFor='endDateInput'>When does your event end?</label>
                    <div className='date-and-time-inputs'>
                        <input
                            type="date"
                            name='endDateInput'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <label>at</label>
                        <input
                            type='time'
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>
                {hasSubmitted && errors.endDate && <p className='errors'>{errors.endDate}</p>}
                {hasSubmitted && errors.endTime && <p className='errors'>{errors.endTime}</p>}

            </div>
            <div className='event-form-section-four'>
                <label htmlFor='imageInput'> (Optional) Please upload an image for your event below:</label>
                <input
                    style={{border: "none"}}
                    type='file'
                    name='imageInput'
                    accept='image/*'
                    onChange={(e) => updateFile(e)}
                />
            </div>

            <div className='event-form-section-five'>
                <label htmlFor='describeInput'>Please describe your event:</label>
                <textarea
                    rows='8'
                    cols='12'
                    name='describeInput'
                    value={description}
                    placeholder='Please include at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {hasSubmitted && errors.description && <p className='errors'>{errors.description}</p>}
            <div className='event-form-section-six'>
                <button id="submit-btn">{formType === 'Create' ? 'Create' : 'Update'} Event</button>
            </div>

        </form>
    )
}

export default EventForm;
