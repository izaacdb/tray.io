Tray.io
------

Passed technical test for Tray.io.

    “You’ll be building an event visualizer, handling events from several APIs.
     Create an application which can handle multiple events supporting drag and drop.
     Use our provided designs for syling.”

<img src="preview.png" alt="preview" width=600/>

---
#### How to run

Passed technical interview test for Tray.io

I built this on `create-react-app` so run a `yarn install` then a run `yarn start`.

Alternatively do a `yarn install && yarn build && cd build && npx http-server .` to run it in production mode.

Best place to start looking at the code base is `./src/pages/home`

---
#### Notes
Libraries I used include `date-fns` for their format function, `react-dnd` for all of the dragging parts and `styled-components` for the styling. I use `prettier` and `eslint` to keep everything tidy, `jest` and `react-testing-library` to write tests.
