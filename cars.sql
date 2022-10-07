DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE IF NOT EXISTS owners (
    owners_id SERIAL PRIMARY KEY,
    name varchar(20),
    age int
);



CREATE TABLE IF NOT EXISTS cars (
car_id SERIAL PRIMARY KEY,
make varchar(20),
model varchar(30),
car_year int,
car_type text,
owners_id int,
CONSTRAINT fk_carOwner FOREIGN KEY (owners_id) 
REFERENCES owners(owners_id)  ON DELETE CASCADE ON UPDATE CASCADE
);
