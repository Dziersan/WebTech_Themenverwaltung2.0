USE Webtech;

/* GET */

SELECT USER.name, USER.surname, topic_id AS topicID, max_time

    FROM TIMEACCOUNT

        LEFT JOIN USER
            ON TIMEACCOUNT.user_id = USER.id

    WHERE topic_id = 1;

/* DELETE */

DELETE FROM TIMEACCOUNT

    WHERE user_id = 1 AND topic_id = 1;

/* INSERT */

INSERT INTO TIMEACCOUNT (user_id, topic_id, max_time)

    VALUES
        ();

/* UPDATE */

UPDATE TIMEACCOUNT

    SET max_time = 1            /* + TIMEACCOUNT_HISTORY.used_time */

    WHERE user_id = 1 AND topic_id = 1;