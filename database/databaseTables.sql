/* DROP SCHEMA IF EXISTS Webtech;
CREATE SCHEMA Webtech; */
USE Webtech;

/* DROP TABLE IF EXISTS requirements;
CREATE TABLE requirements (
    id INTEGER PRIMARY KEY,
    name VARCHAR (255) NULL,
    shortdesc VARCHAR (255),
    starttime DATE NULL,
    endtime DATE NULL
); */

DROP TABLE IF EXISTS requirements;
CREATE TABLE requirements (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255),
    short_desc VARCHAR(255),
    start_time DATE,
    end_time DATE
);

DROP TABLE IF EXISTS module;
CREATE TABLE module (
    module_id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    description VARCHAR (255),
    participants_number INTEGER
);

/* Wird von Gruppe 3 (Meilensteinplaung) benötigt*/

DROP TABLE IF EXISTS topic;
CREATE TABLE topic (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    project_description VARCHAR(255) NULL ,
    module_id INTEGER NULL ,
    semester VARCHAR(255) NULL ,
    start DATE NOT NULL,
    end DATE NOT NULL,
    duration INTEGER AS (DATEDIFF(end, start)),

    CONSTRAINT topic_module_fk
        FOREIGN KEY (module_id) REFERENCES module (module_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

DROP TABLE IF EXISTS presentation;
CREATE TABLE presentation (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    topic_id INTEGER NULL,
    date DATE NULL ,
    room VARCHAR(255) NULL ,
    day_start TIME NULL ,
    day_end TIME NULL ,
    occasion VARCHAR(255) NULL ,
    module VARCHAR(255) NULL ,

    CONSTRAINT presentation_topic_id_fk
        FOREIGN KEY (topic_id) REFERENCES topic (id)

);

DROP TABLE IF EXISTS agenda ;
CREATE TABLE agenda (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    presentation_id INTEGER NULL ,
    group_order INTEGER NULL ,
    group_number INTEGER NULL ,
    topic VARCHAR(255) NULL ,
    number_members INTEGER NULL ,
    start_presentation TIME NULL,
    duration_presentation TIME NULL,
    end_presentation TIME NULL,
    date DATE NULL,

    CONSTRAINT agenda_presentation_id_fk
        FOREIGN KEY (presentation_id) REFERENCES presentation (id)
);

DROP TABLE IF EXISTS pw_forgot_token;
CREATE TABLE pw_forgot_token (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    e_mail VARCHAR(255),
    start DATETIME,
    end DATETIME,
    token VARCHAR(255),
    used BOOLEAN
);

DROP TABLE IF EXISTS token;
CREATE TABLE token (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    start DATETIME,
    time INTEGER,
    end DATETIME,
    gentoken VARCHAR(255),
    user INTEGER
);

DROP TABLE IF EXISTS messages ;
CREATE TABLE messages (
    message_id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    group_id INTEGER NULL,
    message VARCHAR(500) NULL,
    date DATE NULL,
    type VARCHAR(50) NULL
);

/* Wird von Gruppe 3 (Meilensteinplaung) benötigt*/

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    token VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    e_mail VARCHAR(255),
    password VARCHAR(255),
    verified BOOLEAN,
    authorization VARCHAR(255),
    confirm_token VARCHAR(255),
    semester VARCHAR(2),
    course VARCHAR(255)
);

DROP TABLE IF EXISTS notification;
CREATE TABLE notification(
    id   INTEGER AUTO_INCREMENT PRIMARY KEY ,
    group_name VARCHAR(255),
    description VARCHAR(255)
);

DROP TABLE IF EXISTS softwarepool;
CREATE TABLE softwarepool(
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    software_name VARCHAR(255),
    software_description VARCHAR(255),
    software_link VARCHAR(255)
);

/* (Gruppe 3 Meilensteinplanung) milestone_status */

DROP TABLE IF EXISTS milestone_status;
CREATE TABLE milestone_status (
    milestone_status_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR (255)
);

/* (Gruppe 3 Meilensteinplanung) milestones */

DROP TABLE IF EXISTS milestones;
CREATE TABLE milestones (
    milestone_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    topic_id INTEGER NULL,
    description VARCHAR(255) NOT NULL,
    status INTEGER DEFAULT 1,
    predecessor INTEGER NULL,
    successor INTEGER NULL,
    start DATE NOT NULL,
    end DATE NOT NULL,
    duration INTEGER AS (DATEDIFF(end, start)),

    CONSTRAINT milestones_milestone_status_fk
        FOREIGN KEY (status) REFERENCES milestone_status (milestone_status_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT milestones_topic_fk
        FOREIGN KEY (topic_id) REFERENCES topic (id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT milestones_predecessor_fk
        FOREIGN KEY (predecessor) REFERENCES milestones (milestone_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT milestones_successor_fk
        FOREIGN KEY (successor) REFERENCES milestones (milestone_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

/* (Gruppe 3 Meilensteinplanung) submilestones */

DROP TABLE IF EXISTS submilestones;
CREATE TABLE submilestones (
    submilestone_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    milestone_id INTEGER NULL,
    description VARCHAR(255) NOT NULL,
    status INTEGER DEFAULT 1,

    CONSTRAINT submilestones_milestone_status_fk
        FOREIGN KEY (status) REFERENCES milestone_status (milestone_status_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT submilestones_milestone_id_fk
        FOREIGN KEY (milestone_id) REFERENCES milestones (milestone_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL

);

/* (Gruppe 3 Meilensteinplanung) timeaccount */

DROP TABLE IF EXISTS timeaccount;
CREATE TABLE timeaccount (
    timeaccount_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NULL,
    topic_id INTEGER NULL,
    max_time INTEGER,

    CONSTRAINT timeaccount_user_fk
        FOREIGN KEY (user_id) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT timeaccount_topic_fk
        FOREIGN KEY (topic_id) REFERENCES topic (id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

/* (Gruppe 3 Meilensteinplanung) timeaccount_history */

DROP TABLE IF EXISTS timeaccount_history;
CREATE TABLE timeaccount_history (
    timeaccount_history_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    timeaccount_id INTEGER NULL,
    used_time FLOAT NOT NULL,
    used_time_to_iso TIME NOT NULL,

    CONSTRAINT timeaccount_history_timeaccount_fk
        FOREIGN KEY (timeaccount_id) REFERENCES timeaccount (timeaccount_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

/* (Gruppe 3 Meilensteinplanung) participan_group_details */

DROP TABLE IF EXISTS participant_group;
CREATE TABLE participant_group (
    participan_group_details_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NULL,
    topic_id INTEGER NULL,
    milestone_id INTEGER NULL,

    CONSTRAINT participant_group_user_id_fk
        FOREIGN KEY (user_id) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT participant_group_topic_id_fk
        FOREIGN KEY (topic_id) REFERENCES topic (id)
            ON UPDATE CASCADE
            ON DELETE SET NULL,

    CONSTRAINT participant_group_topic_id_fk
        FOREIGN KEY (milestone_id) REFERENCES milestones (milestone_id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

/* (Gruppe 3 Meilensteinplanung) topic_status */

DROP TABLE IF EXISTS topic_status;
CREATE TABLE topic_status (
    user_id int NOT NULL,
    topic_id int NOT NULL
);

/* (Gruppe 3 Meilensteinplanung) get_milestone_id */

DROP TABLE IF EXISTS get_milestone_id;
CREATE TABLE get_milestone_id (
    milestone_id INTEGER,
    user_id INTEGER,
    description VARCHAR(255)
);








/* unused for now

DROP TABLE IF EXISTS STUDENT_MODUL;
CREATE TABLE STUDENT_MODUL(
    matrikel_nr varchar(6),
    modul_id int
);

*/



