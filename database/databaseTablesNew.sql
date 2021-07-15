DROP SCHEMA IF EXISTS Webtech;
CREATE SCHEMA Webtech;
USE WEBTECH;

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
    User_ID VARCHAR(10) PRIMARY KEY, /* Selbst gewählte Identifkationskennung */
    HS_ID VARCHAR(20),
    Token VARCHAR(255),
    Vorname VARCHAR(255),
    Nachname VARCHAR(255),
    E_Mail VARCHAR(255),
    Password VARCHAR(255),
    Verified BOOLEAN,
    Authorization VARCHAR(255),
    Confirm_Token VARCHAR(255),
    Semester CHAR(2),
    Studiengang VARCHAR(255),
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
    Gruppenname VARCHAR(255),
    Teilnehmer_Max INTEGER,
    Abgabedatum DATETIME,
    Active BOOLEAN
);

DROP TABLE IF EXISTS User_Modul;
CREATE TABLE User_Modul
(
    User_ID VARCHAR(10),
    Modul_ID INTEGER,
    Rolle ENUM('Teilnehmer', 'Lehrbeauftragter', 'Verwalter'),
    PRIMARY KEY(User_ID, Modul_ID)
);

DROP TABLE IF EXISTS User_Group; /* group = hausarbeit */
CREATE TABLE User_Group
(
    User_ID VARCHAR(10),
    Group_ID INTEGER,
    PRIMARY KEY(User_ID, Group_ID)
);

DROP TABLE IF EXISTS Modul_Group;
CREATE TABLE Modul_Group
(
    Modul_ID INTEGER,
    Group_ID INTEGER,
    PRIMARY KEY(Modul_ID, Group_ID)
);

DROP TABLE IF EXISTS Termine; /* group = hausarbeit */
CREATE TABLE Termine
(
    Termin_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Beschreibung VARCHAR(255),
    Datum DATE,
    Teit TIME,
    Erinnerung BOOLEAN,
    Ort VARCHAR(255),
    Ersteller_ID VARCHAR(10)
);

DROP TABLE IF EXISTS Termine_Group; /* group = hausarbeit */
CREATE TABLE Termine_Group
(
    Termin_ID INTEGER,
    Group_ID INTEGER,
    PRIMARY KEY(Termin_ID, Group_ID)
);