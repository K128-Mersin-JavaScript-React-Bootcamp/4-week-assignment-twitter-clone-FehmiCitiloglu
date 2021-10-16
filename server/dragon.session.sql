CREATE TABLE users (
    id serial PRIMARY KEY,
    username CHARACTER VARYING(15) NOT NULL,
    unique(username)
);

CREATE TABLE tweets (
    tweet_id SERIAL PRIMARY KEY,
    user_id int not null,
    tweet_content CHARACTER VARYING(280) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
)