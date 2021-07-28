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
    '2020-09-20',
    'ABC',
    1
);

INSERT INTO agenda ( group_order, group_number, topic, number_members, start_presentation, duration_presentation, end_presentation, date)
VALUES (
        1,
        5,
        'HelloWorld',
        5,
        '12:30:00',
        '01:00:00',
        '13:30:00',
        '2021-07-27'

);

INSERT INTO messages (group_id, message, date, type) VALUES (
    1, 'HelloWorl', '2021-07-27', 1);


INSERT INTO  module(description, participants_number) VALUES (
  'WebTech', 23
);

INSERT INTO notification(group_name, description) VALUES (
   'Themenverwaltung', 'überarbeiten'
);

INSERT INTO presentation(topic_id, date, room, day_start, day_end, occasion, module)
VALUES (3, '2021-08-08', 'KD201','13:00:00', '14:00:00','LastOne', 'Webtech');

INSERT INTO  softwarepool(software_name, software_description, software_link)
VALUES ('HeidiSQL', 'Für Datenbanken', 'https://www.heidisql.com/');

INSERT INTO topic(project_description, module_name, semester)
VALUES('Verbessern', 'Webtech', '3')