#How to automate deployment
will use PM2 for managing process and load balancing
##using pm2-deploy(git)
###Pre-requisition
####Server-side(ubuntu)
- node&npm(or with nvm)
- pm2 -g
- nginx(local proxy)
- git with clone permission
- gulp -g
###client-side
- pm2 -g
- ssh key

##Server
####Step 1
Install nginx, git and configure respectively
```
sudo apt-get install nginx git
```
####Step 2
Install node 4.2.x with nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
nvm install 4.2.6
nvm use 4.2.6
```
####Step 3
Install PM2 and gulp
```
npm install -g pm2@lastest gulp
```

if you need update, use
```
pm2 updatePM2
npm install npm@latest -g
```

##Client
####Step 1
Install pm2 and generate ecosystem.json
```
pm2 ecosystem
```
or use current ecosystem file (./ecosystem.json)

####Step 2
Edit ecosystem.json and setup
```
pm2 ecosystem.json production setup
```
####Step 3

Deploy
```
pm2 ecosystem.json production
```
##Using Flightplan
###Pre-requisition
####Serverside
- ssh enabled account
- node, pm2
####Local
- flightplan
###Server
####Step 1
- setup directories, permissions and key
####Step 2
- install nvm, pm2
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
nvm install 4.2.6
nvm use 4.2.6
npm install -g pm2@latest
```
if you need update, use
```
pm2 updatePM2
npm install npm@latest -g
```
###Client
####Step 1
Install flightplan globally and set up ssh key
####Step 2
Change flightplan.babel.js
####Step 3
fly server to deploy staging
fly production:server to deploy staging


##manual nvm setting
Ecosystem.json
flightplan