USE Webtech;

/* GET */

SELECT USER.name, USER.surname, TOPIC.project_description

    FROM PARTICIPANT_GROUP

        LEFT JOIN USER
            ON PARTICIPANT_GROUP.user_id = USER.id

        LEFT JOIN TOPIC
            ON PARTICIPANT_GROUP.topic_id = TOPIC.id

    WHERE PARTICIPANT_GROUP.topic_id = 1;

/* DELETE */

/* INSERT */

/* UPDATE */