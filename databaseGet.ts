import * as pg from 'pg';
const crypto = require('crypto');
let config = {
    username: process.env.username,
    database: process.env.database,
    host: process.env.host,
    port: 5432,
    idelTimeoutMillis: 30000,
};

if (!config['username']){
    config = require("./config"); 
} 
console.log(config)

export class postAdder {
    config: Object = {};
    userData: Object = {};
    userID: number;

    constructor(userID: number) {
        this.userID = userID;
        this.config = config;
    };

    addPost(data: Object): Promise<Object> {
        return new Promise((resolve, reject) => {

            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })


            let query = client.query('SELECT username, email FROM users where id = 0', (err, result) => {
                if (result.rows != undefined) {
                    this.userData = result.rows[0];
                    resolve(this.userData);
                } else {
                    reject("Could not get user data.");
                }
            });
            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
            //clean up
            query.on('end', function (result) {
                client.end();
            });

        });
    };
}


export class userGetter {
    config: Object = {};
    userData: Object = {};
    userID: number;

    constructor(userID: number) {
        this.userID = userID;
        this.config = config;
    };
    verifyUser(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            //see if the username exists and pull its salt and hashed password
            this.getUserPassInfo(username).then((userInfo) => {
                //calculate potential pass using salt
                let userSubmittedHashedPass = crypto.pbkdf2Sync(password, userInfo['salt'], 100000, 512, 'sha512');

                if (userSubmittedHashedPass.toString('hex') == userInfo["hashedpassword"]) {
                    resolve(true);
                } else {
                    resolve(false);
                }

            }).catch((err) => {
                reject(err);
            });
        });
    };

    getUserPassInfo(username: string): Promise<Object> {
        return new Promise((resolve, reject) => {

            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query('SELECT salt,hashedpassword FROM users where username = $1', [username], (err, result) => {
                if (result.rows != undefined) {
                    this.userData = result.rows[0];
                    resolve(result.rows[0]);
                } else {
                    reject("Could not get user data.");
                }
            });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

        });
    };

    getUser(): Promise<Object> {
        return new Promise((resolve, reject) => {

            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })

            let query = client.query('SELECT username, email FROM users where id = $1', [this.userID], (err, result) => {
                if (result.rows != undefined) {
                    this.userData = result.rows[0];
                    resolve(this.userData);
                } else {
                    reject("Could not get user data.");
                }
            });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

        });
    };
}


export class blogPostGetter {
    postID: number = 0;
    config: Object = {};

    postData: Object = {};

    constructor(postID: number) {
        this.postID = postID;
        this.config = config;
    };

    getTags(): Promise<Object> {
        return new Promise((resolve, reject) => {
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            });
            let tags: Array<string> = [];
            let counts: Array<number> = [];
            let maxCounts: number = 0;
            let minCounts: number = 0;
            let returnResults: Object;
            let query = client.query(`SELECT DISTINCT t1.tag, COUNT(*) OVER (PARTITION BY t1.tag) 
                                    FROM tags t1 LEFT OUTER JOIN tags t2 ON (t1.tag = t2.tag) 
                                    WHERE t1.postid = $1`, [this.postID], (err, result) => {
                    if (result.rows.length != 0) {
                        result.rows.sort(function (a, b) {
                            return 0.5 - Math.random()
                        });
                        result.rows.forEach(r => {
                            tags.push(r.tag);
                            counts.push(Number(r.count));
                        });
                        this.postData["tags"] = tags;
                        this.postData["tagCounts"] = counts;
                        this.postData["maxTagCounts"] = Math.max(...counts);
                        this.postData["minTagCounts"] = Math.min(...counts);
                        resolve(this.postData);
                    } else {
                        reject("No tags for that post");
                    }
                });
            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
            //clean up
            query.on('end', function (result) {
                client.end();
            });
        });
    }
    getPost(): Promise<Object> {
        return new Promise((resolve, reject) => {
            //set up all of the variables and objects to make a query
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query(`SELECT posts.id AS id, posts.posterid, posts.time, posts.title, posts.postbody, users.email, users.username 
                                    FROM posts LEFT OUTER JOIN users ON (posts.posterid = users.id) 
                                    WHERE posts.id = $1`, [this.postID], (err, result) => {
                    if (result.rows.length != 0) {
                        for (var key in result.rows[0]) {
                            this.postData[key] = result.rows[0][key];
                        };

                        resolve(this.postData);
                    } else {
                        reject("Post does not exist.");
                    }
                });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
        });
    };

}

