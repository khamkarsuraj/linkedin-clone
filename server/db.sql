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

create table user_info
(
    user_id int references users(user_id),
    phone bigint,
    address varchar(70),
    birthday timestamp,
    headline varchar(100),
    about text
);

/* Procedure for UPSERT operation in users and user_info table */
CREATE OR REPLACE PROCEDURE upsert_for_user_info (
    fn VARCHAR(25),
    ln VARCHAR(25),
    ui INTEGER,
    cell BIGINT,
    add VARCHAR(100),
    bday TIMESTAMP
)
AS $$
DECLARE
    cnt INTEGER := 0;
BEGIN
    SELECT count(*) FROM user_info
    INTO cnt
    WHERE user_id = ui;

    IF cnt = 0 THEN
        UPDATE users SET first_name = fn, last_name = ln WHERE user_id = ui;
        INSERT INTO user_info (user_id, phone, address, birthday) VALUES(ui, cell, add, bday);
    ELSE
        WITH updated_data AS (
            UPDATE users
            SET first_name = fn, last_name = ln
            WHERE user_id = ui
            RETURNING user_id
        )
        UPDATE user_info
        SET user_id=ui, phone = cell, address = add, birthday = bday
        WHERE user_id IN (SELECT user_id FROM updated_data);
    END IF;
END;
$$
LANGUAGE plpgsql;