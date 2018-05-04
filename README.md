![Guava](https://guava.com.br/images/guava-leaf.svg)

_A small, bold software studio working hard to make the web a bit cooler each day._

### Supported browsers
IE  | Edge | Chrome | Firefox | Safari | Opera | iOS Safari | Chrome Android
--- | ---- | ------ | ------- | ------ | ----- | ---------- | --------------
None| 14+  | 53+    | 48+     | 9.1+   | 40+   | 9.3+       | 55+

### Development standards
#### Coding guidelines
Read [GSS](https://github.com/guava/gss) documentation to develop Guava-compliant HTML/CSS. Use [SCSS Lint](https://github.com/brigade/scss-lint) to help you be on the right track. Install its [plugin](https://github.com/brigade/scss-lint#editor-integration) on your editor of choice.
#### Git
Keep an eye on our [Git standards](https://github.com/guava/standards/blob/master/git.md) and on our naming convention for branches.
* Use hyphen to separate words (eg.: `name-of-branch`).
* Use slash to separate branch prefix from branch name (eg.: `prefix/name-of-branch`).
* `v2017/` — remarks the year of design version.
* `v2017/master` — the main branch of design version.
* `v2017/feature/…` — adds something new.
* `v2017/fix/…` — fixes one or more bugs.
* `v2017/chore/…` — improves perfomance, etc.

### Setup
* Run `bundle install` to get the lastest Gems.
* Spin up a local middleman server by running `bundle exec middleman server` or just `middleman`.
* Build static assets by running `bundle exec middleman build` or just `middleman build`.

### Deployment

The deploy is done through [Netlify](https://app.netlify.com/sites/guava-com-br/settings). Create an account and ask for a project's invitation.

1) Install [Node.js](https://nodejs.org/).
2) Install the Netlify CLI package: `npm install netlify-cli -g`
3) Build the most recent version of the site on folder `/build`: `bundle exec middleman build`
4) Deploy it: `netlify deploy -s guava-com-br -p build`

###  Useful links
* [Middleman Docs](https://middlemanapp.com/basics/install/)
* [Bootstrap 4 Docs](https://v4-alpha.getbootstrap.com/)
