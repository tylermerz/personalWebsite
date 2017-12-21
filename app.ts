var React = require('react');
let express = require('express');
let app = express();
let helmet = require('helmet');
let morgan = require('morgan');
let fs = require('fs');
let path = require('path');
import { blogPostGetter, blogPageGetter } from "./databaseGet";
import { searchInterface } from "./searchInterface";
import {feeder} from "./feeder";
let feed = new feeder();
//security packages and middleware

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))
app.use(helmet());

//express setup to use handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require("body-parser");
app.get(['/about', '/'], function (req, res) {
    res.render('about', {});
});
app.get('/proj', function (req, res) {
    res.render('proj', {});
});

app.get('/blog/rss.xml', function (req, res) {
    let feedPromise = feed.getFeed();
    feedPromise.then(data=>{
        res.send(data);
    }).catch(error=>{
        res.send("Could not get feed.");
    });
});
//register the blogging behavior
app.get('/blog/page/:pageID', function (req, res) {
    //make sure that the pageID is a valid number
    let pageID = 0;
    if (Number.isInteger(Number(req.params.pageID)) === true && Number(req.params.pageID) >= 0){
        pageID = req.params.pageID;
    } 
    let BPG: blogPageGetter = new blogPageGetter(Number(pageID));
    let blogDataPromise: Promise<Array<Object>> = BPG.getPage();
    let blogTotalPagesPromise: Promise<Array<Object>> = BPG.getTotalPages();
    Promise.all([blogDataPromise, blogTotalPagesPromise]).then(blogData => BPG.getTagsForPage()).then(blogData => {
        res.render('blogPage', { "posts": BPG.pageData, "totalPages": BPG.totalPages, "currentPage": BPG.pageNumber, "basePath": "/blog/" });
    }).catch(function (reason) {
        res.render('infoPage', { message: "That blog page could not be found." });
    });
});


app.get('/blog/', function (req, res) {
    let BPG: blogPageGetter = new blogPageGetter(0);
    let blogDataPromise: Promise<Array<Object>> = BPG.getPage();
    let blogTotalPagesPromise: Promise<Array<Object>> = BPG.getTotalPages();
    Promise.all([blogDataPromise, blogTotalPagesPromise]).then(blogData => BPG.getTagsForPage()).then(blogData => {
        res.render('blogPage', { "posts": BPG.pageData, "totalPages": BPG.totalPages, "currentPage": BPG.pageNumber, "basePath": "/blog/" });
    }).catch(function (reason) {
        res.render('infoPage', { message: "Blog could not be retrieved." });
    });
});

app.get('/blog/post/:postID', function (req, res) {
    //make sure that the postID is a valid number
    let postID = 0;
    if (Number.isInteger(Number(req.params.postID)) === true && Number(req.params.postID) >= 0){
        postID = req.params.postID;
    } 
    let BPG: blogPostGetter = new blogPostGetter(Number(postID));
    let post: Promise<Object> = BPG.getPost();
    let tags: Promise<Object> = BPG.getTags();
    Promise.all([tags, post]).then(blogData => {
        res.render('blogPost', BPG.postData);
    }).catch(function (reason) {
        res.render('infoPage', { message: "That post could not be found." });
    });
});

//register the blogging behavior
app.get('/blog/tags/:tag/page/:pageID', function (req, res) {
    let pageID = 0;
    if (Number.isInteger(Number(req.params.pageID)) === true && Number(req.params.pageID) >= 0){
        pageID = req.params.pageID;
    }
    let BPG: blogPageGetter = new blogPageGetter(Number(pageID));
    let blogDataPromise: Promise<Array<Object>> = BPG.getTagPage(req.params.tag);
    let blogTotalPagesPromise: Promise<Array<Object>> = BPG.getTotalTagPages(req.params.tag);
    Promise.all([blogDataPromise, blogTotalPagesPromise]).then(blogData => BPG.getTagsForPage()).then(blogData => {
        res.render('blogPage', { "posts": BPG.pageData, "totalPages": BPG.totalPages, "currentPage": BPG.pageNumber, "basePath": "/blog/tags/" + req.params.tag + "/" });
    }).catch(function (reason) {
        res.render('infoPage', { message: "That tag page could not be found." });
    })
});

//register the blogging behavior
app.get('/search/', function (req, res) {
    //limit the max search length
    let query = "";
    if (req.query.query !== undefined){
        query = req.query.query.slice(0,256);
    }
    let searchInter = new searchInterface(query);
    let tagSearchPromise = searchInter.searchTags();
    let postSearchPromise = searchInter.searchPosts();
    Promise.all([tagSearchPromise, postSearchPromise]).then(searchData => {
        res.render('search', { "query": req.query.query, "searchResults": searchInter.searchData })
    }).catch(function (reason) {
        res.render('infoPage', { message: "Search Failed." });
    });
});


//handle default requests
app.all('*', function (req, res) {
    res.render('infoPage', { message: "That page could not be found." });
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!');
});
