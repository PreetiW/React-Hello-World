# React-PWA-TODO
Basic PWA todo app in React using workbox


This Todo App Project is created by using React configuring Webpack and Babel
Follow the instructions to setup the base project:
[React (without Create React App) with Babel 7, Webpack 4, and React 16](https://www.youtube.com/watch?v=Zb2mQyQRwqc)

To handle offline functionality I've used [Workbox Library](https://developers.google.com/web/tools/workbox/) which makes it easy to write service worker code as it already handles boilerplate for it.

The features which has been used so far using workbox are as below:

* [Workbox Routing](https://developers.google.com/web/tools/workbox/modules/workbox-routing)
* [Workbox Strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
* [Workbox Background Sync](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync)

Please follow the below tutorial to understand more about the app and to create a json-server for storing todo data
https://medium.freecodecamp.org/how-to-build-a-custom-pwa-with-workbox-in-create-react-app-be580686cf73


##Storing Audio Offline

* https://github.com/abudaan/heartbeat/wiki/Storing-audio-locally
* https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices
* 

* Additonal Resources:
  * [What is Webpack](https://www.youtube.com/watch?v=GU-2T7k9NfI&t=1s)
  * [Offline UX Considerations](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)

**Note: You will have to load the webpage atleast once to make it available in the offline mode**
