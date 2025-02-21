# stac-ui-tools
Tools to build the dictionary files, client-side functionality, and basic search UI for the STAC search component

Map UI added using Leaflet map that will allow an intuitive interface for the user.

# Requirements
- [Fuse.js](https://github.com/krisk/Fuse)
- [Python](https://www.python.org/)
- [Jinja2](https://pypi.org/project/Jinja2/)
- [LeafletJS](https://leafletjs.com/)

## Leaflet Plugins

Plugins that do not have a dedicated CDN are installed as 
[submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) of this repository in the `plugins/`
directory.

Relevant files from these plugins are then symlinked to the appropriate location in the `static/` directory.

# Build the dictionary
The STAC Search UI dictionary comes with a default dictionary of words and terms currently used in the STAC catalog. 
Currently a short list of words is being used for testing purposes.

1. Go to the root of your project and run the build command in the terminal.
`python3 build.py`
The dictionary files will be created under the `templates/dictionary/stac_dictionary` directory and then 
automatically built into the `build/dictionary/stac_dictionary` directory

# Building with custom dictionaries
Custom dictionaries can be used by providing a csv file with column name/headers "Variable", "Standard name", and 
"Long name".

1. Remove the default `CMIP6_Variables.csv` file already in the folder
2. Put your CSV source file in the `csv` folder
3. Go to the root of your project and run the build command in the terminal with the custom dictionary flag `-d` and the 
name of your dictionary.
`python3 build.py -d <your-dictionary-name>`
4. The dictionary files will be created under the `templates/dictionary/<your-dictionary-name>` directory and then 
automatically built under the `build/dictionary/<your-dictionary-name>` directory.

# Running the dictionary
1. Go to the build directory and start a web server
```
cd build
python3 -m http.server

```

2. Go to the localhost in your browser and go to the `sample.html` page
`http://localhost/sample.html`

3. Type in the search field and see the suggested words below it 


# Running the Leaflet Map
Leaflet is browser based and dependencies are loaded from the web page.

## Building the Leaflet Map

The Leaflet map is built with the project. 

1. If needed, go to the root folder of the project and build the project with 
the following command:
```
python3 build.py
```

2. Start a  localhost:
```
python3 -m http.server
```

3.  Go to the Leaflet map page:
```
http://localhost:8000/leaflet.html
```


# Development notes
## Creating Custom Dictionaries

A dictionary requires two files an `"affix"` file (`.aff`) and a word list file (`.dic`).  The affix file is a list of 
prefixes and suffixes a word can have.  For example, "supply" can have the suffix "ied" when dropping the "y" to make
"supplied".

An affix file is not needed for dictionaries of 100,000 words or less.

The affix file at least needs the encoding set for Typo.js to read it.  This is automatically set for `UTF-8.`

The word list file starts with the number of words in the file, followed by a list of words separated by a newline character.

[Hunspell dictionary file documentation](https://manpages.ubuntu.com/manpages/focal/man5/hunspell.5.html)
