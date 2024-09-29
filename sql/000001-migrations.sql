create table if not exists migrations
(
    name text primary key
);

insert into migrations (name) values ('000001-migrations.sql');
