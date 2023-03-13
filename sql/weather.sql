USE weather;

DROP TABLE IF EXISTS weatherrecords;

CREATE TABLE weatherrecords (
  station_id VARCHAR(11),
  date DATE,
  element VARCHAR(4),
  value1 INT,
  mflag1 VARCHAR(1),
  qflag1 VARCHAR(1),
  sflag1 VARCHAR(1),
  PRIMARY KEY (station_id, date, element)
);

LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/2022.csv'
INTO TABLE weatherrecords
FIELDS TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '\\'
LINES TERMINATED BY '\n' STARTING BY '';
