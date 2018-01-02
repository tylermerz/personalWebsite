import * as pg from 'pg';
export class searchInterface {
    query:string;
    searchData:Object;
    config:string;
    constructor(query:string) {
        this.query = query;
        this.searchData= {};
        this.config = process.env.DATABASE_URL;
    }

    searchTags():Promise<Object> {
        return new Promise((resolve,reject) =>{
            const client = new pg.Client(this.config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })
            let query = client.query('SELECT DISTINCT tag FROM tags WHERE soundex(tag) = soundex($1)', [this.query], (err, result) => {
                if (result.rows != undefined) {
                    this.searchData["tagResults"] = result.rows;
                    resolve(result.rows);
                } else {
                    reject("Could not get user data.");
                }
            });

            //clean up
            query.on('end', function (result) {
                client.end();
            });

        });
    }
    searchPosts():Promise<Object> {
        return new Promise((resolve,reject) =>{
            const client = new pg.Client(this.config);
            client.connect();
            client.on('error', function (error) {
                console.log(error);
                reject(error);
            })

            let query = client.query("SELECT ts_headline((postbody||title||postsummary),phraseto_tsquery($1),'MaxWords=35, MinWords=15, ShortWord=3,FragmentDelimiter=...,StartSel=<u>,StopSel=</u>') as clip,id,title, ts_rank_cd(to_tsvector(postbody||title||postsummary),phraseto_tsquery($1)) as rank FROM posts WHERE phraseto_tsquery($1) @@ to_tsvector(postbody||title||postsummary) = true ORDER BY rank DESC limit 10", [this.query], (err, result) => {
                if (result.rows != undefined) {
                    this.searchData["postResults"] = result.rows;
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


    }
    searchStaticContent():Promise<Object> {
        return new Promise((resolve,reject) =>{
            const client = new pg.Client(this.config);
            client.connect();

            let query = client.query('SELECT DISTINCT tag FROM tags where tag = $1', [this.query], (err, result) => {
                if (result.rows != undefined) {
                    this.searchData["staticResults"] = result.rows[0];
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
    }
}