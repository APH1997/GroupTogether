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
                    <h2>The people platform-- where interests become friendships</h2>
                    <p>Think you're the only person who's really into Warhammer figurine painting? Well think again!</p>
                </div>
                <div className='section-one-right'>
                    <img src="https://www.jing.fm/clipimg/detail/277-2771034_public-clipart.png"/>
                </div>
            </div>
            <div className='landing-section-two'>
                <h3>How GroupTogether works</h3>
                <p>Make an account, find a group that interests you, and come to an event. Or, you can start a group of your own!</p>
            </div>
            <div className='landing-section-three'>
                <div className='allGroupsBlurb'>
                    <img src="https://us.123rf.com/450wm/frikota/frikota1803/frikota180300112/98083069-fist-bump-icon-flat-design-illustration.jpg?ver=6" />
                    <NavLink to="/groups/all">See All Groups</NavLink>
                    <div>Groups Caption here</div>
                </div>
                <div className='allEventsBlurb'>
                    <img src='https://images.template.net/87772/free-cartoon-ticket-vector-bwdmf.jpg'/>
                    <NavLink to="/events/all">Find an Event</NavLink>
                    <div>Events caption here</div>
                </div>
                <div className='createGroupBlurb'>
                    <img src="https://www.pngitem.com/pimgs/m/144-1447051_transparent-group-icon-png-png-download-customer-icon.png"/>
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
