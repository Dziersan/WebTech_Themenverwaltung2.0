/* DROP SCHEMA IF EXISTS Webtech;
CREATE SCHEMA Webtech; */
USE Webtech;

DROP TABLE IF EXISTS requirements;
CREATE TABLE requirements
(
    id INTEGER PRIMARY KEY,
    name VARCHAR (255) NULL,
    shortdesc VARCHAR (255),
    starttime DATE NULL,
    endtime DATE NULL
);




DROP TABLE IF EXISTS topic;
CREATE TABLE topic
(
    id int auto_increment primary key,
    project_description varchar(255) null,
    module_name varchar(255) null,
    semester varchar(255) null
);

DROP TABLE IF EXISTS presentation;
CREATE TABLE presentation
(
    id int auto_increment primary key,
    topic_id int null,
    date date null,
    room varchar(255) null,
    day_start time null,
    day_end time null,
    occasion varchar(255) null,
    module varchar(255) null,
    constraint presentation_topic_id_fk
        foreign key (topic_id) references topic (id)
);

DROP TABLE IF EXISTS agenda ;
CREATE TABLE agenda (
    id int auto_increment primary key,
    presentation_id int null,
    group_order int null,
    group_number int null,
    topic varchar(255) null,
    number_members int null,
    start_presentation time null,
    duration_presentation time null,
    end_presentation time null,
    date date null,
    constraint agenda_presentation_id_fk
        foreign key (presentation_id) references presentation (id)
);

DROP TABLE IF EXISTS pw_forgot_token;
CREATE TABLE pw_forgot_token(
    id integer auto_increment primary key ,
    e_mail varchar(255),
    start datetime,
    end datetime,
    token varchar(255),
    used boolean
);

DROP TABLE IF EXISTS token;
CREATE TABLE token(
    id integer auto_increment primary key,
    start datetime,
    time integer,
    end datetime,
    gentoken varchar(255),
    user integer
);

DROP TABLE IF EXISTS user;
CREATE TABLE user(
    id integer auto_increment primary key,
    token varchar(255),
    name varchar(255),
    surname varchar(255),
    e_mail varchar(255),
    password varchar(255),
    verified boolean,
    authorization varchar(255),
    confirm_token varchar(255),
    semester varchar(2),
    course varchar(255)
);




DROP TABLE IF EXISTS messages ;
create table messages
(
    message_id int auto_increment primary key,
    group_id   int          null,
    message    varchar(500) null,
    date        date         null,
    type  varchar(50)  null
);

DROP TABLE IF EXISTS module;
CREATE TABLE module(
    module_id INT auto_increment primary key,
    description VARCHAR (255),
    participants_number INT
);

DROP TABLE IF EXISTS notification;
CREATE TABLE notification(
    id   int auto_increment primary key,
    group_name varchar(255),
    description varchar(255)
);

DROP TABLE IF EXISTS softwarepool;
CREATE TABLE softwarepool(
    id int auto_increment primary key,
    software_name varchar(255),
    software_description varchar(255),
    software_link varchar(255)
);

DROP TABLE IF EXISTS requirements;
CREATE TABLE requirements(
    id varchar(10) primary key,
    name varchar(255),
    short_desc varchar(255),
    start_time date,
    end_time date
);
/* unused for now

DROP TABLE IF EXISTS STUDENT_MODUL;
CREATE TABLE STUDENT_MODUL(
    matrikel_nr varchar(6),
    modul_id int
);

*/



