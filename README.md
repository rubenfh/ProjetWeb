# Node.js Project - 2019

## About this work :

This work is out final Node project. It consists of a web API dashboard using Node, Express and MongoDB.

Each user can :

* Access the `/homepage` page on which he be redirected to sign in or sign up.
* Access the `/signup` page on which he can register to the database.
* Access the `/signin` page on which he can log into his profile.
* Once logged in, access the `/hello` page on which he can create, read, update and delete data.

Each operation the user makes is registered in the database.
Errors which happens during the navigation are handled and displayed to the user.

## Running instructions :

__Install git__
* On Linux : run `sudo apt-get install git`
* On Mac : download the git installer at this address `https://sourceforge.net/projects/git-osx-installer/files/` and follow the instructions
* On Windows : download the git installer at this address `https://gitforwindows.org/` and follow the instructions

__Clone the project on your computer__
Run `git clone https://github.com/rubenfh/ProjetWeb.git`

__Install nodejs and npm__
If you didn't  install npm and node yet, follow :
* On Linux run `sudo apt-get install npm nodejs`
* On Mac : download the nodejs installer at this address `https://nodejs.org/en/download/` and follow the instructions
* On Windows : download the git installer at this address `https://nodejs.org/en/download/` and follow the instructions

__Install the dependencies__
In the project folder, run `npm install`

__Download docker-compose__
Follow the instructions for your operating system on this website `https://docs.docker.com/compose/install/`


__Start the docker-compose
Run `docker-compose up`

__ Access the content with your web browser__ :
Once the docker-compose is up, browse the following URL `127.0.0.1:8081`

##Credits

This project has been made by :
* __Ruben FALVERT__
* __Gabriel RUAUD__
* __Clement FAYOL

Please feel free to contact us :
* ruben.falvert@edu.ece.fr 
* gabriel.ruaud@edu.ece.fr
* clement.fayol@edu.ece.fr
