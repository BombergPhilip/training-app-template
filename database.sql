-- Run this command separately before the rest (must be outside a transaction):
-- CREATE DATABASE workit;

-- Enums must be declared as named types before use in PostgreSQL
CREATE TYPE gender_type     AS ENUM ('male', 'female');
CREATE TYPE equipment_type  AS ENUM ('None', 'Barbell', 'Dumbbell', 'Kettlebell', 'Machine', 'Plate', 'Resistance Band', 'Suspension Band', 'Other');

CREATE TABLE admin (
    user_id     INT,
    foreign key (user_id) references users(id),
    primary key (user_id)
);

CREATE TABLE users (
    id              SERIAL,
    name            VARCHAR(30) not null ,
    date_of_birth   DATE,
    weight_kg       FLOAT,
    height_cm       FLOAT,
    email           VARCHAR(120) not null ,
    gender          gender_type,
    picture         VARCHAR(120),   -- link

    PRIMARY KEY (id),
    UNIQUE (email)
);


CREATE TABLE weight_logs (
    user_id     INT,
    timestamp   DATE DEFAULT (NOW()),
    weight      FLOAT,
    primary key (user_id, timestamp),
    foreign key (user_id) references users(id) on delete cascade
);


CREATE TABLE coach (
    user_id         INT not null,
    price_dkk       INT not null ,
    max_clients     INT DEFAULT 20,

    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);


CREATE TABLE user_to_coach (
    user_id     INT not null,
    coach_id    INT not null,

    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coach_id)  REFERENCES coach(user_id) ON DELETE CASCADE,
    UNIQUE (user_id, coach_id)
);


CREATE TABLE password (
    hash            VARCHAR(256)    NOT NULL,
    user_id         INT             NOT NULL,
    last_updated    TIMESTAMP       DEFAULT NOW(),

    PRIMARY KEY (hash, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);


CREATE TABLE token (
    hash        VARCHAR(256)    UNIQUE NOT NULL,
    user_id     INT             NOT NULL,
    expires     TIMESTAMP       DEFAULT (NOW() + INTERVAL '1 day'),

    PRIMARY KEY (hash),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE comment (
    id          SERIAL,
    owner       INT,
    attach_id   INT, -- en kommentar skal kunne knytte sig til nærmest alt.
    msg         VARCHAR(256),

    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE program (
    id              SERIAL,
    name            VARCHAR(30) not null ,
    date            timestamp default (now()),
    description     VARCHAR(120) not null,

    PRIMARY KEY (id)
);

create table program_log (
    program_id      int,
    user_id         int,
    date            timestamp default(now()),

    primary key (program_id, user_id, date),
    foreign key (program_id) references program(id),
    foreign key (user_id) references users(id),
    UNIQUE (program_id, user_id, date)
);


create table template (
    program_id      INT UNIQUE NOT NULL,
    user_id         INT NOT NULL,

    primary key (program_id),
    foreign key (program_id) references program(id),
    foreign key (user_id) references users(id),
    UNIQUE (program_id, user_id)
);




CREATE TABLE exercise_order (
    id          SERIAL,
    program_id  INT not null ,
    exercise_id INT not null ,
    order_nr    INT not null ,

    PRIMARY KEY (id),
    UNIQUE (program_id, exercise_id, order_nr)
);


CREATE TABLE exercise_log (
    id                  SERIAL,
    exercise_order_id   INT not null ,
    reps                INT not null ,
    kg                  FLOAT not null ,

    PRIMARY KEY (id),
    FOREIGN KEY (exercise_order_id) REFERENCES exercise_order(id)
);


CREATE TABLE exercise (
    id          SERIAL,
    name        VARCHAR(30) not null ,
    description VARCHAR(120) not null ,
    equipment   equipment_type not null ,

    PRIMARY KEY (id)
);


CREATE TABLE muscle_group (
    id      SERIAL,
    name    VARCHAR(30) not null,

    PRIMARY KEY (id)
);


-- muscle_groups must exist before exercise_to_muscle references it
CREATE TABLE exercise_to_muscle (
    exercise_id     INT,
    muscle_grp_id   INT,

    PRIMARY KEY (exercise_id, muscle_grp_id),
    FOREIGN KEY (exercise_id)   REFERENCES exercise (id)      ON DELETE CASCADE,
    FOREIGN KEY (muscle_grp_id) REFERENCES muscle_group(id) ON DELETE CASCADE
);

