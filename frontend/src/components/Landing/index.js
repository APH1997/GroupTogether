import {NavLink} from 'react-router-dom';
import './Landing.css';
import {useSelector} from 'react-redux';

function LandingPage(){
    const user = useSelector(state => state.session.user)

    return (
        <>
        <div className='landing-main'>
            <div className='landing-section-one'>
                <div className='section-one-left'>
                    <h2>Title</h2>
                    <p>Intro text paragraph. Lorum ipsum and all that jazz</p>
                </div>
                <div className='section-one-right'>
                    <div>this will be an info graphic</div>
                </div>
            </div>
            <div className='landing-section-two'>
                <h3>Subtitle: How Meetup works or w/e</h3>
                <p>Caption for subtitle</p>
            </div>
            <div className='landing-section-three'>
                <div>
                    <div>Groups caption here</div>
                    <NavLink to="/groups/all">See All Groups</NavLink>
                    <div>Groups Caption here</div>
                </div>
                <div>
                    <div>Events icon here</div>
                    <NavLink to="/events/all">Find an Event</NavLink>
                    <div>Events caption here</div>
                </div>
                <div>
                    <div>Start new group icon here</div>
                    {
                    user && Object.values(user).length > 0 &&
                        <NavLink to="/groups/new">Start a New Group</NavLink> ||
                        <div className='noAuth'>Start a New Group</div>
                    }

                    <div>Start new group caption here</div>
                </div>
            </div>
            <button className='landing-section-four'>Join Meetup</button>
        </div>

        </>
    )
}

export default LandingPage;
