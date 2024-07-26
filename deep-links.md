
# deep links in socket runtime

## relevant readings
 1. [0auth for native and mobile apps](https://oauth.net/2/native-apps/)
 2. 
```
For private-use URI scheme-based redirects, authorization servers
   SHOULD enforce the requirement in Section 7.1 that clients use
   schemes that are reverse domain name based.  At a minimum, any
   private-use URI scheme that doesn't contain a period character (".")
   SHOULD be rejected.
```
 3. 


## findings
  1. if the application_protocol is set to a reverse DNS notation url like com.auth-react, this will work on safari and in the command line, but does not work in chrome ( as such my default browser is safari for this until i can figure it out)

## implementing

1. first you will need to look at meta.application_protocol in your socket.ini

```ini
[meta]

; A unique ID that identifies the bundle (used by all app stores).

bundle_identifier = "com.auth-react"

; A unique application protocol scheme to support deep linking
; If this value is not defined, then it is derived from the `[meta] bundle_identifier` value
application_protocol = "com.auth-react"
```

in my case it is com.auth-react

with this in mind in safari i can go to com.auth-react://some-route and this will open the app

you could also do this from the command line


```bash
// macos
open com.auth-react://some-route
```


next inside of the application we need to handle this to provide more functionality of the route

```js
import { onApplicationURL } from "socket:hooks";

onApplicationURL((event: ApplicationURLEvent) => {
  console.log( event.url); // logs auth-react://some-route
  console.log({ event });
});
```

next we need to figure out how we are going to display the authentication page we have a few options
 - create another in app window set to the authentication servers URL
 - navigate the main app window to the authentication URL
 - open the systems default browser to a it


the socket runtime has a strict CSP policy, meaning running external code is not the easiest thing to do here, which our first 2 options will require us to figure out

the last option is the best for a cross platform experience

this can be achieved by doing the following
```js
import application from "socket:application"

const currentWindow = await application.getCurrentWindow();
await currentWindow.openExternal(url);
```


