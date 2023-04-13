import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function EventForm({ formType, event, group }) {
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(group);

    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) {
        history.push('/')
    };

    if (sessionUser.id !== group.organizerId) {
        history.push('/')
    };

    const [name, setName] = useState(event.name || "");
    const [type, setType] = useState(event.type || "");
    const [capacity, setCapacity] = useState(event.capacity || "");
    const [price, setPrice] = useState(event.price || "");
    const [description, setDescription] = useState(event.description || "");
    const [startDate, setStartDate] = useState(event.startDate || "");
    const [endDate, setEndDate] = useState(event.endDate || "");
    const [imgUrl, setImgUrl] = useState("")

    console.log(startDate);

    return (
        <form>

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
            </div>
            <div>
                <div>
                    <label htmlFor="typeSelect">Is this an in person or online event?</label>
                    <select name='typeSelect' onChange={e => setType(e.target.value)} value={type}>
                        <option value="" disabled>(select one)</option>
                        <option value="In person" >In person</option>
                        <option value="Online">Online</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priceInput">What is the price for your event?</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
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
            <div>
                <label htmlFor='describeInput'>Please describe your event:</label>
                <textarea
                    name='describeInput'
                    value={description}
                    placeholder='Please include at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <button>{formType === 'Create' ? 'Create' : 'Update'} Event</button>
            </div>

        </form>
    )
}

export default EventForm;
