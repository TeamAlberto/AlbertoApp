AlbertoApp
==========

## Installation

Make sure node (& npm) is installed (view instructions http://nodejs.org)


clone project in git and navigate to the folder
```bash
git clone git@github.com:TeamAlberto/AlbertoApp.git
cd AlbertoApp
```

install bower
```bash
npm install -g bower
```

install grunt-cli
```bash
npm install -g grunt-cli
```

install dependencies (part 1)
```bash
npm install
```

install dependencies (part 2)
```bash
bower install
```

run the (asset) server
```bash
grunt serve
```
Visit http://locahost:9000

run the api (optional)
```bash
npm start
```

## trouble shooting
"something is complaining about compass"
```bash
gem install compass
```
or
```bash
sudo gem install compass
```
"can't find bower" when running bower install
```bash
node_modules/bower/bin/bower install
```

"can't find grunt" when running grunt serve
```bash
node_modules/grunt-cli/bin/grunt serve
```
