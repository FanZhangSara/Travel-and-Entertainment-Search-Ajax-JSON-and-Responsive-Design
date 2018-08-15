var express = require('express');

const yelp = require('yelp-fusion');

const client = yelp.client('LaJU8oqme_OqwPS35GM7O5Fx3Hw8RWbS45LkresqOe2QTd_4PYUFzKLyhrCgNaq-m_JvJy_P8WFHYqDDNSbD6ky8b-yLFwN4FgK0ozmZydvUed5fZHBq4is-EQTAWnYx');


// var swig = require('swig');
var request = require('request');
// var bodyParser=require('body-parser');
var cookieParser = require('cors');
var urlencode = require('urlencode');

var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

var cors = require('cors');
app.use(cors());
// app.use(cors({origin:'http://localhost:8081/'}));

app.use('/public',express.static(__dirname+'/public'));

// app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
// swig.setDefaults({cache:false});

app.get('/',function (req,res,next) {
    //res.send('<h1>welcome</h1>')
    res.sendFile(__dirname+'/views/index.html');
})




app.get('/getinfo',function (req,res,next) {
    console.log("ddddd");
    res.setHeader("Access-Control-Allow-Origin","*");

    https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeid+'&key=AIzaSyBhGwaH5KuFI4AgB2Yu4VgKcHy29CtskW4

        //res.send('<h1>welcome</h1>')
        var placeid=req.query.placeid;

    console.log(distance);

    // url: "http://localhost:8081/getinfo?placeid=ChIJ7aVxnOTHwoARxKIntFtakKo,
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeid+'&key=AIzaSyBhGwaH5KuFI4AgB2Yu4VgKcHy29CtskW4';
    request(url,function (error,response,body) {
        if(error){
            console.log("wrong");
            console.log(error);
        }else{
            if(response.statusCode==200){
                res.send(body);
            }
        }
    })
    //res.send()
})

app.get('/searchinfo',function (req,res,next) {
    console.log("ddddd");
    res.setHeader("Access-Control-Allow-Origin","*");
    //res.send('<h1>welcome</h1>')
    var keyword=req.query.keyword;
    var type = req.query.Category;
    var lat = req.query.lat;
    var lon = req.query.lon;
    var distance = req.query.distance;

    console.log(distance);

    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lon+'&radius='+distance+'&type='+type+'&keyword='+keyword+'&key=AIzaSyBix1e20sK7gC5h48EvDc7SbRhVdn5GH8U';
    console.log(url);
    request(url,function (error,response,body) {
        if(error){
            console.log("wrong");
            console.log(error);
        }else{
            if(response.statusCode==200){
                res.send(body);
            }
        }
    })
        //res.send()
})

app.get('/getlatlon',function (req,res,next) {
    console.log("222");
    res.setHeader("Access-Control-Allow-Origin","*");
    var location = req.query.location;
    console.log(encodeURI(location));

    var url='https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURI(location)+'&key=AIzaSyBix1e20sK7gC5h48EvDc7SbRhVdn5GH8U';
    console.log(url)
    request(url,function (error,response,body) {
        if(error){
            console.log("wrong");
            console.log(error);
        }else{
            if(response.statusCode==200){
                res.send(body);
                console.log(body);
            }
        }
    })

})


app.get('/nextinfo',function (req,res,next) {
    console.log("333");
    res.setHeader("Access-Control-Allow-Origin","*");
    var pagetoken = req.query.pagetoken;

    var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken='+pagetoken+'&key=AIzaSyBix1e20sK7gC5h48EvDc7SbRhVdn5GH8U';
    request(url,function (error,response,body) {
        if(error){
            console.log("wrong");
            console.log(error);
        }else{
            if(response.statusCode==200){
                res.send(body);
            }
        }
    })

})

app.get('/finalinfo',function (req,res,next) {
    console.log("444");
    res.setHeader("Access-Control-Allow-Origin","*");
    var pagetoken = req.query.pagetoken;

    var url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken='+pagetoken+'&key=AIzaSyBix1e20sK7gC5h48EvDc7SbRhVdn5GH8U';
    request(url,function (error,response,body) {
        if(error){
            console.log("wrong");
            console.log(error);
        }else{
            if(response.statusCode==200){
                res.send(body);
            }
        }
    })

})


app.get('/yelpbest',function (req,res,next) {
    console.log("55");
    res.setHeader("Access-Control-Allow-Origin","*");

    client.businessMatch('best', {
        // name: 'Pannikin Coffee & Tea',
        // address1: '510 N Coast Hwy 101',
        // address2: 'Encinitas, CA 92024',
        // city: 'Encinitas',
        // state: 'CA',
        // country: 'US'
        name: req.query.name,
        address1: req.query.address,
        city: req.query.city,
        state: req.query.state,
        country: 'US'
    }).then(function (data) {
        console.log(data);
        res.send(data.jsonBody);

    }).catch(function (e) {

        console.log(e);
    });


});


app.get('/yelpGetReview',function (req,res,next) {
    console.log("55");
    res.setHeader("Access-Control-Allow-Origin","*");

    client.reviews(req.query.id).then(function (data) {
        console.log(data);
        res.send(data.jsonBody);

    }).catch(function (e) {

        console.log(e);
    });


});

// const yelp = require('yelp-fusion');
//
// const client = yelp.client(apiKey);

// app.get('/main.css',function(req,res,next){
//     res.setHeader('content-type','text/css');
//     res.send("body{background:red;}");
// })
app.listen(8081);
