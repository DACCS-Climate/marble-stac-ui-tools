async function getWordlist() {
    const resp = await fetch("{{ stac_catalog_url }}/collections")
    const json = await resp.json()
    const collection_ids = json.collections.map(collection => collection.id)
    return await Promise.all(collection_ids.map(async (id) => {
        const resp_1 = await fetch(`{{ stac_catalog_url }}/collections/${id}/queryables`)
        const json_1 = await resp_1.json()
        return Object.entries(json_1.properties).map(([key, val]) => {
            val["key"] = key
            return val
        })
    })).then(queryables => queryables.flat())
}

let fuse = null; 

function makeFuse() {
    getWordlist().then(queryables => {
        fuse = new Fuse(queryables, {
            keys: ["title", "key", "enum"], 
            treshold: 0.2, // TODO: experiment with threshold and distance values to get best results
            distance: 10,
            includeMatches: true
        });
        console.log("search is ready") // TODO: replace this with some proper message to the user
    })
}

makeFuse()

const wordOutput = document.getElementById("suggestedWordOutput");

function getWord(inputBox){
    if (fuse !== null) {
        wordOutput.innerText = fuse.search(inputBox.value).map(obj => obj.matches.map(match => match.value).flat()).flat();
    }
}
