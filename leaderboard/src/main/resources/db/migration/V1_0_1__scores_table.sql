CREATE TABLE IF NOT EXISTS scores
(
    id      UUID NOT NULL default random_uuid() PRIMARY KEY,
    name    TEXT NOT NULL,
    email   TEXT NOT NULL,
    seconds INT  NOT NULL
);
CREATE INDEX ON scores (seconds);
