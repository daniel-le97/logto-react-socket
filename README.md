# React + TypeScript + Vite + Socket + Logto
this app shows an example of hooking up a socket - react app to logto
( i use logto because its very easy to self host on my own server )

in particular this shows how to do it using a custom URI scheme and not universal links

## prerequisites 
- clone this repo

- you'll need to register an account on logto or have your own self hosted instance
  - create a native app in logto admin console
      - redirect URI: com.auth-react://callback
      - sign-out URI: com.auth-react://sign-out
      - cors allowed origins: socket://com.auth-react
  - replace the values in .env.example with your relevant values, and then rename it to .env
  - learn more at [logto](https://logto.io)
- have [socket](https://github.com/socketsupply/socket) built and linked on your system on the "ws" branch

```bash 
git clone https://github.com/socketsupply/socket.git && cd socket && git switch ws && git pull && pnpm relink
```
 if you are using bun you will need to  do the following after the above ( if you are not on macos you will need to change the below )


```bash
cd ./build/npm/darwin/packages/@socketsupply/socket && bun link
```

## getting started

1. install deps
```bash
bun i
```
2. run the app
```bash
ssc build -r
```


## for more info check [deep linking](./deep-links.md)