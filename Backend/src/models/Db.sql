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








.navC{  
    position: sticky;
    top: 0;
    z-index: 100;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      align-items: center;
      box-shadow: 0 -1px 13px ;
      background: rgba( 255, 255, 255, 0.5 );
      backdrop-filter: blur( 10px );
      padding: 0 3%;
      border-top-left-radius: 0%;
      border-top-right-radius: 0%;

  }
  .logo a{
      font-size: 5rem;
      cursor: pointer;
      color:#001147;
  }
  .logo a img{
    width: 50%;
    height: 50%;
    object-fit: contain !important;
   }
  
  .navitem {
      display: flex;
      flex-direction: row;
      justify-content:end;
      align-items: center;
      flex-basis:50%;
      gap:5%
  }
  
  .navitem li{
      list-style-type: none;
      /* margin: 20px; */
  }
  .navitem li a {
      text-decoration: none;
      font-size: 1.0rem;
      font-weight: 200;
      color:#001147;
      transition: 0.3s ease-in-out;
  }
  .navitem li a:hover , .navitem li a.active{
     font-weight: bolder;
     text-shadow: 2px #001147;
     text-decoration: underline;
  } 
  
  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
      color: #000;
      white-space: nowrap;
      border-radius: 3rem;
      font-size: 1rem;
      border: none;
      text-transform: uppercase;
      height: 2%;
      cursor: pointer;    
      transition-duration: 1s;
      transition-timing-function: ease-in;
      font-weight: 500;
      
    }
  .signup2 {
      background-color: aliceblue;
      border: 3px solid;
      color: #001147;
      transition: .3s;
    }
    .signup2:hover {
      background-color: rgb(219, 237, 252);

    }
    #mobile{
      display: none;
    }
 gnup::before{
      background:yellow ;
      content: "";
     transform: translate(-50% ,-50%);
      height: 100%;
      z-index: -1;
      transition: all 0.6s ease;
      width: 0;
      height: 100%;
  }
  .signup:hover::before{
      width: 100%;
  }
  
  
  @media screen and (max-width:850px) {
      .navbar{
          position: relative;
      }
     
      .navitem {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: absolute;
          top: 80px;
          left: -100%;
          right: 0px;
          background:#d9eff8;
          width: 100%;
          height:auto;
          box-shadow: 0px 40px 60px ;
          align-items: stretch;
          opacity: 1;
          padding: 50px 30px 30px 30px;
          margin: 0;
         
          
      }
      .navitem.active{
          left: 0;
          opacity: 1;
      } 
      .navlinks{
          display: block;
          width: 100%;
          font-size: 1.2rem;
          padding: 1rem 0;
          text-align: center;
      }
      .navlinks:hover {
          background-color:white;
          transition: none;
      }
      #mobile{
          display: block;
      }
            
  }
  

  export const setCookie = (name, value) => {
  const expires = new Date("9999-12-12");
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name) => {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: decodeURIComponent(value) }),
      {}
    );

  return cookies[name];
};

export const checkCookieExists = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return true; // Cookie exists
    }
  }
  return false; // Cookie does not exist
};

export const destroyCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};