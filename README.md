# Asset Condition Assessment App
<a name="top"></a>
A technical guide for an asset condition assessment app. The asset condition assessment app contains two parts: Asset Creation App and Condition Assessment App. Asset Creation App only available on large or extra large screen devices, like browser. Condition Assessment App is only activated on a small or medium screen devices, like smartphone. This app allows the user to create a new asset by clicking on the map (through browser) and allows the user to capture the condition of an asset (through phone) by press on a marker on a Leaflet map. Asset Creation App is able to save new assets information, including location, asset name, and installation date, to the database. It is also able to retrieve asset information to serve the Condition Assessment App. The Condition Assessment App is able to save new condition report to the database and retrieve the conditions of existed assets information from the database.

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

[Go to Top](#top)

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

[Go to Top](#top)

<a name="3"></a>
### 3. Testing

* Procedures to test this app:

1. Make sure your device is connected to UCL Wifi or UCL VPN.
2. Make sure the Node JS server is active.
3.1. Asset Creation App
	* Make sure operating hardware has a width of the screen **Larger** than 994px
3.2. Condition Assessment App
	* Make sure operating hardware has a width of the screen **Smaller** than 994px
4. In a browser that supports geolocation access via http connection (such as Chrome or Firefox),
type the following address to use the asset condition assessment app:
https://cege0043-2022-45.cs.ucl.ac.uk/app/bootStrap.html
5. While testing the functionality of this map, use of Inspect or Developer mode of the browser to see if any error occurs.

[Go to Top](#top)

<a name="4"></a>
## 4. File description

The files associated to the Asset Condition Assessment App are located in the ```cege0043-apps-21-22-GXT-xinn``` folder and its subfolders.
* ~/cege0043-apps-21-22-GXT-xinn
	* ```bootStrap.html```: The main html file of this app, through which user could use both Asset Creation App and Condition Assessment App on demand. This file interconnects most resources within the ```~/cege0043-apps-21-22-GXT-xinn```(except the ```~/Build``` and ```dashboard.html```). This file constains several divs and menu buttons.
		* DIV

		|       id       |    description   |
		| :------------: | :--------------  |
		|wrapper         |  Hold all divs.  |
		|sidebar         |  Hold the accordion Sidebar to disply list of assets with least one best condition report and D3 chart containing user's daily report rate for Asset Creation App. Hold the accordion Sidebar to add and remove layer for 5 closest asset, last 5 reports, or assets unrated in last 3 days. Additionally, User Rank message link and Help link for user guide webpage.|
		|content-wrapper |  Hold content interconnected to the sidebar buttons. |
		|mapContainer    |  Hold the leaf map.|
		|listContainer   |  Hold D3 table containing a list of assets with least one best condition report. |
		|graphContainer  |  Hold D3 multibar chart showing daily reporting rates for the past week. |


[Go to Top](#top)

<a name="5"></a>
## 5. Code reference & Acknowledgments


* A large proportion of codes are adapted from the lab notes of CEGE 0043 Web Mobile and GIS by Calire Ellul, including
	* Basic structures of bootStrap.html
	* Functions related to user location tracking, displaying/removing map layers and popup forms, data retreiving, data uploading, data processing, and getting port numbers.
	* Template of the [README.md](https://moodle.ucl.ac.uk/pluginfile.php/2598095/mod_resource/content/1/technical-documentation-example.pdf)

* Template of user guide page is an modified version of [Template Visual](https://github.com/surjithctly/documentation-html-template)'sDocumentation.
* May layers of this app are based on [Leaflet](https://leafletjs.com/).
* The histograms showing daily user participation and table showing a list of all assets with least one 'best-condition' report utilise [D3 JavaScript library](https://d3js.org/d3.v5.min.js).
* The style of markers untilise the [leaflet awesome-markers Javascript](https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js)
* The README.md file is developed with the help of [Markdown Cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md#TOP)

[Go to Top](#top)