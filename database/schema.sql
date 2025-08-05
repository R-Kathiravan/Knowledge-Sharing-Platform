 CREATE TABLE resources (
    resource_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    file_type DEFAULT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    views INT DEFAULT 0,
    uploaded_at DATETIME DEFAULT NULL,
    STATUS ENUM('activated', 'rejected', 'pending') DEFAULT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

 CREATE TABLE events (
    event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    title VARCHAR(150) DEFAULT NULL,
    type VARCHAR(50) DEFAULT NULL,
    organized_by VARCHAR(150) DEFAULT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,
    keywords TEXT DEFAULT NULL,
    STATUS ENUM('activated', 'rejected', 'pending') DEFAULT NULL
);


---Procedures

DELIMITER $$
CREATE  PROCEDURE ApproveEventAndResources`(IN `eid` INT)
BEGIN
    UPDATE events SET status = 'activated' WHERE event_id = eid;
    UPDATE resources SET status = 'activated' WHERE event_id = eid;
END$$
DELIMITER ;


DELIMITER $$
CREATE  PROCEDURE `GetByID`(IN id INT)
BEGIN
    SELECT * FROM events WHERE event_id = id;
    SELECT * FROM resources WHERE event_id = id;
END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `rejectEventResources`(IN `eventid` INT)
BEGIN
    UPDATE events SET status = 'rejected' WHERE event_id = eventid;
    UPDATE resources SET status = 'rejected' WHERE event_id = eventid;
END$$
DELIMITER ;