[![Circle CI](https://circleci.com/gh/eris-ltd/2gather.svg?style=svg)](https://circleci.com/gh/eris-ltd/2gather)

## 2gather -- A Distributed Video Sharing Application

A video sharing DApp (distributed application) which uses smart contracts to structure the application's logic, a distributed file store system to share the content between application users, and BTC to incentivize content creation.

## Introduction

There are three major pieces to this application.

### Video Files

This DApp makes use of [IPFS](http://ipfs.io) to store, share, and distribute video files. IPFS works on the concept of immutable hashes. These are unstructured data in the form of video files.

### Application Logic

The logic for the application, which remembers and utilizes immutable hashes stored, shared, and distributed by the IPFS protocol, resides in Eris Industries' `erisdb` system, a smart contract enabled, smart contract [controlled blockchain](https://thelonious.io).

### View Layer

The view layer for 2gather is an Angular application which is ran in any compatible web browser. The user interface (aka, view layer) makes JS calls back to the Decerver hosted middlewear layer which provides a routing framework, method framework, and connection to both the `erisdb` and `ipfs` systems.

## State of Development

This DApp is in active development. Here is what we have done and not done.

* ~~contracts suite~~
* ~~deployment controller (.pdx)~~
* ~~api specification~~
* ~~api routing framework~~
* ~~api methods framework~~
* ~~api connections framework~~
* ~~test suite blockchain~~
* production blockchain
* ~~continuous integration system~~
* ~~fig files for production~~
* ~~fig files for testing~~
* ~~build prototype view layer~~
* ~~connect prototype view to API endpoints~~
* display BTC addresses for [ProTipHQ](https://www.indiegogo.com/projects/protip-peer-to-peer-tipping-for-the-web) integration
* add a ChangeTip functionality ...?

### Warning

This distributed application (DApp) is under heavy development. As such the blockchain it uses gets reset frequently (we will note here when we feel the chain has stabilized and when our development slows down). We do not currently have a backup/export/import functionality for smart contract housed information (yet), so at this time when the blockchain resets all videos are lost and will have to be readded.

## Installation

In general there are two ways in which to install the 2gather distributed application, an easy way (which we **highly** recommend), and a hard way.

### Easy Installation

**Dependencies**: for the easy installation there are 2 required dependencies: [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

Docker is a run anywhere container solution which we feel makes development, deployment, testing, and running of distributed applications a breeze. We are moving most of our development, testing, and usage efforts for Eris Industries to use a container-based paradigm. Given the complexity of getting p2p software running, Docker containers provide an excellent mechanism for handling the building and running of distributed applications.

Docker Compose (recently renamed from the `fig` tool which was purchased by Docker last year) is a way to compose groups of containers and makes running those containers ultra simple.

[Install Docker](http://docs.docker.com/installation/). Install instructions will vary by platform. **NOTE** Eris Industries requires a docker version >= 1.4 to work properly. We highly recommend that you install docker version 1.5.

Ubuntu:

```bash
curl -sSL https://get.docker.com/ubuntu/ | sudo sh
```

[Install Docker Compose](https://docs.docker.com/compose/#installation-and-set-up):

64 bit Linux && OSX:

```bash
curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

Alternatively:

```bash
sudo pip install -U docker-compose
```

Once you have Docker and Docker-Compose installed the rest is ultra simple.

```bash
git clone git@github.com:eris-ltd/2gather.git
cd 2gather
```

You'll need to install the front end dependencies as well. We use the [Bower](http://bower.io/) package manager to manage our front end dependencies.

```bash
bower install
```

If you want to skip the above step (`bower install`) you can rename the `docker-compose-get.yml` to `docker-compose.yml` which will fetch the 2gather container from Docker Hub rather than building it for yourself.

At this point there are two possible compositions of the containers which you can use. The composition we suggest starting with is the testing containers which will deploy your own chain locally along with all of the contracts required for the DApp and allow you to begin operating the DApp on a local chain.

```bash
(sudo) docker-compose -f spec/docker_compose.yml up
```

The second way you could work is to link into the public testing chain which we use. Note, the production blockchain will be released when we have finalized the testing cycle. See the `Status` section above. To work with the public test chain

```bash
(sudo) docker-compose up
```

Note that depending on your system setup `sudo` command may or may not be necessary.

The first time you `docker-compose up` it will take a while to download and configure the base images. After that it will be ultra fast. Note that when using the testing composition with the `-f spec/docker_compose.yml` flag, you will want to wait about 60 seconds after the containers boot before working with the API. This is to allow the chain to be established and the contracts to be deployed.

#### Warning When Using Containers

**NOTE**: When using containers, the keys do not persist. In addition, the usernames are tied to a public key address. So if you use a container and then restart the container you will get a new key so you will have to reregister with a *new* username unless you deleted your old username before exiting the containers before -- as only one username is allowed per chain and each username is tied to a public key address. The containers are for rapid prototyping and testing and so we do not see this as a problem as it is using containers how they should be used. We are working toward moving keys as close as possible to the user (ideally, in the browser), but that work will be ongoing for quite some time. If you wish to persist your username then you will have to use the Onerous Installation below or export a volume which container the keys.

### Onerous Installation

While we **highly** encourage folks to begin using a container based system for working with distributed applications, we understand that not everyone will want to do that. 2gather works just as well outside of containers.

#### Step 1: Ensure Your Decerver is Set Up

Follow our [Go VROOM Guide Here](https://decerver.io/tutorials/)

#### Step 2: Ensure IPFS is Set Up

Follow IPFS's [Guide Here](https://github.com/ipfs/go-ipfs)

#### Step 3: Install the DApp

Clone this repository into your `~/.decerver/dapps` folder:

```bash
git clone git@github.com:eris-ltd/2gather.git ~/.decerver/dapps/2gather
cd ~/.decerver/dapps/2gather
```

You'll need to install the front end dependencies as well. We use the [Bower](http://bower.io/) package manager to manage our front end dependencies.

```bash
bower install
```

You will also need the `jq` program installed.

On Ubuntu:

```bash
sudo apt-get install jq
```

On OSX:

```bash
brew install jq
```

For other systems see the [JQ download page](http://stedolan.github.io/jq/download/).

#### Step 4: Start IPFS

Make sure that an IPFS gateway is running and is write accessible on port 8080.

```bash
ipfs daemon -writable
```

Note that IPFS daemon command will block in a terminal, so you will need to run it in a separate terminal window.

#### Step 5: Roll the Chain (Optional)

If you would like a chain for testing, then execute the `spec/teststart.sh` file. That will establish a new chain with proper configuration for local testing.

#### Step 6: Connect to the Public Test Chain (Optional)

If you would like to connect to the public test chain then execute the `./start.sh` file.

### Running the app

When the DApp is running, open [http://localhost:3000/2gather/](http://localhost:3000/2gather/) in a browser.

## License

GPL. See LICENSE.txt file.

## Contributions

We are happy to accept contributions to this template distributed applications with the proviso that any and all contributions will be licensed GPL by Eris Industries.

Even better than contributions to this template, please press the big FORK button at the top and make the DApp your own. Do cool shit with it.

Run it on your own chain. Connect with your own community. And **most importantly** HAVE FUN!

Enjoy DApp-ing! :)
