
const DF = require('data-forge-fs')



// ----------------------------------------------
// step (1)
// ----------------------------------------------

// DF.readFileSync("data/tax.csv")      
// .parseCSV()                         
// .dropSeries([
//     "term_taxonomy_id", "description","parent","count"

// ])             
// .where(row => row["post_type"] == "post")   
// // .select(row => transform(row))       
// .asJSON()                             
// .writeFileSync("dataSQL/posts-v1.0.json");       


// ----------------------------------------------
// step (2)
// ----------------------------------------------

DF.readFileSync("data/articles.json")      
.parseJSON()                
// .where(row => {
//     return row["post_status"] !== "publish"
// })   
// .select(row => transform(row))                           
.generateSeries((row, i) => {
    
    // var cc = row["content"].replaceAll(`\"`, `\\\'"`)

    return ({ 
        content: JSON.stringify({content: row["content"]}), 
    })
})   
// .dropSeries([
//     "guid", "ID", "post_date", "post_content", "post_title", "img"
// ])       
.asCSV()                             
.writeFileSync("dataSQL/articles.csv");      





// ----------------------------------------------
// step (3)
// ----------------------------------------------

//
// var folders = DF.readFileSync("data/folders.json").parseJSON()                         
// var rels = DF.readFileSync("data/rel.csv").parseCSV()                         
// var articles = DF.readFileSync("data/articles.json").parseJSON()        


// function getIMG(id) {
//     var ids = folders.toArray().map(d => d["term_id"])
//     return rels.toArray().filter(row => ids.includes(row["term_taxonomy_id"]) && row["object_id"] == id)
// } 

// // 
// articles
// // .where(row => row["taxonomy"] == "category")
// // .dropSeries(["term_taxonomy_id", "taxonomy","description","parent","count"])
// .generateSeries((row, i) => {

//     let list = getIMG(row["ID"])

//     return ({
//         folderID: list.length > 0  ? list[0]['term_taxonomy_id'] : ""
//     })
// })
// .asJSON()                             
// .writeFileSync("dataSQL/articles-1.json");       


     
