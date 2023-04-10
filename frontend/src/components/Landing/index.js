import {NavLink} from 'react-router-dom'
import './Landing.css'
function LandingPage(){
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
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='landing-section-four'>4</div>
        </div>

        <NavLink to="/groups/all">See All Groups</NavLink>
        <NavLink to="/events/all">Find an Event</NavLink>
        <NavLink to="/groups/new">Start a New Group</NavLink>
        </>
    )
}

export default LandingPage;
