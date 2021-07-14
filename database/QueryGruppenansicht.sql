USE WEBTECH;
SELECT student.matrikel_nr, name, nachname, e_mail FROM student
INNER JOIN student_group ON student.matrikel_nr = student_group.matrikel_nr
INNER JOIN groups ON student_group.group_id = groups.group_id
WHERE groups.beschreibung = 'Gravelshipping++'


SELECT * FROM groups
INNER JOIN student_group ON groups.group_id = student_group.group_id
INNER JOIN
INNER JOIN student ON student_group.matrikel_nr = student.matrikel_nr
WHERE student.matrikel_nr = '25123'