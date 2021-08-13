USE Webtech;

/* Module */

INSERT INTO MODULE (description, participants_number)
VALUES
    ('Webtechnologien', 30),
    ('Geschäftsprozessmanagement', 120);

/* User */

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'ABC',
    'Peteasdasdrsen',
    'Sven',
    'sven.asd@hs-osnabrueck.de',
    'petersen',
    true,
    'student',
    'test',
    '4',
    'Wirtschaftsinformatik'
);


INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'DEF',
    'Kottmann',
    'Louis',
    'louis.king@hs-osnabrueck.de',
    'kottmann',
    false,
    'dozent',
    'test',
    '2',
    'Wirtschaftsinformatik'
);


INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'GHI',
    'Kevin',
    'Bosse',
    'kevin.bosse@hs-osnabrueck.de',
    'bosse',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsinformatik'
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'JKL',
    'Leon ',
    'Lelle',
    'leon.lelle@hs-osnabrueck.de',
    'lelle',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsingenieurwesen'
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'MNO',
    'Daniel',
    'Busch',
    'daniel.busch@hs-osnabrueck.de',
    'busch',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsinformatik'
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'PQR',
    'Kai',
    'Kühl',
    'kai.kuel@hs-osnabrueck.de',
    'kuel',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsinformatik'
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'STU',
    'Jonas',
    'Litmeyer',
    'jonas.litmeyer@hs-osnabrueck.de',
    'litmeyer',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsinformatik'
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'VWX',
    'Tim',
    'Nötzel',
    'tim.noetzel@hs-osnabrueck.de',
    'noetzel',
    true,
    'student',
    'test',
    '6',
    'Wirtschaftsinformatik'
);

/* Token */

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
     99999999,
    '2022-09-20',
    'ABC',
    1
);
*/
DELETE FROM User;
DELETE FROM Modul;
DELETE FROM Groups;
DELETE FROM Token;
DELETE FROM Pw_forgot_token;
DELETE FROM User_Group;
DELETE FROM User_Modul;
DELETE FROM Termine;

INSERT INTO User(User_ID, HS_ID, Token, Name, Surname, E_Mail, Password, Verified, Authorization, Confirm_Token, Semester, Course, Position) VALUES
('murre97',     '895542',   'ABC',  'Maurice',  'Rethmann',     'maurice.rethmann@hs-osnabrueck.de',    'maurice13',    true,   'Student', 'ABC', '1', 'Wirtschaftsinformatik', 'Student'),
('pat112',      '903194',   'BCD',  'Patrick',  'Benten',       'patrick.benten@hs-osnabrueck.de',      'patrick14',    true,   'Student', 'BCD', '2', 'Wirtschaftsinformatik', 'Student'),
('Staraptoah',  '952312',   'CDE',  'Luca',     'Schwarte',     'Luca.Schwarte@hs-osnabrueck.de',       'teilnehmer',   true,   'Student', 'CDE', '2', 'Wirtschaftsinformatik', 'Student'),
('Dirk16',      '893413',   'DEF',  'Dirk',     'Hanekamp',     'dirk.hanekamp@hs-osnabrueck.de',       'teilnehmer',   true,   'Student', 'DEF', '3', 'Wirtschaftsinformatik', 'Student'),
('snow15',      '908760',   'EFG',  'John',     'Snow',         'john.snow@hs-osnabrueck.de',           'teilnehmer',   true,   'Student', 'EFG', '3', 'Wirtschaftsinformatik', 'Student'),
('Sansa14',     '94563',    'FGH',  'Sansa',    'Stark',        'sansa.stark@hs-osnabrueck.de',         'teilnehmer',   true,   'Student', 'FGH', '5', 'Wirtschaftsinformatik', 'Student'),
('Tyrion12',    '90842',    'GHI',  'Tyrion',   'Lannister',    'tyrion.lannister@hs-osnabrueck.de',    'teilnehmer',   true,   'Student', 'GHI', '4', 'Wirtschaftsinformatik', 'Student'),
('Jaime1',      '91678',    'HIJ',  'Jaime',   'Lannister',     'jaime.lannister@hs-osnabrueck.de',     'teilnehmer',   false,  'Student', 'HIJ', '4', 'Wirtschaftsinformatik', 'Student'),
('Cersei89',    '90845',    'IJK',  'Cersei',   'Lannister',    'cersei.lannister@hs-osnabrueck.de',    'teilnehmer',   true,   'Student', 'IJK', '6', 'Wirtschaftsinformatik', 'Student'),
('Mance2',      '91765',    'JKL',  'Mance',    'Raider',       'mance.raider@hs-osnabrueck.de',        'teilnehmer',   true,   'Student', 'JKL', '1', 'Wirtschaftsinformatik', 'Student'),
('Dany15',      '92306',    'KLM',  'Daenerys', 'Targaryen',    'daenerys.targaryen@hs-osnabrueck.de',  'teilnehmer',   true,   'Student', 'KLM', '6', 'Wirtschaftsinformatik', 'Student'),
('Jorah69',     '93456',    'LMN',  'Jorah',    'Mormont',      'jorah.mormont@hs-osnabrueck.de',       'teilnehmer',   true,   'Student', 'LMN', '5', 'Wirtschaftsinformatik', 'Student'),
('Davos12',     '93490',    'MNO',  'Davos',    'Seaworth',     'davos.seaworth@hs-osnabrueck.de',      'teilnehmer',   true,   'Student', 'MNO', '5', 'Wirtschaftsinformatik', 'Student'),
('Gregor77',    '93423',    'NOP',  'Gregor',   'Cleagane',     'gregor.cleagane@hs-osnabrueck.de',     'teilnehmer',   true,   'Student', 'NOP', '5', 'Wirtschaftsinformatik', 'Student'),
('Einstein14',  'P16723',   'OPQ',  'Albert',   'Einstein',     'albert.einstein@hs-osnabrueck.de',     'admin',        true,   'Dozent',  'OPQ', '5', 'Wirtschaftsinformatik', 'Dozent');

