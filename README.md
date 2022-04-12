# Asset Condition Assessment App

A technical guide for an asset condition assessment app. The asset condition assessment app contains two parts: Asset Creation App and Condition Assessment App. Asset Creation App only available on large or extra large screen devices, like browser. Condition Assessment App is only activated on a small or medium screen devices, like smartphone. This app allows the user to create a new asset by clicking on the map (through browser) and allows the user to capture the condition of an asset (through phone) by press on a marker on a Leaflet map. Asset Creation App is able to save new assets information,including location, asset name, and installation date, to the database. It is also able to retrieve asset information to serve the Condition Assessment App. The Condition Assessment App is able to save new condition report to the database and retrieve the conditions of existed assets information from the database.

All assets are displayed as POINTS on the Leaflet map.

## Table of Contents

1. [System Requirements](#1)
2. [Deployment](#2)
3. [Testing](#3)
4. [File description](#4)
5. [Code reference & Acknowledgments](#5)

## Getting Started

<a name="1"></a>
### 1. System Requirements

#### Prerequisites

* If you are going to use this app outside the UCL campus (not connected to Eduroam), make sure you are connected to UCL VPN by following the instructions at https://www.ucl.ac.uk/isd/services/get-connected/remote-working-services/ucl-virtualprivate-network-vpn.

* This app requires to make connections to a Ubuntu Server (Virtual Machine). You could use BitVise, Pycharm (Version 2018.3.5 Professional Edition) or other SSH software to connect to the Ubuntu Server.##

* In order to enable the full functionality of this app, a browser that supports geolocation access via http connection is required. Some browsers (such as Safari) block geolocation access via http connection. As a result, the app cannot locate and zoom into user positions if it is opened in those browsers. Therefore, it is recommended to use Chrome(Version 73.0.3683.75 or above) or Firefox(Version 65.0.2 or above) for this app.

* As the Asset Creation App and Condition Assessment App operate under different screen size, to successfully enable the use of Condition Assessment App, device with the browser width smaller than 992px is required.

#### External Libraries

* This app is developped on Bootstrap (Version4.3.1). Generally, Bootstrap supports the latest versions of each major platform’s default browsers. Note that proxy browsers (such as Opera Mini, Opera Mobile’s Turbo mode, UC Browser Mini, Amazon Silk) are not supported. Regarding to Android mobile users, an Android v5.0+ is recommended. 

* Another external library used is JQuery (version3.4.1). Most up-to-date major platform’s default browsers (such as Chrome, Edge, Firefox, Safari, Opera etc.) supports the used version of JQuery. For mobile users, browser on Android v4.0+ and Safari on iOS v7+ are recommended. Same requirement for library D3 v5+.


<a name="2"></a>
### 2. Deployment

* Procedures to deploy this app:

1. Clone the source code of this asset condition assessment app from Github to CEGE server at ```home/studentuser/code``` by typing in the command line (terminal) window for Ubuntu: 

```
cd /home/studentuser/code 
git clone https://github.com/ucl-geospatial-21-22/cege0043-apps-21-22-GXT-xinn.git
```

2. Clone the source code of the corresponding Node JS server from Github to CEGE server at ```home/studentuser/code```.

```
cd /home/studentuser/code
git clone https://github.com/ucl-geospatial-21-22/cege0043-api-21-22-GXT-xinn.git
```

3. Go to the cege0043-api-21-22-GXT-xinn folder and start the Node JS server.

```
cd /home/studentuser/code/cege0043-api-21-22-GXT-xinn
pm2 start dataAPI.js
```

4. Make sure the Node JS server is successfully started. If any error occurs, you could enter the debug mode through the command line window by typing

```
cd /home/studentuser/code/cege0043-apps-21-22-GXT-xinn
node app.js
```


<a name="3"></a>
### 3. Testing


* How to run the program
* Step-by-step bullets
```
code blocks for commands
```
<a name="4"></a>
## 4. File description

Any advise for common problems or issues.
```
command to run if program contains helper info
```
<a name="5"></a>
## 5. Code reference & Acknowledgments


Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)
