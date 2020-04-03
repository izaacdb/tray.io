Tray.io
------

It should deliver to the spec. I used TypeScript as the job advert is for a senior TypeScript developer and I figured you'd want to see some decent code. There are some data manipulations which make it very useful here.

Other libraries I used include date-fns for their format function, react-dnd for all of the dragging parts and `styled-components` for the styling. I use `prettier` and `eslint` to keep everything tidy, `jest` and `react-testing-library` to write tests.

This should all be nicely extendable as there is an `./src/components/interfaces` file with full definitions of everything.

---
#### How to run

I built this on `create-react-app` so to run a `yarn install` then a run `yarn start`. Alternatively do a `yarn install && yarn build && cd build && npx http-server .` to run it in production mode.

---
#### Notes
I called the data received from your api "events" as this would allow us to set a type to determine if its specifically a connector, a notification, or something else later on.
Best entry point is `./src/pages/home`

---
#### About me

I'm Izaac - a full stack developer with about 10 years experience. I've done many roles as a frontend dev with angular and react.

My CV is a available here: https://drive.google.com/file/d/1ewpN2S5RZJKrsP3s9u4z_QW8hU_46cEx/view?usp=sharing
