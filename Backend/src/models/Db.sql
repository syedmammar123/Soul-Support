CREATE DATABASE soulsupport;

CREATE TABLE "User"(
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(500),
  email VARCHAR(255)
);

CREATE TABLE Roles(
  role_id SERIAL PRIMARY KEY, --1,2,3
  role_name VARCHAR(255)    --('user','instructor','therapist')
);

CREATE TABLE User_Roles (
  username VARCHAR(255) REFERENCES "User"(username),
  role_id INT REFERENCES Roles(role_id),
  PRIMARY KEY (username, role_id)
);


CREATE TABLE Professional (
  professionalId SERIAL PRIMARY KEY,
  fullName VARCHAR(255),
  username VARCHAR(255) REFERENCES "User"(username),
  expertise VARCHAR(255),
  licenseNo VARCHAR(255),
  experience INT,
  roleId INT REFERENCES Roles(role_id)
);

CREATE TABLE Booking (
  bookingId SERIAL PRIMARY KEY,
  userId VARCHAR(255) REFERENCES "User"(username),
  therapistId INTEGER REFERENCES Professional(professionalId),
  sessionDate DATE
);
CREATE TABLE LiveSession (
  sessionId SERIAL PRIMARY KEY,
  professionalId INTEGER REFERENCES Professional(professionalId),
  upcomingSession DATE,
  topic VARCHAR(255)
);

CREATE TABLE Chat (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  user_input text,
  generated_message text
);

--insert command for chat
INSERT INTO chat (username,user_input, generated_message) VALUES ('Ammar','Hi','Hello Ammar, How may i help you?');

--select chats of particular user
SELECT * FROM chat WHERE username = "alex456"


--Most experienced Therapist in the feild of anxiety disorders
SELECT * FROM Professional WHERE expertise = 'Anxiety disorders' ORDER BY experience DESC LIMIT 1;


--upcoming sessions for a professional with the username 'john123' omitting the past sessions 
SELECT upcomingSession, topic FROM LiveSession WHERE professionalId = (SELECT professionalId FROM Professional WHERE username = 'john123') AND upcomingSession >= CURRENT_DATE;


--inner join to check the sessions of specific therapist
SELECT Booking.sessionDate FROM Professional JOIN Booking ON Professional.professionalId = Booking.therapistId WHERE Professional.username = 'emma123';
 
--To retrieve the role(s) of a specific user:
SELECT r.role_name FROM "User" u JOIN User_Roles ur ON u.username = ur.username JOIN Roles r ON ur.role_id = r.role_id WHERE u.username = 'jhon123';


--alter table
ALTER TABLE blog ADD COLUMN author VARCHAR(255);







-- Insert data into "User" table
INSERT INTO "User" (username, password, email) VALUES ('john123', 'password123', 'john@example.com');

-- Insert data into "Roles" table
INSERT INTO Roles (role_name) VALUES ('user'), ('instructor'), ('therapist');

-- Insert data into "User_Roles" table
INSERT INTO User_Roles (username, role_id) VALUES ('john123', 2); -- Assigning role "instructor" to user "john123"

-- Insert data into "Professional" table
INSERT INTO Professional (fullName, username, expertise, licenseNo, experience, roleId) VALUES ('John Doe', 'john123', 'Psychology', 'AJRUSN324', 5, 2);

-- Insert data into "Booking" table
INSERT INTO Booking (userId, therapistId, sessionDate) VALUES ('john123', 1, '2023-07-19');

-- Insert data into "LiveSession" table
INSERT INTO LiveSession (professionalId, upcomingSession, topic) VALUES (1, '2023-07-15', 'Introduction to Psychology');

-- Insert data into "Chat" table
INSERT INTO Chat (username, user_input, generated_message) VALUES ('john123', 'Hello', 'Hi, how can I assist you?');





-- Insert more data into "User" table
INSERT INTO "User" (username, password, email) VALUES ('emma123', 'pass123', 'emma@example.com');
INSERT INTO "User" (username, password, email) VALUES ('alex456', 'securepwd', 'alex@example.com');

INSERT INTO User_Roles (username, role_id) VALUES ('emma123', 3); -- Assigning role "instructor" to user "john123"

-- Insert more data into "Professional" table
INSERT INTO Professional (fullName, username, expertise, licenseNo, experience, roleId) VALUES ('Emma Thompson', 'emma123', 'Anexity', 'RWDG54321', 8, 3);
INSERT INTO Professional (fullName, username, expertise, licenseNo, experience, roleId) VALUES ('Alex Johnson', 'alex456', 'Social Work', 'GTEF98765', 6, 3);

-- Insert more data into "Booking" table
INSERT INTO Booking (userId, therapistId, sessionDate) VALUES ('emma123', 2, '2023-07-05');

-- Insert more data into "LiveSession" table

INSERT INTO LiveSession (professionalId, upcomingSession, topic) VALUES (1, '2023-07-25', 'Dealing with Anexiety');

-- Insert more data into "Chat" table
INSERT INTO Chat (username, user_input, generated_message) VALUES ('emma123', 'Hi', 'Hello, how can I assist you today?');
INSERT INTO Chat (username, user_input, generated_message) VALUES ('alex456', 'I need help', 'Sure, I'm here to help. What do you need assistance with?');


INSERT INTO Booking (userId, therapistId, sessionDate) VALUES ('emma123', 2, '2023-07-27');







   // const user = await pool.query(
    //   'SELECT "User".username, Roles.role_name FROM "User" INNER JOIN User_Roles ON "User".username = User_Roles.username INNER JOIN Roles ON User_Roles.role_id = Roles.role_id WHERE "User".username = $1',
    //   [username]
    // );


















INSERT INTO Professional (fullName, username, expertise, licenseNo, experience, roleId)
VALUES ('Ariba Siddiqui ', 'ariba', 'Mental Health', 'yrdQET324242', 4, 2);


DELETE FROM "User"
WHERE username = 'ammar';

DELETE FROM user_roles
WHERE username = 'emma123';
DELETE FROM professional
WHERE username = 'emma wotson';

UPDATE professional
SET role_id = 3
WHERE username = 'aqsa';




