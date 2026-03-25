-- DROP DATABASE workit;

-- Enums must be declared as named types before use in PostgreSQL
DROP TABLE if exists exercise_to_muscle;
DROP TABLE if exists muscle_group;
DROP TABLE if exists exercise;
DROP TABLE if exists exercise_log;
DROP TABLE if exists exercise_order;
DROP TABLE if exists template;
DROP TABLE if exists program_log;
DROP TABLE if exists comment;
DROP TABLE if exists token;
DROP TABLE if exists password;
DROP TABLE if exists user_to_coach;
DROP TABLE if exists coach;
DROP TABLE if exists program;
DROP TABLE if exists users;
DROP TABLE if exists weight_logs;

DROP TYPE if exists equipment_type;
DROP TYPE if exists gender_type;
