VUE NOTES beginning Dec 2019

# ROUTES

https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

dynamic routing

automatic global registration of base components such as buttons, icons, etc can be done automatically with this code:

https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components

# VUEX AND STATE MANAGEMENT

Do I need state management, e.g. Vuex?? This is probably true as state management refers to the client application state, e.g. who is the user, what are the current actions and so on. Could state be managed at the component level? and I plan to use session authentication.

The database is not accessible in offline use. Vuex will enable the app to keep track of project, site, obstype during data entry. With vuex-persist we can store state on localForage (async and works with Promises, can story binary data such as images), keyed to current version of the app. WARNING: if users refresh state with a new app build that has a different state configuration, they may lose persisted data such as Outbox items. Some kind of workaround or warning may be needed.

Also the loading state, the outbox emptied state, the list of observations to repeat. A user wanting to repeat some observations, and having completed 3 out of 8 and the remaining 5 could be reminders or something.

atlasbiowork.com kept user data entry state in the url querystring? This wasn't very robust in field situations where random button presses may occur, etc.

METHOD (in component) dispatch ACTION (async) which commits MUTATION (sync)

MUTATIONS should always be wrapped in ACTIONS
MUTATIONS typically named with all caps

MUTATIONS are synchronous, ACTIONS asynchronous

mapState MAPs the getters in the store to the computed properties on the component, and MAPs the actions in the store to the methods in our component.

Localforage: https://medium.com/daily-now/optimistic-offline-first-apps-with-vuex-d8a412e105a7

and this article sez service workers aren't needed:
https://netterminalmachine.com/blog/2018/persisting-a-vuex-store-to-indexed-db

# USER ACTIONS

register
login
browse projects
join project
search observations
browse maps (listed as well as visible on map)
sign as witness to an observation
enter a new site
enter an observation (new or existing site)
sync or upload an observation that was entered offline
enter a repeat observation (include download of previous observations)
download a set of observations (e.g. for purposes of repeating them, printing them, sharing them).
edit his/her own observations
comment on an observation
subscribe to updates on new observations--by project, or by user if user consents to being "followed."

Administrator actions (project coordinators have admin privileges for their project): DONE WITH DJANGO ADMIN

# COMPONENTS

Since this data-entry app will basically be a single-page application that can be used offline, as well as on desktop, it needs only limited components. I will use Vue router.

Components referenced by Vue router (these are PAGES) best placed in views directory, whereas re-usable or base components go into components directory.

BASE COMPONENTS
BaseHome/menu
BaseMap a Leaflet map
BaseSubmit a submit button
BaseSuccess a modal showing success of operation
BaseEdit
BaseUpload (or sync)
BaseDownload

## VIEWS FOR VUE APP

SiteCreate and edit, SiteList, SiteDetail
ObsCreate and edit, ObsList, ObsDetail
Search
Maps and mashups
Outbox
Inbox (downloaded obs to repeat)

index which will include links for other pages, including:

- observations unsynced (with count)
- observations selected for repeat (with counts of selected/completed)
- website links for registration, search, maps, etc.

login (register form will be website only)
observation list
observation detail
observation edit/create (with obsType as a form parameter for the JSON field)
site list
site detail
site edit/create
obsType list (filtered by project)
search (offline web app search will be restricted to cache)

# AXIOS CALLS

Hot reloading not possible with WSL so am placing vue app development in Windows, and using Axios to make API calls on DRF which is running on python server in WSL. The DRF must be CORS-enabled with localhost:8080 whitelisted.

# HISTORY MODE

Configured in the Vue router.
This means that every URL will return index.html
See documentation on setting up Apache server and so on for push-state API. May need custom 404 component.

# PASSING OBSTYPE TEMPLATES?

You can pass a html into a slot, and this could be a form for example.

So: ObsEdit or ObsCreate could have a SLOT for the JSON field form (Base), which it would then loop through and deliver (emit?) to the outbox as a computed property, an object. Because: That slot has access to the same instance properties (i.e. the same “scope”) as the rest of the template.

# AXIOS INTERCEPTORS

In Vue Mastery, the first strategy for incorporating a loading bar. Not their recommended strategy, but interceptors can also be used to 1. SET AUTH TOKENS, 2. FORMAT OR FILTER DATA AS IT COMES IN, and 3. on RESPONSE TO COMMUNICATE Not Authorized 401 responses.

apiClient.interceptors.request.use(config => {
NProgress.start()
return config
})

# ROUTE NAVIGATION GUARDS

These are lifecycle hooks that can be added to components:
BeforeRouteEnter(routeTo, routeFrom, next)
BeforeRouteUpdate(routeTo, routeFrom, next)
BeforeRouteLeave(routeTo, routeFrom, next)

GLOBAL ROUTE GUARDS whenever navigation is triggered (these go not in components but in Vue Router)

A GOOD WAY to add some logic and prompts to interactivity.

# CSS

The app should be optimized for entering data on smaller devices in bright sunlight: high contrast, fairly large type, pages or views relatively simple. Tried Vuetify a little, went to Bootstrap and bootstrap-vue as it may be more easily customizable, has some handy icons, etc.

# CSRF and login

see warnings at https://stackoverflow.com/questions/54836387/getting-django-vue-cors-and-csrf-working-with-a-real-world-example

try this for csrf:
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

# LEAFLET

Webpack doesn't use the right URL for Leaflet default markers. Inserted a recommended fix in main.js

Don't create the Leaflet map BEFORE the axios().then has returned the server data. Use a v-if="!loading" for the map component to wait for axios to complete.
