create table users
(
    id         integer primary key,
    first_name text,
    last_name  text
);

insert into migrations (name) values ('000003-users.sql');
