
const DF = require('data-forge-fs')



// ----------------------------------------------
// step (1)
// ----------------------------------------------

// DF.readFileSync("data/posts-v1.0.json")      
// .parseJSON()                         
// .dropSeries([
//     "post_author", 
//     "post_date_gmt", 
//     "post_excerpt",
//     "comment_status",
//     "ping_status",
//     "post_password",
//     "post_name",
//     "to_ping",
//     "pinged",
//     "post_modified",
//     "post_modified_gmt",
//     "post_content_filtered",
//     "menu_order",
//     "comment_count"
// ])             
// // .where(row => predicate(row))   
// // .select(row => transform(row))       
// .asJSON()                             
// .writeFileSync("dataSQL/posts-v1.1.json");       


// ----------------------------------------------
// step (2)
// ----------------------------------------------

// DF.readFileSync("data/posts-v1.5-posts.json")      
// .parseJSON()                
// .where(row => {
//     return row["post_status"] !== "publish"
// })   
// // .select(row => transform(row))       
// .asJSON()                             
// .writeFileSync("dataSQL/posts-v1.6.json");      





// ----------------------------------------------
// step (3)
// ----------------------------------------------

//
var attachments = DF.readFileSync("data/posts-v1.7-attachments.json").parseJSON()                         
var posts = DF.readFileSync("data/posts-v1.6-posts.json").parseJSON()        


function getIMG(id) {
    return attachments.where(row => row["post_parent"] == id).toArray()
} 

// 
posts.generateSeries((row, i) => {

    let list = getIMG(row["ID"])

    return ({
        ...row,
        img: list.length > 0  ? list[0]['guid'] : ""
    })
})
.asJSON()                             
.writeFileSync("dataSQL/posts-v1.8.json");       



