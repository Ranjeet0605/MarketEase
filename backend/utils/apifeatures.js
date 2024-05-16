const { json } = require("body-parser");

class ApiFeatures {
    constructor(query,querystr){
      // this is use for apifeatures class ko hi use kar rhe hai
        this.query = query;
         this.querystr = querystr
    }
    // for product search
    search(keyword){
        const keywordFilter = keyword 
        ? {
            name:{
              //regex means regular expressions we are use it's for finding similar string or query if minor variations give
                $regex: keyword,
                //we are use options for case sensentive string 
                $options: 'i',
            },

        }
        :{};
        // we are changing query when we find product we simple use find now then we send query then we give keyword
        this.query= this.query.find({...keywordFilter})
        // we return this we want to reutrn this class
        return this;

    }

    // filter for price or rating


  // pagination that's how many product show in par page
//for product search 
  filter(){
    //now this querystr by refrence pass nahi hui hai
    const queryCopy = {...this.querystr}
  // Removing some fields for category
  const removeFields = ["keyword", "page","limit"]
  removeFields.forEach((key)=> delete queryCopy[key]);
  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
  this.query = this.query.find(JSON.parse(queryStr));
  return this;
}
pagination(resultperpage){
  const currentpage = Number(this.querystr.page) || 1
  const skip = resultperpage*(currentpage-1)
  this.query = this.query.limit(resultperpage).skip(skip)
  return this
}
};
module.exports = ApiFeatures;