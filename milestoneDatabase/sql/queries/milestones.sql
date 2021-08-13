USE Webtech;

/* GET */

SELECT milestone_id AS milestoneID, description, status, successor,
       start, end, duration

    FROM MILESTONES

    WHERE topic_id = 1;

/* DELETE */

DELETE FROM MILESTONES

    WHERE milestone_id = 1 AND description = '';

/* INSERT */

INSERT INTO MILESTONES (topic_id, description, status, successor,  start, end)

    VALUES
        ();

/* UPDATE */

UPDATE MILESTONES

    SET
        description = '',
        status = 1

    WHERE milestone_id = 1;


