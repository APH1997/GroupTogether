# GroupTogether

GroupTogether is a loose clone of MeetUp. Find groups based on activities or interests and peruse their hosted events.

Check out [GroupTogether](https://group-together.onrender.com)


## Technologies Used
![javascript](https://github.com/APH1997/GroupTogether/assets/118479307/e8626769-f6c6-460d-b81d-1909df939a9e)
![expressjs](https://github.com/APH1997/GroupTogether/assets/118479307/c310c5d9-f261-4535-8a54-3c9bf6a5ab57)
![nodejs](https://github.com/APH1997/GroupTogether/assets/118479307/9da090b9-13d5-4eb7-b6cb-c8b720fb8acb)
![html5](https://github.com/APH1997/GroupTogether/assets/118479307/5c4700db-0cd2-4c17-ab53-66c5d3dcaff7)
![css3](https://github.com/APH1997/GroupTogether/assets/118479307/8fd09621-af42-45ef-8063-90822cffa262)
![react](https://github.com/APH1997/GroupTogether/assets/118479307/04bb52f7-df34-44fc-ac1c-7b99ef9ec667)
![redux](https://github.com/APH1997/GroupTogether/assets/118479307/027a132c-cd32-40ce-a576-73f8ba3ba455)


## Splash Page
<img width="1434" alt="splash" src="https://github.com/APH1997/GroupTogether/assets/118479307/6bbf8cee-1809-4283-9d9d-e27e9e1ea5af">

## Groups
<img width="1152" alt="groups" src="https://github.com/APH1997/GroupTogether/assets/118479307/645a73a3-b0a0-48b3-8453-addd7beff604">

## Group Details Page
<img width="1425" alt="groupbyId" src="https://github.com/APH1997/GroupTogether/assets/118479307/f9dfc70c-64da-4926-a35a-e89340e8e2d2">

## Events
<img width="1408" alt="events" src="https://github.com/APH1997/GroupTogether/assets/118479307/4b4c06be-2b44-4ce5-bcf6-c2651f5f8d94">

## Event Details Page
<img width="1323" alt="eventByid" src="https://github.com/APH1997/GroupTogether/assets/118479307/9d7b4fb6-df6b-4199-bcd4-74fdba1f72f4">

## Getting Started
1. Clone this repository:
  * [https://github.com/APH1997/GroupTogether](https://github.com/APH1997/GroupTogether.git)

2. Install frontend and backend dependencies by opening a terminal in each end's folder and running:
  * npm install

3. Create a .env file according to provided .envexample
4. Set up your database with information from your .env and then run the following commands:
  * npx dotenv sequelize db:create
  * npx dotenv sequelize db:migrate
  * npx dotenv sequelize db:seed:all

5. Start the backend and frontend with the following command in each terminal:
  * npm start

6. Create an account to use the site, or log in as the demo user

# Features
## Groups
* Users can read/view groups
* Users can create groups
* Users can edit their groups
* Users can delete their groups
## Events
* Users can read/view events
* Users can create events
* Users can edit their events
* Users can delete their events

## Future Features
### Group Memberships
Logged in Users can:
* Request membership to groups, leave groups
* Update/remove membership statuses of members in a group owned by user
### Event Attendances
Logged in Users can:
* Reserve attendance spots for an event
* Manage attendances for events hosted by user
### Venues/GoogleMaps API
* Event creator can create a map pin for accepted attendees to find event location
* Logged in users can see map pins for nearby upcoming events
### AWS File Storage
* Update group/event photos if user has permission


