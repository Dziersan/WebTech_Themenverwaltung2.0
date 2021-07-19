USE Webtech;

/* GET */

SELECT USER.name, USER.surname, timestamp, used_time

    FROM TIMEACCOUNT_HISTORY

        LEFT JOIN TIMEACCOUNT
            ON TIMEACCOUNT_HISTORY.timeaccount_id = TIMEACCOUNT.timeaccount_id

        LEFT JOIN USER
            ON TIMEACCOUNT.user_id = USER.id

    WHERE TIMEACCOUNT.topic_id = 1 ORDER BY TIMEACCOUNT_HISTORY.timestamp DESC;

/* DELETE */

/* INSERT */

INSERT INTO TIMEACCOUNT_HISTORY (timeaccount_id, used_time)

    VALUES
        ();

/* UPDATE */

UPDATE timeaccount_history

    SET
        used_time = 1

    WHERE timestamp = '' AND timeaccount_id = 1;


