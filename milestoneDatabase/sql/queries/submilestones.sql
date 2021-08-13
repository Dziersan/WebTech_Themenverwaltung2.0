USE Webtech;

/* GET */

SELECT description, status

    FROM SUBMILESTONES

    WHERE milestone_id = 13;


/* DELETE */

DELETE FROM SUBMILESTONES

    WHERE description = '' AND milestone_id = 1 AND status = 1;

/* INSERT */

INSERT INTO SUBMILESTONES (milestone_id, description, status)

    VALUES
        ();

/* UPDATE */

UPDATE SUBMILESTONES

    SET
        description = '',
        status = 1

    WHERE milestone_id = 1 AND description = '';