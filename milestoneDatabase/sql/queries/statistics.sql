USE Webtech;

SELECT name, surname, SUM(used_time) AS sumTime

FROM user

         JOIN timeaccount ON user.id = timeaccount.user_id

         JOIN timeaccount_history ON timeaccount.timeaccount_id = timeaccount_history.timeaccount_id

WHERE timeaccount.topic_id = 3 GROUP BY name, surname;


