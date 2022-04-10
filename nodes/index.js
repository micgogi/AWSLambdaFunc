const axios = require('axios');
var AWSS3 = require('aws-sdk/clients/s3');
var S3 = new AWSS3();
exports.handler = async ( event, context, callback) => {
    const endpoint ='https://leetcode.com/graphql';
    const headers = {
        "content-type": "application/json"
    }
    const graphqlQuery = {
        "query": `query { matchedUser(username: "micgogi") {
                      userCalendar{
                        submissionCalendar
                      }}}`
    }
     console.log("hiii");
     
     
    
    try {
        console.log("hiii");
        // const stream = fs.createReadStream("/tmp/upload.json");
       

    let res=  await axios({
          url: endpoint,
          method: 'post',
          headers: headers,
          data: graphqlQuery
      });
      
      let jsonData =JSON.parse(res["data"]["data"]["matchedUser"]["userCalendar"]["submissionCalendar"]);
     let fileRes =await uploadFileOnS3(JSON.stringify(jsonData),{
                Bucket: 'rahulgogyani.com',
                Key: 'leetcodedata.json',
                });
    console.log(fileRes);
    
          
     console.log("testtest");
      
      
    } catch (e) {
        console.log(e);
       return {statusCode: 400, 
           body: "error"
       }
    }
};

async function processData(fileData){
     var jsdata = JSON.parse(fileData);
     var chartData2 = [];
    Object.keys(jsdata).forEach(e =>{
      chartData2.push({
        
        date:new Date(parseInt(e)*1000),
        count: jsdata[e]
      });
    });
    return chartData2;
}
async function uploadFileOnS3(fileData, s3Detail) {
    console.log("data");
   
    try {
        const realData = await processData(fileData);
         const params = {
        Bucket: s3Detail.Bucket,
        Key: s3Detail.Key,
        Body: JSON.stringify(realData), // remove stringify from here
    };
        const stored = await S3.upload(params).promise();
        console.log("file uploaded Sucessfully ", stored);
    } catch (err) {
        console.log(err);
    }
    console.log("upload exit");
}

