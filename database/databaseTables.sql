USE WEBTECH;

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

DROP TABLE IF EXISTS agenda;
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

DROP TABLE IF EXISTS nachrichten;
CREATE table nachrichten
(
    Nachricht_ID int auto_increment primary key,
    Gruppen_ID   int          null,
    Nachricht    varchar(500) null,
    Datum        date         null,
    Anfrage_art  varchar(50)  null
);

DROP TABLE IF EXISTS student;
CREATE TABLE student
(
    matrikel_nr VARCHAR(6),
    name varchar(255),
    nachname varchar(255),
    e_mail varchar(255),
    semester varchar(2),
    studiengang varchar(255),
    PRIMARY KEY(matrikel_nr)
);

DROP TABLE IF EXISTS hs_mitarbeiter;
CREATE TABLE hs_mitarbeiter
(
    personal_id varchar(6),
    name varchar(255),
    nachname varchar(255),
    e_mail varchar(255),
    position varchar(255),
    PRIMARY KEY(personal_id)
);

DROP TABLE IF EXISTS modul;
CREATE TABLE modul
(
    modul_id INT,
    beschreibung VARCHAR (255),
    teilnehmer_anzahl INT,
    semester CHAR (8),
    pruefungsform VARCHAR (255),
    PRIMARY KEY (modul_id)
);

DROP TABLE IF EXISTS student_modul;
CREATE TABLE student_modul
(
    matrikel_nr varchar(6),
    modul_id int,
    PRIMARY KEY(matrikel_nr, modul_id)
);

DROP TABLE IF EXISTS modul_group;
CREATE TABLE modul_group
(
    modul_id INT,
    group_id INT,
    PRIMARY KEY(modul_id, group_id)
);

DROP TABLE IF EXISTS groups;
CREATE TABLE groups
(
    group_id INT auto_increment,
    dozent VARCHAR (255),
    beschreibung VARCHAR (255),
    teilnehmer_anzahl INT,
    teilnehmer_max INT,
    Abgabedatum Date,
    active boolean,
    PRIMARY KEY (group_id)
);

DROP TABLE IF EXISTS student_group; /* group = hausarbeit */
CREATE TABLE student_group
(
    matrikel_nr varchar(6),
    group_id INT,
    PRIMARY KEY(matrikel_nr, group_id)
);

DROP TABLE IF EXISTS modul_mitarbeiter; /* group = hausarbeit */
CREATE TABLE modul_mitarbeiter
(
    modul_id INT,
    personal_id varchar(6),
    PRIMARY KEY(modul_id, personal_id)
);

DROP TABLE IF EXISTS termine; /* group = hausarbeit */
CREATE TABLE termine
(
    termin_id int,
    beschreibung varchar(255),
    datum date,
    zeit time,
    erinnerung boolean,
    ort varchar(255),
    ersteller_ID varchar(6),
    PRIMARY KEY(termin_id)
);

DROP TABLE IF EXISTS termine_teilnehmer; /* group = hausarbeit */
CREATE TABLE termine_teilnehmer
(
    termin_id int,
    teilnehmer_ID varchar(255),
    PRIMARY KEY(termin_id, teilnehmer_ID)
);






DROP SCHEMA IF EXISTS Webtech;
CREATE SCHEMA Webtech;
USE Webtech;

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

/* unused for now

DROP TABLE IF EXISTS STUDENT_MODUL;
CREATE TABLE STUDENT_MODUL(
    matrikel_nr varchar(6),
    modul_id int
);

*/