INSERT INTO Modul(Modul_ID, Modulname, Teilnehmer_Max, Semester, Pruefungsform) VALUES
(001, 'Modellierung und Simulation', 25, "3", 'Klausur1'),
(002, 'Datenbanken', 25, '3', 'Klausur1'),
(003, 'Statistik', 25, '3', 'Mündl. Prüfung'),
(004, 'Wirtschaftsrecht', 25, '3', 'Klausur1'),
(005, 'Tutorium Statistik', 25, '4','Klausur1'),
(006, 'Web Technologien', 25, '4','Klausur1'),
(007, 'Logistik', 25, '4','Klausur1'),
(008, 'Software Engineering', 25, '3','Klausur1'),
(009, 'Kosten- und Leistungsrechnung', 25, '2','Klausur1'),
(010, 'Informationsmanagement', 25, '2','Klausur1');

INSERT INTO Groups(Modul_ID, Gruppenname, Teilnehmer_Max, Abgabedatum, Active, Beitritt) VALUES
(001, 'Gravelshipping++', 5, '2021-08-20', true, true),
(001, 'Boxplots', 5, '2021-08-20', true, true),
(001, 'Logging', 5, '2021-08-20', true, true),
(001, 'Graphen', 5, '2021-08-20', true, true),
(005, 'Gießformkonfigurator', 7, '2021-08-20', true, true),
(002, 'Polizei', 5, '2021-08-20', true, true),
(002, 'Modeindustrie ', 5, '2021-08-20', true, true),
(002, 'Krankenhaus', 5, '2021-08-20', true, true);

INSERT INTO Token (ID, Start, Time, End, Gentoken, User) VALUES
(1,'13-07-21 09.00.00', 7, '13-07-21 16.00.00','ABC', 1),
(2,'14-07-21 09.00.00', 3, '14-07-21 12.00.00','BCD', 1),
(3,'13-07-21 09.00.00', 5, '13-07-21 14.00.00','CDE', 1),
(4,'16-07-21 09.00.00', 2, '16-07-21 11.00.00','DEF', 1),
(5,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','GHI', 1),
(6,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','HIJ', 1),
(7,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','IJK', 1),
(8,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','JKL', 1),
(9,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','KLM', 1),
(10,'18-07-21 09.00.00', 9, '18-07-21 18.00.00','LMN', 1);

INSERT INTO User_Modul(User_ID, Modul_ID, Rolle) VALUES
(1,     001, 'Teilnehmer'),
(2,      001, 'Teilnehmer'),
(3,  001, 'Teilnehmer'),
(4,      001, 'Teilnehmer'),
(5,      001, 'Teilnehmer'),
(6,     001, 'Teilnehmer'),
(7,    001, 'Teilnehmer'),
(8,      001, 'Teilnehmer'),
(9,    001, 'Teilnehmer'),
(10,      001, 'Teilnehmer'),
(11,      001, 'Teilnehmer'),
(12,  001, 'Dozent'),
(14,    005, 'Dozent'),
(15,  002, 'Dozent');

INSERT INTO User_Group(User_ID, Group_ID, Rolle) VALUES
(15, 001, 'Dozent'),
(15, 002, 'Dozent'),
(15, 003, 'Dozent'),
(15, 004, 'Dozent'),
(15, 006, 'Dozent'),
(15, 007, 'Dozent'),
(15, 008, 'Dozent');

/*INSERT INTO Termine(Termin_ID,Group_ID, Beschreibung, Datum, Zeit, Erinnerung, Ort, Ersteller_ID) VALUES
(001,001, 'Abgabe Datenbanken', "2021-07-28", "11:00:00", false, 'Online', 'murre97'),
(002,001, 'Präsentation Zwischenergebnisse DB', "2021-07-22", "10:00:00", false, 'Online', 'murre97'),
(003,001, 'Vorstellung Mockups', "2021-07-20", "09:00:00", false, 'Online', 'murre97');*/

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'GHI',
    3
);

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'JKL',
    4
);

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'MNO',
    5
);

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'PQR',
    6
);

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'STU',
    7
);

INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2022-09-20',
    'VWX',
    8
);

/* topic */

INSERT INTO TOPIC (project_description, module_id, semester, start, end)
VALUES (
    'Hausarbeitsthemenverwaltung',
    '1',
    'Sommer 21',
    CURRENT_DATE,
    '2021-7-30'
);

INSERT INTO TOPIC (project_description, module_id, semester, start, end)
VALUES (
    'SWOT-Analyse',
    '2',
    'Sommer 21',
    CURRENT_DATE,
    '2021-7-28'
);

/* Status */

INSERT INTO MILESTONE_STATUS (description)
VALUES
    ('Unbearbeitet'),
    ('In Bearbeitung'),
    ('Fertiggestellt');

/* milestones */

INSERT INTO MILESTONES (topic_id, description, status, start, end)
VALUES
    (1, 'Datenbankschema erstellen', 2, CURRENT_DATE, '2021-7-30'),
    (1, 'Datenbanktabellen mit Datensätzen füllen', 2, CURRENT_DATE, '2021-6-02'),
    (1, 'Datenbankabfragen erstellen', 1, CURRENT_DATE, '2021-6-10'),
    (1, 'Datentransfer zwischen Datenbank und Server', 1, CURRENT_DATE, '2021-6-17'),
    (1, 'Code-Style umsetzen', 1, CURRENT_DATE, '2021-7-01'),
    (2, 'SWOT-Analyse erstellen', 1, CURRENT_DATE, '2021-7-30');

/* successor setzen */

USE Webtech;

UPDATE MILESTONES
SET successor = 1
WHERE milestone_id = 2;

UPDATE MILESTONES
SET successor = 2
WHERE milestone_id = 3;

UPDATE MILESTONES
SET successor = 3
WHERE milestone_id = 4;

UPDATE MILESTONES
SET successor = 4
WHERE milestone_id = 5;

/* predecessor setzen */

/* submilestones */

INSERT INTO SUBMILESTONES (milestone_id, description, status)
VALUES
    (1, 'ER-Diagramm erstellen', 3),
    (2, 'EER-Diagramm erstellen', 3),
    (3, 'Allgemeine Datenbankabfragen schreiben', 2),
    (4, 'Dynamische Datenbankabgragen schreiben', 1),
    (5, 'Datenbank-Connection schreiben', 3),
    (6, 'Bestehnde Verbindung zwischen Datenbank und Server erweitern', 1),
    (7, 'Analyse der Stärken', 3),
    (8, 'Analyse der Schwächen', 3),
    (9, 'Chancen und Risiken feststellen', 2),
    (10, 'bestehende Verbindung zwischen Datenbank und Server analysieren', 1),
    (11, 'Code-Style in IntelliJ einbinden', 2);

/* timeaccount */

INSERT INTO TIMEACCOUNT (user_id, topic_id, max_time)
VALUES
    (3, 3, 35),
    (3, 4, 10),
    (4, 3, 50),
    (5, 3, 30),
    (6, 3, 40),
    (7, 3, 25),
    (8, 3, 35),
    (1, 4, 8),
    (2, 4, 12);

/* timeaccount_history */

INSERT INTO TIMEACCOUNT_HISTORY (timeaccount_id, used_time)
VALUES
    (1, 5),
    (1, 4),
    (1, 8),
    (1, 13),
    (1, 5),
    (2, 3),
    (2, 2),
    (2, 5),
    (3, 8),
    (3, 10),
    (3, 8),
    (3, 6),
    (3, 9),
    (3, 9),
    (4, 30),
    (5, 20),
    (5, 10),
    (5, 10),
    (6, 25),
    (7, 35);

/* participant_group */

INSERT INTO PARTICIPANT_GROUP (user_id, topic_id, milestone_id)
VALUES
    (3, 3, 1),
    (3, 4, 2),
    (1, 4, 2),
    (2, 4, 2),
    (4, 3, 2),
    (5, 3, 1),
    (6, 3, 1),
    (7, 3, 4),
    (8, 3, 5);
