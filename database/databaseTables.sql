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

DROP TABLE IF EXISTS messages ;
create table messages
(
    message_id int auto_increment primary key,
    group_id   int          null,
    message    varchar(500) null,
    date        date         null,
    type  varchar(50)  null
);

/* DROP TABLE IF EXISTS module;
CREATE TABLE module(
    module_id INT auto_increment primary key,
    description VARCHAR (255),
    participants_number INT
);
*/
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

DROP TABLE IF EXISTS Pw_forgot_token;
CREATE TABLE Pw_forgot_token(
                                ID INTEGER AUTO_INCREMENT PRIMARY KEY,
                                E_Mail VARCHAR(255),
                                Start DATETIME,
                                End DATETIME,
                                Token VARCHAR(255),
                                Used BOOLEAN
);

DROP TABLE IF EXISTS Token;
CREATE TABLE Token
(
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Start DATETIME,
    Time INTEGER,
    End DATETIME,
    Gentoken VARCHAR(255),
    User INTEGER
);

DROP TABLE IF EXISTS User;
CREATE TABLE User
(
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    User_ID VARCHAR(10) UNIQUE, /* Selbst gewählte Identifkationskennung */
    HS_ID VARCHAR(20),
    Token VARCHAR(255),
    Name VARCHAR(255),
    Surname VARCHAR(255),
    E_Mail VARCHAR(255),
    Password VARCHAR(255),
    Verified BOOLEAN,
    Authorization VARCHAR(255),
    Confirm_Token VARCHAR(255),
    Semester CHAR(2),
    Course VARCHAR(255),
    Position ENUM('Student', 'HS-Mitarbeiter', 'Dozent') /* Student, HS-Mitarbeiter, Dozent, Dekan */
);

DROP TABLE IF EXISTS Modul;
CREATE TABLE Modul
(
    Modul_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Modulname VARCHAR(255),
    Teilnehmer_Max INTEGER,
    Semester CHAR(10), /* Damit ist das Jahr gemeint z.B. SoSe 20/21 */
    Pruefungsform ENUM('Klausur1', 'Klausur2', 'Mündl. Prüfung', 'Hausarbeit')
);

DROP TABLE IF EXISTS Groups;
CREATE TABLE Groups
(
    Group_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Modul_ID INTEGER,
    Gruppenname VARCHAR(255),
    Teilnehmer_Max INTEGER,
    Abgabedatum DATETIME,
    Active BOOLEAN,
    Beitritt BOOLEAN
);

DROP TABLE IF EXISTS User_Modul;
CREATE TABLE User_Modul
(
    User_ID INTEGER,
    Modul_ID INTEGER,
    Rolle ENUM('Teilnehmer', 'Dozent', 'Verwalter'),
    PRIMARY KEY(User_ID, Modul_ID)
);

DROP TABLE IF EXISTS User_Group; /* group = hausarbeit */
CREATE TABLE User_Group
(
    User_ID INTEGER,
    Group_ID INTEGER,
    Rolle ENUM('Teilnehmer', 'Dozent', 'Verwalter'),
    PRIMARY KEY(User_ID, Group_ID)
);


DROP TABLE IF EXISTS Termine; /* group = hausarbeit */
CREATE TABLE Termine
(
    Termin_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Group_ID INTEGER,
    Beschreibung VARCHAR(255),
    Datum DATE,
    Zeit TIME,
    Erinnerung BOOLEAN,
    Ort VARCHAR(255),
    Ersteller_ID INTEGER
);

DROP TABLE IF EXISTS InviteCodes;
CREATE TABLE InviteCodes
(
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    inviteCode VARCHAR(20),
    Modul_ID INTEGER,
    Enddate DATETIME
);
