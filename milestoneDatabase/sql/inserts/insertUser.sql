USE Webtech;

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