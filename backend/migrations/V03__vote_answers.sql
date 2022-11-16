CREATE SEQUENCE vote_answers_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "vote_answers"
(
    "id"             integer DEFAULT nextval('vote_answers_id_seq') NOT NULL,
    "vote_id"        integer                                        NOT NULL,
    "cookie_user_id" character varying(100)                         NOT NULL,
    "answer"         integer                                        NOT NULL,
    "createdAt"      timestamptz                                    NOT NULL,
    CONSTRAINT "vote_answers_pkey" PRIMARY KEY ("id")
) WITH (oids = false);
