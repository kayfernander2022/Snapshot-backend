## Capstone App - Backend

Using a mongo db to build a full crud backend application where a user can store and edit pictures, add and delete friends from a friends list and view their uploaded pictures as well. 

### [Link to Deployed Backend]() ON RENDER



### Technologies Used
- JavaScript
- TypeScript
- HTML
- CSS
- Express.js
- Node.js
- Mongo DB
- Mongoose


### Models
![image](./project4model2.png)

### Backend Route Table

| Name    | URL    | HTTP Verb |Description|
| :---    | :----: | :----:    |      :----   |
| Index   | /photo    | GET      | Display a list of photos|
| Show    | /photo/:id | GET     | Display a specific photo|
| Create  | /photo     | POST    | Add a new photo|
| Update  | /photo/:id | PUT     | Update a specific photo|
| Delete  | /photo/:id | DELETE  | Delete a specific photo|
| Index  | /sharedphotos/| GET  | Display a list of friends photos|
| Update | /sharedphotos/:photoid/user/:userid | PUT  | Share photo to the user|
| Delete  | /sharedphotos/:photoid/user/:userid| DELETE  | Delete a shared photo from the user|


### User Stories

- As a user, I can see a list of all my uploaded pictures when I visit the page
- As a user, I can see detailed information about a specific photo
- As a user, I can create a new photo upload and add it to the database
- As a user, I can update any specific photo
- As a user, I can delete any specific photo upload that I need removed
- As a user, I can add friends to see my photos
- As a user, I can delete friends I have previously added to friends list
- As a user, I can see my friends photos shared with me
- As a user, I can share my photos with my friends list


