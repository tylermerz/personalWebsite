# personalWebsite
This is repository hosts the code with which I run my own personal/professional website. The website consists of a few hardcoded pages about myself and some of my own personal projects and then also a blog on which I intend to post small snippets of code which I find interesting or useful about my projects.  

## Installation and Usage
### Installation
To install this project clone the repository and then use npm to install the dependencies:
```bash
git clone https://github.com/tylermerz/personalWebsite.git
cd personalWebsite
npm install
```

Before the project can be run, the database which will hold the blog posts, tags for the blog posts, and users will need to be specified in the config.json file. Additionally, the databases will need to be created. Three separate tables will need to be created for the website to function---one for users who post to the blog, one for the posts themselves, and one for the associated tags for those posts.

To create the posts table:
```sql
-- Table: public.posts

-- DROP TABLE public.posts;

CREATE TABLE public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    "time" timestamp without time zone,
    title text COLLATE pg_catalog."default",
    posterid integer,
    postbody text COLLATE pg_catalog."default",
    postsummary text COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.posts
    OWNER to username;
```

To create the tags table:
```sql
-- Table: public.tags

-- DROP TABLE public.tags;

CREATE TABLE public.tags
(
    id integer NOT NULL,
    tag text COLLATE pg_catalog."default" NOT NULL,
    postid integer NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tags
    OWNER to username;
```

And finally the users table:
```sql
-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "time" timestamp without time zone,
    username text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    salt text COLLATE pg_catalog."default",
    hashedpassword text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to username;
```

An example config.json file:
```json
{
    "user": "username",
    "database": "databaseName",
    "host": "postgresDatabaseWebsite",
    "port": 5432,
    "idleTimeoutMillis": 30000
}
```

Additionally you should update the views/disqus.jsx and tsx/PlasticTable.tsx to work with your own disqus comments database and your own github repository.

### Usage
To run the project simply compile the typescript into javascript and then run the compiled project with node:
```bash
tsc
node app.js
```

Obviously if you are going to use this project as a basis for your own website, please configure the views/default.jsx file to reflect your own style and info.

## Contributing
I am open to contributions from others in all areas of this project.

## License
I am releasing the portion of this code which I have personally written under the MIT license.