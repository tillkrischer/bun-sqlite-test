create table friends
(
    user_id   integer,
    friend_id integer,
    primary key (user_id, friend_id),
    foreign key (user_id)
        references users (id),
    foreign key (friend_id)
        references users (id)
);
