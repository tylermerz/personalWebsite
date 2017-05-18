const Feed = require('feed');
let defaultInfo = {
    title: "Tyler Merz's Blog",
    description: 'Feed associated with www.tylermerz.com/blog. Topics include technology, web development, and general computer science topics.',
    link: 'http://www.tylermerz.com',
    image: 'http://static.tylermerz.com/tm.jpg',
    copyright: 'All rights reserved 2017, Tyler Merz',

    author: {
        name: 'Tyler A. Merz',
        email: 'tyler.merz@gmail.com',
        link: 'http://www.tylermerz.com/about'
    }
};
import { blogPageGetter } from "./databaseGet";
export class feeder {
    feed: any;
    lastUpdate:Date;
    constructor() {
        this.lastUpdate = new Date("0/0/0000");
        this.feed = new Feed(defaultInfo);
    }
    updateFeed():Promise<Object>{
        return new Promise((resolve,reject)=>{
            this.feed.items=[];
            let BPG = new blogPageGetter(0);
            let blogPagePromise = BPG.getPage();
            blogPagePromise.then(blogData => {
                BPG.pageData.forEach(post => {
                    this.feed.addItem({
                        title: post['title'],
                        id: post['id'],
                        link: "http://www.tylermerz.com/blog/post/"+post['id'].toString(),
                        description: post['postsummary'],
                        author: [{
                            name: 'Tyler A. Merz',
                            email: 'tyler.merz@gmail.com',
                            link: 'http://www.tylermerz.com/about'
                        }],
                        date: post['time']
                    })
                });
                this.lastUpdate = new Date();
                resolve({});
            }).catch(reason=>{
                console.log(reason);
                this.feed = new Feed(defaultInfo);
                reject("Could not get new data from database.");
            });
        });
    }
    getFeed():Promise<string> {
        return new Promise((resolve,reject)=>{
            if (((new Date().getTime()-this.lastUpdate.getTime())/(1000*60*60*24) > 1) || this.feed.items.length === 0){
                this.updateFeed().then(data=>resolve(this.feed.rss2()));
            } else{
                resolve(this.feed.rss2());
            }
        });
    }

}
