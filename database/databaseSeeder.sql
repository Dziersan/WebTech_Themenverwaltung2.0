USE Webtech;
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


INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
    '2020-07-11',
    99999999,
    '2021-09-20',
    'ABC',
    6
);

