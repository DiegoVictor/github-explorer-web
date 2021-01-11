# [WEB] GitHub Explorer
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/github-explorer-web?style=flat-square&logo=circleci)
[![react](https://img.shields.io/badge/reactjs-16.13.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.1.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/github-explorer-web?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/github-explorer-web)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/github-explorer/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This application allow you to search and add repositories to a favorite list and then to see the repositories' issues.

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [API](#api)
* [Usage](#usage)
  * [localStorage](#localstorage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer/master/screenshots/dashboard.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer/master/screenshots/repository.png" width="49%"/>

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## API
The application uses the [GitHub's API](https://developer.github.com/v3) and it has some rate limitations, if suddenly the app stops to show data take a look at this first!
> See more on about [Rate limiting](https://developer.github.com/v3/#rate-limiting)

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

## localStorage
The project saves the repositories' list into a [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) key: `@github_explorer:repositories`. Before use this data you need parse the data to a JavaScript object with [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) function. Below you can see fictitious data:
```json
[{
  "id": 10270250,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
  "name": "react",
  "full_name": "facebook/react",
  "private": false,
  "owner": {
    "login": "facebook",
    "id": 69631,
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
    "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/facebook",
    "html_url": "https://github.com/facebook",
    "followers_url": "https://api.github.com/users/facebook/followers",
    "following_url": "https://api.github.com/users/facebook/following{/other_user}",
    "gists_url": "https://api.github.com/users/facebook/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/facebook/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/facebook/subscriptions",
    "organizations_url": "https://api.github.com/users/facebook/orgs",
    "repos_url": "https://api.github.com/users/facebook/repos",
    "events_url": "https://api.github.com/users/facebook/events{/privacy}",
    "received_events_url": "https://api.github.com/users/facebook/received_events",
    "type": "Organization",
    "site_admin": false
  },
  "html_url": "https://github.com/facebook/react",
  "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  "fork": false,
  "url": "https://api.github.com/repos/facebook/react",
  "forks_url": "https://api.github.com/repos/facebook/react/forks",
  "keys_url": "https://api.github.com/repos/facebook/react/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/facebook/react/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/facebook/react/teams",
  "hooks_url": "https://api.github.com/repos/facebook/react/hooks",
  "issue_events_url": "https://api.github.com/repos/facebook/react/issues/events{/number}",
  "events_url": "https://api.github.com/repos/facebook/react/events",
  "assignees_url": "https://api.github.com/repos/facebook/react/assignees{/user}",
  "branches_url": "https://api.github.com/repos/facebook/react/branches{/branch}",
  "tags_url": "https://api.github.com/repos/facebook/react/tags",
  "blobs_url": "https://api.github.com/repos/facebook/react/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/facebook/react/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/facebook/react/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/facebook/react/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/facebook/react/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/facebook/react/languages",
  "stargazers_url": "https://api.github.com/repos/facebook/react/stargazers",
  "contributors_url": "https://api.github.com/repos/facebook/react/contributors",
  "subscribers_url": "https://api.github.com/repos/facebook/react/subscribers",
  "subscription_url": "https://api.github.com/repos/facebook/react/subscription",
  "commits_url": "https://api.github.com/repos/facebook/react/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/facebook/react/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/facebook/react/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/facebook/react/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/facebook/react/contents/{+path}",
  "compare_url": "https://api.github.com/repos/facebook/react/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/facebook/react/merges",
  "archive_url": "https://api.github.com/repos/facebook/react/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/facebook/react/downloads",
  "issues_url": "https://api.github.com/repos/facebook/react/issues{/number}",
  "pulls_url": "https://api.github.com/repos/facebook/react/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/facebook/react/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/facebook/react/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/facebook/react/labels{/name}",
  "releases_url": "https://api.github.com/repos/facebook/react/releases{/id}",
  "deployments_url": "https://api.github.com/repos/facebook/react/deployments",
  "created_at": "2013-05-24T16:15:54Z",
  "updated_at": "2020-06-11T00:49:28Z",
  "pushed_at": "2020-06-10T22:18:52Z",
  "git_url": "git://github.com/facebook/react.git",
  "ssh_url": "git@github.com:facebook/react.git",
  "clone_url": "https://github.com/facebook/react.git",
  "svn_url": "https://github.com/facebook/react",
  "homepage": "https://reactjs.org",
  "size": 154902,
  "stargazers_count": 150256,
  "watchers_count": 150256,
  "language": "JavaScript",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": true,
  "forks_count": 29260,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 626,
  "license": {
    "key": "mit",
    "name": "MIT License",
    "spdx_id": "MIT",
    "url": "https://api.github.com/licenses/mit",
    "node_id": "MDc6TGljZW5zZTEz"
  },
  "forks": 29260,
  "open_issues": 626,
  "watchers": 150256,
  "default_branch": "master",
  "temp_clone_token": null,
  "organization": {
    "login": "facebook",
    "id": 69631,
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
    "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/facebook",
    "html_url": "https://github.com/facebook",
    "followers_url": "https://api.github.com/users/facebook/followers",
    "following_url": "https://api.github.com/users/facebook/following{/other_user}",
    "gists_url": "https://api.github.com/users/facebook/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/facebook/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/facebook/subscriptions",
    "organizations_url": "https://api.github.com/users/facebook/orgs",
    "repos_url": "https://api.github.com/users/facebook/repos",
    "events_url": "https://api.github.com/users/facebook/events{/privacy}",
    "received_events_url": "https://api.github.com/users/facebook/received_events",
    "type": "Organization",
    "site_admin": false
  },
  "network_count": 29260,
  "subscribers_count": 6674
}]
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage Report
To generate/update the coverage report:
```
$ yarn coverage
```
Or:
```
$ npm run coverage
```
> You can see the coverage report inside `tests/coverage`.