export class blogPageGetter {
    pageNumber: number;
    config: Object;
    numberOfPostsPerPage = 10;
    pageData: Array<Object>;
    totalPages: number;

    constructor(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.config = config;
    };

    getTotalPages(): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            //set up all of the variables and objects to make a query
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            });
            let query = client.query('SELECT COUNT(*) FROM posts', (err, result) => {
                if (result.rows.length != 0) {
                    this.totalPages = Math.ceil(Number(result.rows[0]["count"]) / this.numberOfPostsPerPage);
                    resolve(this.pageData);
                } else {
                    reject("No posts in database.");
                }
            });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
        });
    };

    getPage(): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            //set up all of the variables and objects to make a query
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query(`SELECT posts.posterid, posts.id, posts.time, posts.postsummary, posts.title, posts.postbody, users.email, users.username 
                                    FROM posts LEFT OUTER JOIN users ON (posts.posterid = users.id) 
                                    ORDER BY posts.time DESC LIMIT $1 OFFSET $2`, [this.numberOfPostsPerPage, this.numberOfPostsPerPage * this.pageNumber], (err, result) => {
                    if (result.rows.length != 0) {
                        this.pageData = result.rows;
                        resolve(this.pageData);
                    } else {
                        reject("Page does not exist.");
                    }
                });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
        });
    };

    getTagsForPage(): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let tagsPromises: Array<Promise<Object>> = [];
            //get the tags for each post
            this.pageData.forEach(post => {
                let BPG: blogPostGetter = new blogPostGetter(post["id"]);
                tagsPromises.push(BPG.getTags());
            });
            Promise.all(tagsPromises).then(postDataArray => {
                postDataArray.forEach((postData, index) => {
                    for (var elem in postData) {
                        this.pageData[index][elem] = postData[elem];
                    }
                });
                resolve(this.pageData);
            }).catch(reason => {
                reject("Couldn't get tags.");
            });

        });
    };


    getTagPage(tag: string): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            //set up all of the variables and objects to make a query
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query(`SELECT po.posterid,po.id, po.time, po.postsummary, po.title, po.postbody, users.id as uid, users.email, users.username 
                                    FROM (SELECT p1.posterid AS PID, p1.id, p1.time, p1.title, p1.posterid, p1.postbody, p1.postsummary 
                                            FROM tags LEFT OUTER JOIN posts p1 on (tags.postid = p1.id) WHERE tag = $1) po 
                                            LEFT OUTER JOIN users ON (pid = users.id) ORDER BY po.time DESC LIMIT $2 OFFSET $3`, [tag, this.numberOfPostsPerPage, this.numberOfPostsPerPage * this.pageNumber], (err, result) => {
                    if (result.rows.length != 0) {
                        this.pageData = result.rows;
                        this.pageData["currentPage"] = this.pageNumber;
                        resolve(this.pageData);
                    } else {
                        reject("Page does not exist.");
                    }
                });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
        });
    };

    getTotalTagPages(tag): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            //set up all of the variables and objects to make a query
            const client = new pg.Client(config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query('SELECT COUNT(*) from tags where tag = $1', [tag], (err, result) => {
                if (result.rows.length != 0) {
                    this.totalPages = Math.ceil(Number(result.rows[0]["count"]) / this.numberOfPostsPerPage);
                    resolve(this.pageData);
                } else {
                    reject("No posts in database.");
                }
            });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

            query.on('error', function (error) {
                console.log(error);
                reject(error);
            });
        });
    };

}