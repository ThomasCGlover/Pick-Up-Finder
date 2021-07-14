                            PICK-UP FINDER SERVER
                    
Pick-Up Finder is a web app that allows users to create local pick-up games in 40 
cities throughout Indiana. Once a game is created, it is available for others to search for via city. Users can comment on any game to let the user know they would like to play and the creator of the pick-up game can adjust the players needed accordingly. It also features a User Profile component where users can view their entire catalog of created games and comments and edit/delete both. 


Middleware is used to validate users' session tokens in order to protect routes, and admin functionality is protected by conditional statements in the DELETE user method by extracting the role from the user and ensuring they are an admin.

There are three database tables used in the app: users, comments, and games. With database association, each user has an id, each game is tied to a user id and given it's own game id, then each comment is given a comment id as well as being tied to a game id that it was posted on and a user id of the user that posted the comment.

The app meets CRUD on two database tables: games and comments. Games are created with a POST, displayed on the user profiles and search-by-city functionality with GET requests, players needed updated with a PUT, and games can be deleted with DELETE. Comments are created with a POST, displayed on each game with a GET, edited with a PUT, and deleted with DELETE.  

The server is currently deployed on Heroku, as well as the client!

Client Deployed Link: http://tcg-pickup-server.herokuapp.com/