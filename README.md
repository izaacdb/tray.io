Tray.io
------

![preview](preview.png)

---
#### How to run

I built this on `create-react-app` so run a `yarn install` then a run `yarn start`.

Alternatively do a `yarn install && yarn build && cd build && npx http-server .` to run it in production mode.

Best place to start looking at the code base is `./src/pages/home`

---
#### Notes
Libraries I used include `date-fns` for their format function, `react-dnd` for all of the dragging parts and `styled-components` for the styling. I use `prettier` and `eslint` to keep everything tidy, `jest` and `react-testing-library` to write tests.

This should all be nicely extendable as there is an `./src/components/interfaces` file with full definitions of everything.

I used `TypeScript` instead of `JS` as you listed it in the job advert and I figured you'd want to see some decent code. There are some data manipulations which make it very useful here.

I called the data received from your json file `events` as this would allow us to set a type to determine if its specifically a connector, a notification, or something else later on.

---
#### About me

I'm Izaac - a full stack developer with about 9 years experience. I've done many roles as a frontend dev with angular and react.

My CV is available here: https://drive.google.com/file/d/1ewpN2S5RZJKrsP3s9u4z_QW8hU_46cEx/view?usp=sharing
