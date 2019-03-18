<p align="center">
  <img src="https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=breathecode,128">
</p>

<p>
    <h2 align="center"> Cloud 9 (C9) Plugin/Extension for BreatheCode Users </h2>
</p>

[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/breatheco-de/c9-plugin/commits/master)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/breatheco-de/c9-plugin/blob/master/LICENSE)

All of Breathe Code's functionality inside the C9 Coding Editor.

## Installation

1. Using your command line, download the initialization script:
```sh
$ wget https://raw.githubusercontent.com/breatheco-de/c9-plugin/master/init.js
```
:pencil2: You will find a new file in your workspace root with the name `init.js`.

2. Copy the content of the downloaded file `init.js` inside your menu: Cloud 9 `->` Open Your Init Script.

3. Press `control + enter` to apply the changes to Cloud 9.

![Animated Installation Tutorial](https://raw.githubusercontent.com/breatheco-de/c9-plugin/master/assets/install.gif "Animated Installation Tutorial")

## What does this plugin do?

- It ads a menu on the top called "BreatheCode" with shortcuts to boilerplates and other interesting stuff for the students.
- It will install node v8 and keep it that way.
- It installs pyenv, that way you have access to last version of python.
- It makes vailable lots of bash scripts that will make your life easier: Installing MySQL, Installing Postgree, Installing PHP 6, etc. Here is the full [here is the full list of bash scripts](https://github.com/breatheco-de/c9-plugin/tree/master/bash)

### For the future

- We plan to start collecting data from your console errors, etc. The idea is to know more about you and how can we help you, this is not implemented yet and we would ask for your permision once we do it.
