CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "users"
(
    "id"            integer DEFAULT nextval('users_id_seq') NOT NULL,
    "ex_token"      character varying(50)                   NOT NULL,
    "username"      character varying(50)                   NOT NULL,
    "password_hash" character varying(150)                  NOT NULL,
    "createdAt"     timestamptz                             NOT NULL,
    "updatedAt"     timestamptz                             NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "users_username_ukey" UNIQUE("username")
) WITH (oids = false);
