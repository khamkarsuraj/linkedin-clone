create database linkedout;

\c linkedout

create table users
(
    user_id serial primary key,
    first_name varchar(20) not null,
    last_name varchar(20),
    email varchar(40) not null unique,
    password varchar(20) not null
);