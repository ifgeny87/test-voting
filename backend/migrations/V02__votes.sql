CREATE SEQUENCE votes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "votes"
(
    "id"               integer DEFAULT nextval('votes_id_seq') NOT NULL,
    "user_id"          integer                                 NOT NULL,
    "title"            character varying(150)                  NOT NULL,
    "answers"          text                                    NOT NULL,
    "show_result_type" character varying(50)                   NOT NULL,
    "url"              character varying(2500)                 NOT NULL,
    "status"           character varying(50)                   NOT NULL,
    "createdAt"        timestamptz                             NOT NULL,
    "updatedAt"        timestamptz                             NOT NULL,
    CONSTRAINT "votes_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "votes_url_ukey" UNIQUE("url"),
    CONSTRAINT "vote_user_fk" FOREIGN KEY("user_id") REFERENCES "users" ("id")
) WITH (oids = false);
