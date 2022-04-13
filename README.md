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

* **Procedures to deploy this app**:

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

* ***Procedures to test this app***:

1. Make sure your device is connected to UCL Wifi or UCL VPN.
2. Make sure the Node JS server is active.
3. **Asset Creation App**
	* Make sure operating hardware has a width of the screen **Larger** than 994px
4. **Condition Assessment App**
	* Make sure operating hardware has a width of the screen **Smaller** than 994px
5. In a browser that supports geolocation access via http connection (such as Chrome or Firefox),
type the following address to use the asset condition assessment app:
https://cege0043-2022-45.cs.ucl.ac.uk/app/bootStrap.html
6. While testing the functionality of this map, use of Inspect or Developer mode of the browser to see if any error occurs.

[Go to Top](#top)

<a name="4"></a>
## 4. File description

The files associated to the Asset Condition Assessment App are located in the ```cege0043-apps-21-22-GXT-xinn``` folder and its subfolders.
* ```~/cege0043-apps-21-22-GXT-xinn```
	* ```bootStrap.html```: The main html file of this app, through which user could use both Asset Creation App and Condition Assessment App on demand. This file interconnects most resources within the ```~/cege0043-apps-21-22-GXT-xinn```(except the ```~/Build``` and ```dashboard.html```). This file constains several divs and menu links.
		* DIV

		|       id       |    description   |
		|  ------------  |  --------------  |
		|wrapper         |  Hold all divs.  |
		|sidebar         |  Hold the accordion Sidebar and buttons corresponding to their functions.|
		|content-wrapper |  Hold content interconnected to the sidebar buttons. |
		|mapContainer    |  Hold the leaf map.|
		|listContainer   |  Hold D3 table showing a list of assets with least one best condition report. |
		|graphContainer  |  Hold D3 multibar chart showing daily reporting rates for the past week. |
		
		* NAV-LINKS
		
		|                 name                  |    description   |
		|     ----------------------------      |  --------------  |
		|List of Assets in Best Condition       |  Display D3 table showing a list of assets with least one best condition report.  |
		|Daily Reporting Rates Graph – All Users|  Display D3 multibar chart showing daily reporting rates for the past week for all user. Values are categorized to two types: reports_submitted and reports_not_working (known as reports with the worst condition values) |
		|Help                                   |  Link to the User Guide webpage for the step-by-step guideline on Condition Assessment App. |
		|User Ranking                           |  Alert message telling user their rank based on the total number of reports submitted comparing to other users in the database. |
		|Add Layer - 5 closest assets           |  Load map layer showing the 5 assets closest to the user's current location, added by any user. |
		|Remove Layer - 5 closest assets        |  Remove the 5 closest assets layer and return to the default map layer. |
		|Add Layer – last 5 reports, colour coded    |  Load map layer showing the last 5 reports created by the user (colour coded depending on the condition value). |
		|Remove layer – last 5 reports          |  Remove the 5 reports layer and return to the default map layer. |
		|Add Layer – not rated in the last 3 days    |  Load map layer that shows assets and that user hasn't rated in the last 3 days. |
		|Remove Layer – not rated in the last 3 days |  Remove the unrated assets layer and return to the default map layer. |
	
	* ```UserGuide.html```: The step-by-step guideline for user to use the Condition Assessment App. This links to the Help navigation link on the side menu.

* ```~/cege0043-apps-21-22-GXT-xinn/js```: Containing Javascript files required by ```bootStrap.html``` and ```UserGuide.html```.
	* ```leaflet.awesome-markers.js``` : Add colorful iconic markers for Leaflet.
	
	* ```sb-admin-2.js```: Activate sidebar functionalities
	
	* ```basicMap.js```: ```loadLeafletMap()``` loads the leaflet map and set the default view and zoom, as well as loading the basemap tiles
	
	* ```calculatedist.js```: Functions are designed to consistently track user's location and calculate the closest asset (as proximity alert)
	| :------------: | :--------------: |
	| function       |   description    |
	| ------------   |  --------------  |
	|getLocation()         |  Consistently Tracking user's location  |
	|showPosition()         |  Extracts the coordinates of user's location and uses coordinates to perform ```closestFormPoint()```. |
	|closestFormPoint() |  Loops through the points on the default map layer and use ```calculateDistance()``` function to finds the closest asset point and automatically pops up the condition form. It requires two parameters: user's latitude and user's longitude.|
	|calculateDistance()    |  Calculates the distance between two points, requires 5 parameters: lat1, lon1, lat2, lon2, and unit.|
	|removePositionPoints()   |  Disables the location tracking to remove all points created through tracking. |
	
	* ```assetCreation.js```: Save information submitted through Asset Creation App and Condition Assessment App.
	| :------------: | :--------------: |
	| function       |   description    |
	| ------------   |  --------------  |
	|checkCondition()         |  Prepares the values entered through condition form for database insertion and raise alert for user to double check their condition selection and comparing to the previous condition selection.   |
	|processconditionData()         |  Ajax call to insert condition information to the PostgreSQL database. |
	|sumReports() |  Raise alert message to inform user their total report submittion. |
	|saveNewAsset()    |  Prepare the values entered through asset form for database insertion.|
	|processAssetData()   |  Ajax call to insert new asset information to the PostgreSQL database. |
	
	* ```corefunc.js```: Functions create the default map layers for the asset condition assessment app.
	| :------------: | :--------------: |
	| function       |   description    |
	| ------------   |  --------------  |
	|setMapClickEvent()   |  Recognizes the window size and activate corresponding app. For window width smaller than 992px, Condition Assessment App will be activate, and vice versa.  |
	|setUpPointClick()    |  Loads User's asset points and Creates colour-code markers based on latest codition value for Condition Assessment app. |
	|getPopupHTML()       |  Creates the condition asessment form. This function also holds the condition value before submission as an hidden variable. |
	|onMapClick()         |  Gets coordinates when users click on the map. |
	|basicFormHtml()      |  Creates the asset creation form. |
	|exsitingPointClick() |  Loads and creates all assets created by user as points to the map for the Asset Creation app.|
	|existingPopupHTML()  |  Creates a read-only form as a popup when users click on the marker under the Asset Creation app.|
	
	* ```menu.js```: This covers all that Advance Functionality 2 is asked in assignment 5.
	| :------------: | :--------------: |
	| function       |   description    |
	| ------------   |  --------------  |
	|bestCondition()         |  Retreives assets' information which have at least one report with the best condition value and displays the information on a table.|
	|closebestCondition()    |  Removes the table window. |
	|dailyReportRate()       |  Retreives the reporting acitivity for the past week and displays information in a multibar graph.  |
	|closeGraph()            |  Removes the graph window|
	|userRank()              |  Raises an alert message informing user their ranking based on number of condition reports created. |
	|Show5Asset()            |  Creates a map layer showing the 5 assets, added by any user, thats are closest to the user's current location. |
	|Remove5Asset()          |  Remove the 5 closest assets layer and return to the default map layer.|
	|Show5Report()           |  Creates a map layer showing the last 5 reports with color, in respect of their condition description, created by the user. |
	|Remove5Report()         |  Remove the 5 latest reports layer and return to the default map layer.|
	|ShowRate()              |  Creates a map layer showing assets which user has not rated in last 3 days. |
	|RemoveRate()            |  Remove the layer containing assets that are not rated in last 3 days and return to the default map layer. |


* ```~/cege0043-apps-21-22-GXT-xinn/css```
	* Setting up styles of ```bootStrap.html``` (such as fonts and margins) and incorporating the CSS required for custom icon creation.
	* ```~/css/images```: containing the images required for the custom icon creation and default user image for ```dashboard.html```.


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