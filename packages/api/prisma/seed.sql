-- Drop & recreate schema for clean slate
DROP TABLE IF EXISTS log_exercise CASCADE;
DROP TABLE IF EXISTS exercise_to_muscle CASCADE;
DROP TABLE IF EXISTS exercise CASCADE;
DROP TABLE IF EXISTS muscle_groups CASCADE;
DROP TABLE IF EXISTS user_to_coach CASCADE;
DROP TABLE IF EXISTS coach CASCADE;
DROP TABLE IF EXISTS cookie CASCADE;
DROP TABLE IF EXISTS "password" CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE;
DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- ENUM types (Postgres kræver enums oprettet som types)
DO $$ BEGIN
  CREATE TYPE gender_enum AS ENUM ('male', 'female');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE status_enum AS ENUM ('accepted', 'waiting', 'declined');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE equipment_enum AS ENUM (
    'None', 'Barbell', 'Dumbbell', 'Kettlebell', 'Machine',
    'Plate', 'Resistance Band', 'Suspension Band', 'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- USER
CREATE TABLE "user" (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(30),
  date_of_birth DATE,
  weight_kg     DOUBLE PRECISION,
  height_cm     DOUBLE PRECISION,
  email         VARCHAR(120) UNIQUE,
  gender        gender_enum,
  picture       VARCHAR(120) -- link
);

-- PASSWORD
CREATE TABLE "password" (
  hash    VARCHAR(64) NOT NULL,
  user_id INT NOT NULL PRIMARY KEY,
  changed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_password_user
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- COOKIE
CREATE TABLE cookie (
  id      SERIAL PRIMARY KEY,
  hash    VARCHAR(64) NOT NULL,
  user_id INT NOT NULL,
  expires TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '1 day'),

  CONSTRAINT fk_cookie_user
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- COACH
CREATE TABLE coach (
  user_id     INT PRIMARY KEY,
  max_clients INT DEFAULT 20,
  price_dkk   INT,

  CONSTRAINT fk_coach_user
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- USER_TO_COACH
CREATE TABLE user_to_coach (
  client_id INT,
  coach_id  INT,
  status    status_enum DEFAULT 'waiting',

  PRIMARY KEY (client_id, coach_id),

  CONSTRAINT fk_utc_client
    FOREIGN KEY (client_id) REFERENCES "user"(id) ON DELETE CASCADE,

  CONSTRAINT fk_utc_coach
    FOREIGN KEY (coach_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- MUSCLE_GROUPS
CREATE TABLE muscle_groups (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(30)
);

-- PROGRAM
CREATE TABLE program (
  id          SERIAL PRIMARY KEY,
  start       TIMESTAMP,
  "end"       TIMESTAMP DEFAULT NOW(),  -- end er reserved-ish, så column får quotes
  title       VARCHAR(60),
  description VARCHAR(120),
  comment     VARCHAR(120)
);

-- EXERCISE
CREATE TABLE exercise (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(30),
  description VARCHAR(120),
  equipment   equipment_enum
);

-- EXERCISE_TO_MUSCLE
CREATE TABLE exercise_to_muscle (
  exercise_id   INT,
  muscle_grp_id INT,

  PRIMARY KEY (exercise_id, muscle_grp_id),

  CONSTRAINT fk_etm_exercise
    FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,

  CONSTRAINT fk_etm_muscle
    FOREIGN KEY (muscle_grp_id) REFERENCES muscle_groups(id) ON DELETE CASCADE
);

-- LOG_EXERCISE
CREATE TABLE log_exercise (
  id          SERIAL PRIMARY KEY,
  program_id  INT,
  exercise_id INT,
  order_nr    INT,
  reps        INT,
  kg          DOUBLE PRECISION,

  CONSTRAINT fk_log_program
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);

-- COMMENT
CREATE TABLE "comment" (
  id        SERIAL PRIMARY KEY,
  user_id   INT,
  attach_to INT,
  comment   VARCHAR(120),

  CONSTRAINT fk_comment_user
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Seed data
INSERT INTO muscle_groups (name) VALUES
('Chest'),
('Upper Chest'),
('Back'),
('Lats'),
('Traps'),
('Rear Delts'),
('Front Delts'),
('Side Delts'),
('Biceps'),
('Triceps'),
('Forearms'),
('Quads'),
('Hamstrings'),
('Glutes'),
('Calves'),
('Core');

INSERT INTO exercise (name, description, equipment) VALUES
('Barbell Bench Press', 'Flat barbell press on bench', 'Barbell'),
('Incline Barbell Bench Press', 'Incline barbell chest press', 'Barbell'),
('Dumbbell Bench Press', 'Flat dumbbell press', 'Dumbbell'),
('Incline Dumbbell Press', 'Incline dumbbell chest press', 'Dumbbell'),
('Chest Fly (Dumbbell)', 'Dumbbell chest fly', 'Dumbbell'),
('Cable Chest Fly', 'Standing cable fly', 'Machine'),
('Push Up', 'Bodyweight push up', 'None'),
('Dips', 'Chest focused dips', 'None'),

('Pull Up', 'Overhand pull ups', 'None'),
('Lat Pulldown', 'Cable lat pulldown', 'Machine'),
('Barbell Row', 'Bent over row', 'Barbell'),
('Seated Cable Row', 'Cable row', 'Machine'),
('T-Bar Row', 'Chest supported row', 'Machine'),
('Face Pull', 'Cable face pull', 'Machine'),

('Overhead Press', 'Standing barbell shoulder press', 'Barbell'),
('Seated Dumbbell Shoulder Press', 'Seated DB shoulder press', 'Dumbbell'),
('Lateral Raise', 'Dumbbell lateral raise', 'Dumbbell'),
('Rear Delt Fly', 'Bent over rear delt fly', 'Dumbbell'),
('Front Raise', 'Dumbbell front raise', 'Dumbbell'),

('Barbell Curl', 'Standing bicep curl', 'Barbell'),
('Dumbbell Curl', 'Alternating curl', 'Dumbbell'),
('Hammer Curl', 'Neutral grip curl', 'Dumbbell'),
('Tricep Pushdown', 'Cable pushdown', 'Machine'),
('Overhead Tricep Extension', 'DB overhead extension', 'Dumbbell'),
('Skullcrusher', 'Lying tricep extension', 'Barbell'),

('Back Squat', 'Barbell back squat', 'Barbell'),
('Front Squat', 'Front rack squat', 'Barbell'),
('Leg Press', 'Machine leg press', 'Machine'),
('Leg Extension', 'Quad isolation', 'Machine'),
('Romanian Deadlift', 'Hip hinge', 'Barbell'),
('Deadlift', 'Conventional deadlift', 'Barbell'),
('Lying Leg Curl', 'Hamstring curl', 'Machine'),
('Hip Thrust', 'Barbell hip thrust', 'Barbell'),
('Calf Raise (Standing)', 'Standing calf raise', 'Machine'),
('Calf Raise (Seated)', 'Seated calf raise', 'Machine'),

('Plank', 'Static plank hold', 'None'),
('Hanging Leg Raise', 'Leg raises hanging', 'None'),
('Cable Crunch', 'Weighted cable crunch', 'Machine');

-- relations (same IDs as your list assumes)
INSERT INTO exercise_to_muscle VALUES
(1,1),(1,10),(1,7),
(2,2),(2,7),(2,10),
(3,1),(3,7),(3,10),
(4,2),(4,7),
(5,1),
(6,1),
(7,1),(7,10),
(8,1),(8,10),

(9,4),(9,9),
(10,4),(10,9),
(11,3),(11,4),(11,9),
(12,3),(12,9),
(13,3),(13,5),
(14,6),(14,5),

(15,7),(15,10),
(16,7),(16,10),
(17,8),
(18,6),
(19,7),

(20,9),
(21,9),
(22,9),(22,11),
(23,10),
(24,10),
(25,10),

(26,12),(26,14),
(27,12),(27,14),
(28,12),(28,14),
(29,12),
(30,13),(30,14),
(31,13),(31,14),(31,3),
(32,13),
(33,14),
(34,15),
(35,15),

(36,16),
(37,16),
(38,16);

INSERT INTO program (start, title, description, comment)
VALUES (NOW() - INTERVAL '1 hour', 'Upperbody','Få en lækkert overkrop på 3 dage', 'Gik godt i dag');