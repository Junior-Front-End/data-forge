const DF = require('data-forge-fs')

 
// prepareData
function prepareData(path) {
    return DF.readFileSync(path)
    .parseJSON()
    .dropSeries('__v');
}

// get_oid
function get_oid(the_df) {

    //
    var oid = the_df.generateSeries({oid: (row) => { 
        // get first value in the object
        let [x] = Object.values(row._id)
        return x     
    }})
    .getSeries('oid')
    .toArray();

    //
    return oid;

}
 

//
module.exports = {
    prepareData,
    get_oid
}