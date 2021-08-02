const {
    get_oid,
    prepareData
} = require('./functions')



// -----------------------------------
//              categories
// -----------------------------------
var categories = prepareData("data/categories.json");
var categories_oid = get_oid(categories);

// sql 
var sqlCategories = categories
.dropSeries('_id')
.generateSeries({
    id: (row, i) => i + 1
})
.asJSON()
.writeFileSync('dataSQL/categories.json');

// -----------------------------------
//              courses
// -----------------------------------
var courses = prepareData("data/courses.json");
var courses_oid = get_oid(courses);

// sql 
var sqlCourses = courses
.dropSeries('_id')
.generateSeries({

    id: (row, i) => i + 1,

    categoryID: (row, i) => {
        let [x] = Object.values(row.category)
        let categoryID = categories_oid.findIndex(oid => oid == x) + 1
        return categoryID
    }

})
.dropSeries('category') 
.asJSON()
.writeFileSync('dataSQL/courses.json');


// -----------------------------------
//              folders
// -----------------------------------
var folders = prepareData("data/folders.json");
var folders_oid = get_oid(folders);


// sql 
var sqlFolders = folders
.dropSeries('_id')
.generateSeries({

    id: (row, i) => i + 1,

    courseID: (row, i) => {
        let [x] = Object.values(row.course)
        let courseID = courses_oid.findIndex(oid => oid == x) + 1
        return courseID
    }

})
.dropSeries('course')
.asJSON()
.writeFileSync('dataSQL/folders.json');

// -----------------------------------
//              articles
// -----------------------------------
var articles = prepareData("data/articles.json") 
var articles_oid = get_oid(articles);

// sql articles
var sqlArticles = articles
.dropSeries('_id')
.generateSeries({

    id: (row, i) => i + 1,

    folderID: (row, i) => {
        let [x] = Object.values(row.folder)
        let folderID = folders_oid.findIndex(oid => oid == x) + 1
        return folderID
    }

})
.dropSeries('folder')
.asJSON()
.writeFileSync('dataSQL/articles.json');

// -----------------------------------
//              elements
// -----------------------------------
var elements = prepareData("data/elements.json") 

// sqlElements
var sqlElements = elements
.dropSeries('_id')
.generateSeries({
    
    id: (row, i) => i = i + 1,

    articleID: (row, i) => { 
    // oid of this row.article
    let [x] = Object.values(row.article)  
    // index of this row oid between articles id array (id_)
    let articleID = articles_oid.findIndex(oid => oid == x) + 1 
    //  
    return articleID
    }
    
})
.dropSeries('article')
.asJSON()
.writeFileSync('dataSQL/elements.json');

