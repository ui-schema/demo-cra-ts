# UI-Schema Create-React Example w/ Material-UI

[![Github actions Build](https://github.com/ui-schema/demo-cra-ts/actions/workflows/blank.yml/badge.svg)](https://github.com/ui-schema/demo-cra-ts/actions)

Advanced usages and examples for [@ui-schema/ui-schema](https://github.com/ui-schema/ui-schema) in Typescript, with material ui, see [demo-cra](https://github.com/ui-schema/demo-cra) for simpler non-TS examples.

Files in `src`:

- [App.tsx](./src/App.tsx) provider setup, e.g. `UIMetaProvider`
- [components/Layout.tsx](./src/components/Layout.tsx) app layout, routing and nav
- [components/UISchema.tsx](./src/components/UISchema.tsx) UI-Schema widget setup
- example pages:
    - [pages/PageSimpleForm.tsx](./src/pages/PageSimpleForm.tsx), automatic rendered, usage of `WidgetCountrySelect`
    - [pages/PageCustomForm.tsx](./src/pages/PageCustomForm.tsx), custom rendered, usage of `WidgetCountrySelect`
    - [pages/PageCustomUpload.tsx](./src/pages/PageCustomUpload.tsx), custom rendered, native file upload widget
- ~multiple~ widgets in: [Widgets/](./src/components/Widgets)
    - [WidgetCountrySelect.tsx](./src/components/Widgets/WidgetCountrySelect.tsx), uses an API to populate the `Select` options

[![Schema Examples + Live Editor](https://img.shields.io/badge/Schema%20Examples%20+%20Live%20Editor-green?labelColor=fff&color=1e970c&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE3ElEQVR4nO2bX0xbVRzHz9TExKc9mBjjn+gLgcEA2wL33ra3pV0pf/uX3t6yMAQKEkahlQkBNavbMG6BYMzG4nxYYZBoycIMfxJ9cL4oI5CYGR7FLAtkeyA+oEHDgJ8PBnLPhULLbXt0nm/yfeltcn7fzzn3nHvOzUWIiooqHQqHw88lYkJlJk++en/kJMNvZ6gYUOK3dMWbvvqmj0jnSUi9fX0vnSjUKgoudS5r2CKdKSH1Dg6+nEwAeZzpvwUAIYTO+N/5Mpc1KL4F8rXG7ZrGpk9I5zmSotHos9lFOizQj7OzMD8/H9P52mLs/4Guy6+SzqFIcgCz9+7BwsJCTMsBhEKXXiGdQZEoAAqAAqAAKAAKgAKgACgACoACoAAoAAqAAqAAKID/HQDZ6bCJNYCZ5WM6U80+PQCi3d2vZ8kCJeqPAwE96RxH1qWa0z8rCZ+hYqDL7fmVdI4jaSIcPs4X6RWFz1AxoC7QwhdtbW+SzpOw+n21P0iDnFSzsOhwwgOX+0AvOV3AFHAYhA88vkXSeRLSTCDw/CkOfyt0vtgC4PXG5SFLKQaAKdRCfzj8IulccevTuoYZaYAsFQPLLnfcANY8HlBp8FEQ9p2eI50rLgFCx+xa0xY2kRnNcYffcb/ZigEwMPrtz5ubXyCd71BdrfePSQvPVLOw5HTFDLoSCsHkyAhMRSLwOBDY/X3VXQ25siW0r6b2W9L5DpVQXLIpLbqNNx3Y01+PjkI0GoVoNArTN29i1y6YLBgAC2fYRgg9QzpjTN1oavpMvowtOpyxAYgiTEgATEUi+OhwV8MJ2Si4XNfwFemcMVVnKtmQFtugKz70Xn947hxMjI7CnVu3YCUY3HO922DGANh48ybpnPsq0tr+vrz352yO+CY9UYx5bcnp2rM/GGj0D5HOu0ctJZXr0iJFzpDwzB/LAd6EAfAaT22QzotprL29Wd5LdyurkgZg0eHc84g82NwSJp17V8FK+xp2n7J80sLvuEFnxACcMZf+STo3Qgih8WCnK1vW+9PllbuFL0vW+Uft7UcGMGdz7BkFQ/7ms6Tzoy67axVbqxk9bAnCbuF3pMvc8LCiUSByBgxAk7Xqd6Lhb3d08HmyZ/bx0oqY6/zkyIgiAN9X2bC2MtUsXG05KxAD8KFTWMGe1wt18ETS++D1wsPOzgPX+URtY3kMQmuF7Tci4afC4RyNbN8+bC3bv3BRPHCtl3o5FILJ4eF/9gb7zBnT5ZVYm9lqFq77W0xpB3BREH/B9uwFHKzLej9hiyI2Z8j3BuD1wpYggIXBT5rerXI/Smv4bwYGXuMK8ePuIUup8uXukL3BjqNlFVjbeRoObrS25qcNwBVf7X1pASoNB2sej3IA3sP3BuD1woYgAC9739CbrsPTu4ODx42yIdhvtiYlfCJzRsRajtWgKeDgejD4RsoBXKtr/E7acK6ahVV3dXIBxOF1QYCiAvyly3mP737KAdSZrE+kjV4wxX/YmWxfkx2e2nXm1H9XID+s/MnugL8EgYgfuNxYLVkqBhBCx1IKgE3ilyDJdo6GTT2Angr7H6SDxvLblrLU7xBv9/TYrLLH0X+DDYwexjo6PCkHgBBCM+/1GK54fY+tLA/ZahZy1AwRZ6tZMDB6uOisXh3v7CxLS3gqKqqnSn8D0EwMpE6f7XEAAAAASUVORK5CYII=)](https://ui-schema.bemit.codes/examples)

[![Run on CodeSandbox](https://img.shields.io/badge/run%20on%20CodeSandbox-blue?labelColor=fff&logoColor=505050&style=for-the-badge&logo=codesandbox)](https://codesandbox.io/s/github/ui-schema/demo-cra-ts/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2Fpages%2FPageSimpleForm.tsx)

[![Fullscreen Demo](https://img.shields.io/badge/Fullscreen%20Demo-39c4d5?labelColor=fff&color=29a9b7&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACRUlEQVR4nO3aTYiNUQDG8Z/xWRSFBRZYYSGSZCdFiZ0sFSuTjbJUdqMslGIhlmI3shGRJnZYkQVWZjNZmPIRNfIxr8Xt1JivO/ed95zzXvf917N/nn/3drvnHBoaGhoaGjphIU7iJq7jYNY2iVmCIRST8hDbMvZKxllTx4f8whWsytYuAY/NLCBkFKe1vir/Hc+1FxDyGvvz1IxHJwJC7mJzjrIxKCOgwA9cxIr0laulrICQDziBBamLV8V8BYS8wN7E3SuhKgEFxnEL65MumCdVCgj5jvNYlnBHaWIICBnGsXRTyhFTQMgT7Eg1qFNSCCjwBzewJs2suZNKQMhnrf8fi1OMmwupBYS8xaEE+9qSS0DIfWyJvnIWcgso8BOXsTLy1mmpg4CQjziFvqiLJ1EnASEvsS/m6InUUUDIIDbGm96izgIKjGEAy3tVQMgIDvSygPBp2NrLAgpc7XUB93pdwKVeFvBVhJ/FbhHwBrurHt8NAj7hDBbFGF9nAb9xDatjDQ/UUcAQtsccPZE6CXiPo3HnTqUOAr7hHJZG3jotOQWMa71KWRd95SzkEvAMexLsa0tqASM4rkaXqakEjOGCiP/ry5JCwCA2JdrTMTEFvJLwbK8sMQSMol/i092yVCkgnO931bO6qgQ8kPmGpyzzFfAOh5O3rpCyAr6o2S1vWToVEO751+YoG4NOBDzFziwtI/JI++HDuuCtT1n6zTy8q157laUPd/w7fBy3sSFjr+Qc0TpzH8CuzF0aGhoaGhoayvEXCYka61umCF0AAAAASUVORK5CYII=)](https://ui-schema-cra-ts.netlify.app)

[![Clone on Repl.it](https://img.shields.io/badge/repl.it%20clone-grey?labelColor=fff&style=for-the-badge&logo=repl.it)](https://repl.it/github/ui-schema/demo-cra-ts)

## CI

- build & deploy with [netlify](https://www.netlify.com/), see [netlify.toml](./netlify.toml)
- build with GitHub Actions, see [.github/workflows/blank.yml](./.github/workflows/blank.yml)

---
---
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
