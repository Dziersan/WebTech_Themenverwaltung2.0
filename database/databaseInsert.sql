USE WEBTECH;
DELETE FROM Student;
DELETE FROM Modul;
DELETE FROM groups;
DELETE FROM student_group;

INSERT INTO Student(matrikel_nr, name, nachname, e_mail, semester, studiengang) VALUES
('25163', 'Maurice', 'Rethmann', 'maurice.rethmann@hs-osnabrueck.de', '04', 'Wirtschaftsinformatik'),
('24512', 'Patrick', 'Benten', 'patrick.benten@hs-osnabrueck.de', '04', 'Wirtschaftsinformatik');

INSERT INTO Modul(modul_id, beschreibung, teilnehmer_anzahl) VALUES
(001, "Modellierung und Simulation", 25),
(002, "Datenbanken", 25),
(003, "Statistik", 25),
(004, "Wirtschaftsrecht", 25),
(005, "SEP", 25),
(006, "Web Technologien", 25),
(007, "Logistik", 25),
(008, "Software Engineering", 25),
(009, "Kosten- und Leistungsrechnung", 25),
(010, "Informationsmanagement", 25);

DELETE FROM student;
INSERT INTO student(matrikel_nr, name, nachname, e_mail, semester, studiengang) VALUES
(25123, "Maurice", "Rethmann", "maurice.rethmann@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25124, "Patrick", "Benten", "patrick.benten@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25125, "Luca", "Schwarte", "luca.schwarte@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25126, "Dirk", "Hanekamp", "dirk.hanekamp@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25127, "Nils", "Lindemann", "nils.lindemann@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25128, "Tim", "Nötzel", "tim.nötzel@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25129, "Timon", "Borchers", "timon.borchers@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25130, "Julia", "Willen", "julia.willen@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25131, "Maurice", "Rethmann", "maurice.rethmann@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25132, "Patrick", "Benten", "patrick.benten@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25133, "Luca", "Schwarte", "luca.schwarte@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25134, "Dirk", "Hanekamp", "dirk.hanekamp@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25135, "Nils", "Lindemann", "nils.lindemann@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25136, "Tim", "Nötzel", "tim.nötzel@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25137, "Timon", "Borchers", "timon.borchers@hs-osnabrueck.de", 4, "Wirtschaftsinformatik"),
(25138, "Julia", "Willen", "julia.willen@hs-osnabrueck.de", 4, "Wirtschaftsinformatik");

INSERT INTO groups(group_id, beschreibung, teilnehmer_anzahl, teilnehmer_max, active) VALUES
(001, "Gravelshipping++", 5, 5, 1),
(002, "GUI Simulation", 4, 5, 1);

INSERT INTO student_group(matrikel_nr, group_id) VALUES
(25123, 001),
(25124, 001),
(25125, 001),
(25126, 001),
(25127, 001),
(25128, 002),
(25129, 002),
(25130, 002);

INSERT INTO user(id, token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course) VALUES
(001, "QQTTBB", "maurice", "rethmann", "rethmann.maurice@gmail.com", "maurice13", "1", "kp", "EERRZZ", "4", "Wirtschaftsinformatik");

INSERT INTO token(id, start, time, end, gentoken, user) VALUES
(001, "2021-07-12", 900, "2021-07-20", "BBTTAA", 5555);


INSERT INTO student (matrikel_nr, name, nachname, e_mail, semester, studiengang) VALUES
(123456, "Peteasdasdrsen", "Petersen", "sven.asd@hs-osnabrueck.de", 6,"Wirtschaftsinformatik");

INSERT INTO student_modul (matrikel_nr, modul_id) VALUES
(123456, 1);

INSERT INTO modul_mitarbeiter (modul_id, personal_id) VALUES
(2, 15),
(3, 15),
(4, 15),
(5, 15);