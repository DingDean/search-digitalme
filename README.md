# search-digitalme
A chrome extension to save your google search queries

## Build
Because the extension is going to make http calls to your server, which would be a cross origin resource call, it's required by Chrome that the server the extension requests should be listed in the `permissions` field in `manifest.json`.

Your host is only known at runtime, but I haven't figure out a way to add a runtime permission yet, so the solution here is just a build process to replace server placeholder `YOUR_HOST` with your own server endpoint:

* Clone and cd into this repo:

`git clone https://github.com/DingDean/search-digitalme.git && cd search-digitalme`

* Setup permissions with 

`./setup.sh YOUR_HOST_URL`

* Use the `build` dir in your chrome

## Usage

The plugin use JWT for authentication and authorization. 

You need to login with a secret key, which would be authenticated against by your server.

Just click on the icon on the toolbar and sign in, then the extension would send every google search of yours to your own server.

## Api Endpoints

* `/login`: login with secret
* `/api/save`: save the search

## TODO

- [X] Authentication and Authorization with JWT
- [X] Bash script to replace host url
- [ ] The extension assumes too much about the auth on server, need to have an option to no auth at all
- [ ] Configurable api endpoints
- [ ] Save bing, baidu searches
