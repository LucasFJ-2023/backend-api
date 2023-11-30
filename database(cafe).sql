SELECT * FROM cafe_finder.favorites;

ALTER TABLE favorites
ADD COLUMN cafe_name VARCHAR(255);


UPDATE favorites
SET cafe_name = (SELECT cafe_name FROM cafes WHERE cafes.id = favorites.cafe_id)
WHERE id IS NOT NULL;

