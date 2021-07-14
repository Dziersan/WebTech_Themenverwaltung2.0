USE WEBTECH;
DELETE FROM User;
DELETE FROM Modul;
DELETE FROM Groups;
DELETE FROM Token;
DELETE FROM Pw_forgot_token;
DELETE FROM User_Group;
DELETE FROM User_Modul;
DELETE FROM Modul_Group;
DELETE FROM Termine;
DELETE FROM Termine_Group;

INSERT INTO User(User_ID, HS_ID, Token, Vorname, Nachname, E_Mail, Password, Verified, Authorization, Confirm_Token, Semester, Studiengang, Position) VALUES
('murre97', '895542', 'ABC', 'Maurice', 'Rethmann', 'maurice.rethmann@hs-osnabrueck.de', 'maurice13', true, 'Student', 'ABC', '4', 'Wirtschaftsinformatik', 'Student'),
('Kollegah', '132312','BCD', 'Patrick', 'Benten', 'patrick.benten@hs-osnabrueck.de', 'patrick14', false, 'Student', 'BCD', '4', 'Wirtschaftsinformatik', 'Student'),
('Staraptoah', '231421','CDE', 'Luca', 'Schwarte', 'Luca.Schwarte@hs-osnabrueck.de', 'hallo,hallo', true, 'Student', 'CDE', '4', 'Wirtschaftsinformatik', 'Student'),
('Dirk16', 'DEF', '51231','Dirk', 'Hanekamp', 'dirk.hanekamp@hs-osnabrueck.de', 'maurice13', true, 'Student', 'ABC', '4', 'Wirtschaftsinformatik', 'Student'),
('Albert19', 'EFG', '231412', 'Albert', 'i9', 'albert.i9@hs-osnabrueck.de', 'maurice13', true, 'Dozent', 'ABC', null, 'Wirtschaftsinformatik', 'Dozent');

INSERT INTO Modul(Modul_ID, Beschreibung, Teilnehmer_Max, Semester, Pruefungsform) VALUES 
(001, "Modellierung und Simulation", 25, "3", 'Klausur1' ), 
(002, "Datenbanken", 25, "3", 'Klausur1'), 
(003, "Statistik", 25, "3", 'Mündl. Prüfung'), 
(004, "Wirtschaftsrecht", 25, "3", 'Klausur1'), 
(005, "SEP", 25, "4",'Klausur1'), 
(006, "Web Technologien", 25, "4",'Klausur1'), 
(007, "Logistik", 25, "4",'Klausur1'), 
(008, "Software Engineering", 25, "3",'Klausur1'), 
(009, "Kosten- und Leistungsrechnung", 25, "2",'Klausur1'), 
(010, "Informationsmanagement", 25, "2",'Klausur1');

INSERT INTO Groups(Group_ID, Beschreibung, Teilnehmer_Max, Abgabedatum, Active) VALUES
(001, "Gravelshipping++", 5, "2021-07-20", false),
(002, "SEP", 7, "2021-07-20", true),
(003, "Datenbanken", 5, "2021-07-20", false),
(004, "GPM ", 5, "2021-07-20", false),
(005, "Gruppendefintion", 4, "2021-07-20", true);

INSERT INTO Token (ID, Start, Time, End, Gentoken, User) VALUES
(1,'13-07-21 09.00.00', 7, '13-07-21 16.00.00','ABC', 1),
(2,'14-07-21 09.00.00', 3, '14-07-21 12.00.00','BCD', 1),
(3,'13-07-21 09.00.00', 5, '13-07-21 14.00.00','CDE', 1),
(4,'16-07-21 09.00.00', 2, '16-07-21 11.00.00','DEF', 1),
(5,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','EFG', 1);

INSERT INTO User_Modul(User_ID, Modul_ID, Rolle) VALUES
('murre97', 001, 'Teilnehmer'),
('Staraptoah', 004, 'Teilnehmer'),
('Dirk16', 007, 'Verwalter'),
('Albert19', 001, 'Lehrbeauftragter');

INSERT INTO User_Group(User_ID, Group_ID) VALUES
('murre97', 001),
('Staraptoah', 004),
('Dirk16', 005),
('Albert19', 002);

INSERT INTO Modul_Group(Modul_ID, Group_ID) VALUES
(001, 001);