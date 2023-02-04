# Contributing to vue-tinybox

Thank you for deciding to contribute to vue-tinybox! There are some things you need to know before starting.

- [I want to propose a feature or file a bug without writing code](#i-want-to-propose-a-feature-or-file-a-bug-without-writing-code)
- [I want to implement a feature or fix a bug myself](#i-want-to-implement-a-feature-or-fix-a-bug-myself)
  - [Branch naming](#branch-naming)
  - [Node version](#node-version)
  - [Package manager](#package-manager)
  - [Dev environment](#dev-environment)
  - [Testing](#testing)
    - [ESLint](#eslint)
    - [size-limit](#size-limit)
  - [Pull request](#pull-request)

## I want to propose a feature or file a bug without writing code

If you want to ask a question, propose a new feature or tell us about a bug, you should [create a new issue](https://github.com/kytta/vue-tinybox/issues/new/choose) on the matter. Please make sure to pick the appropriate template and add as much information as you can. The more you tell me, the quicker can I resolve your issue :)

## I want to implement a feature or fix a bug myself

There are rules I follow when I develop vue-tinybox, and I'd like other contributors to follow them too.

### Branch naming

After forking this repo, please create a separate branch for every proposed feature. This is not enforced, but it helps a lot when navigating the PRs. Allowed are automatic names (e.g. 'patch-1') created when using GitHub's online editor.

### Node version

All development should be done on the latest stable Node version with a set major number. Usually, it's the latest LTS release. Right now it is Node 14. You can always check the "Node.js CI" GitHub Action for the used version number. Use nvm if you want to install many Node versions.

### Package manager

When developing or testing vue-tinybox, use Yarn v1 only. NPM and PNPM will not take Yarn's lockfile into account.

### Dev environment

At the moment there are no automatic tests. To help with manual testing, I have created a test page. To have the package be built every time you edit code and to be able to see the changes, run `yarn dev`. This will launch a static file server in the background on port 8629 (TNBX). The webpage will not auto-reload, however — you should do it yourself. The webpage offers useful controls to test the package.

### Testing

Testing consists of two steps: linting and checking the size. To run all tests, run `yarn test`.

#### ESLint

I use [ESLint](https://eslint.org/) to lint the code. Setting up an integration with your editor is quite helpful. You don't have to do it — CI will lint your code anyway. Please note that I **do not** accept unlinted code.

You can run `yarn test:lint` to lint the code yourself.

#### size-limit

To keep the package size under control I use [size-limit](https://github.com/ai/size-limit). It is very important for me to keep the package small. Don't worry, if your edits make it go over the limit. Submit the pull request, and we'll figure out the solution together :)

You can run `yarn test:size` to check the built bundle size.

### Pull request

After your work is done, you can submit a pull request. There are some automated checks. One is from a GitHub Action — it executes `yarn test`. Another one is from Codacy — it checks the code quality. Please fix the issues detected by Codacy!

---

After you submitted your issue or pull request, I will reach out to you and get the needed things done. Don't hesitate commenting on my decisions if you find them incorrect or unclear.

If you have any questions, you can always contact me at [me@kytta.dev](mailto:me@kytta.dev)

Thank you once again for participating in the life of vue-tinybox!

-- _Nikita Karamov_
