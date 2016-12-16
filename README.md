

 The list given below is an overview of the routes you will require, what they will do, and the HTTP Verb used to access it.

Route
HTTP verb
Description

/api/users
GET
Get all the users

/api/users
POST
Create a user

/api/users/:user_id
GET
Get specific user

/api/users/:user_id
PUT
Update a user with new info

/api/users/:user_id
DELETE
Delete a user

/api/posts
GET
Get all the posts with user and categories

/api/posts
POST
Create a post with all info  

/api/posts/:post_id
GET
Get specific post with user and categories

/api/posts/:post_id
PUT
Update a post with new info

/api/posts/:post_id
DELETE
Delete a post

/api/categories
GET
Get all the categories

/api/ categories
POST
Create a category

/api/ categories /: category _id
GET
Get specific category

/api/  categories /: category _id
PUT
Update a category with new info

/api/ categories /: category _id
DELETE
Delete a  category




For the rest end point api/posts and /api/posts/:post_id for saving refs and population refer to the document http://mongoosejs.com/docs/populate.html
