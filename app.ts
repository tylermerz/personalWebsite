var React = require('react');
let express = require('express');
let app = express();
let helmet = require('helmet');
import { blogPostGetter, blogPageGetter } from "./databaseGet";
import { searchInterface } from "./searchInterface";
//security packages and middleware

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

//register the blogging behavior
app.get('/blog/page/:pageID', function (req, res) {
    let BPG: blogPageGetter = new blogPageGetter(Number(req.params.pageID));
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
    let BPG: blogPostGetter = new blogPostGetter(Number(req.params.postID));
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
    let BPG: blogPageGetter = new blogPageGetter(Number(req.params.pageID));
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
    let searchInter = new searchInterface(req.query.query);
    let tagSearchPromise = searchInter.searchTags();
    let postSearchPromise = searchInter.searchPosts();
    Promise.all([tagSearchPromise, postSearchPromise]).then(searchData => {
        res.render('search', { "query": req.query.query, "searchResults": searchInter.searchData })
    }).catch(function (reason) {
        res.render('infoPage', { message: "Search Failed." });
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
})
