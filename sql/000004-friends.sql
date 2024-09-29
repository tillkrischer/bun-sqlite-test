create table friends
(
    user_id   integer not null,
    friend_id integer not null,
    primary key (user_id, friend_id),
    foreign key (user_id)
        references users (id)
         on delete cascade 
         on update no action,
    foreign key (friend_id)
        references users (id)
         on delete cascade 
         on update no action
);

insert into migrations (name) values ('000004-friends.sql');
