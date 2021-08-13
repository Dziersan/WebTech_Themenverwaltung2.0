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