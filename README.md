# Yumblr Wiki

Welcome to the Yumblr Wiki!

This is a full-stack web application built using React, Redux, Express, Sequelize, and Javascript.

This application is currently hosted on Heroku! [Yumblr](https://yumblr-react.herokuapp.com)

<br />

## MVP Feature List:

**As a** user, **I want** to be view a feed **so that** I can see relevant posts, tags, and accounts.


**As a** user, **I want** make text posts **so that** I that I can share quotes and thoughts.

**As a** user, **I want** to be able to make image posts **so that** I can share photos from my personal computer or the internet.


**As a** user, **I want** to be able to repost **so that** I can share other users' posts that are meaningful to me.

**As a** user, **I want** to be able to view posts sorted by tag or poster **so that** I can specify the information I wish to access.


<br />

## Database Model:

<img src="https://yumblr.s3.amazonaws.com/Screen+Shot+2020-11-10+at+6.28.20+PM.png">

<br />

## AWS Photo Posting, Link Retrieval, and Responsive UI:

The following snippet displays a portion the backend route for storing a photo in AWS and retrieving the link to store in the relevant posts's "mediaLink."

<img src="https://yumblr.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.53.17+AM.png"

After receiving file input from the user, the frontend passes the file to an axios post request. Then, after receiving the link to the AWS object and setting the relevant post's mediaLink, the frontend immediately resizes the post panel in order to display the image to the user; in this manner, a user may examine their post before proceeding.

<img src="https://yumblr.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.55.44+AM.png"

<br />

## EndPoints:

| Method         | Frontend Path     | Purpose              |
|---             |---                |---                   |
| Get            | /                 |  Home page           |
| Get            | /signup           |  User signup form    |
| Post           | /signup           |  Create user account |
| Get            | /login            |  User login form     |
| Post           | /login            |  Authenticate user   |
| Get            | /dashboard        |  View posts/likes/following and the various post forms |
| Post           | /dashboard        |  Create a text, respost, quote, or image post (either uploaded to AWS or passed through a link) |
| Post           | /dashboard        |  Create a tag_post object and, potentially, a new tag |
| Post           | /dashboard        |  Like a user's posts and reposts |
| Get            | /blogs/:id        |  View a user's posts and reposts |
| Post           | /blogs/:id        |  Like a user's post |
| Post           | /tags/:id         |  View all posts under a specific tag |
