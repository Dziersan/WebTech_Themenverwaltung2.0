USE Webtech;

INSERT INTO MILESTONES (topic_id, description, status, start, end)
VALUES
    (1, 'Datenbankschema erstellen', 3, CURRENT_DATE, '2021-7-30'),
    (1, 'Datenbanktabellen mit Datensätzen füllen', 3, CURRENT_DATE, '2021-6-02'),
    (1, 'Datenbankabfragen erstellen', 2, CURRENT_DATE, '2021-6-10'),
    (1, 'Datentransfer zwischen Datenbank und Server', 2, CURRENT_DATE, '2021-6-17'),
    (1, 'Code-Style umsetzen', 2, CURRENT_DATE, '2021-7-01'),
    (2, 'SWOT-Analyse erstellen', 2, CURRENT_DATE, '2021-7-30');

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

