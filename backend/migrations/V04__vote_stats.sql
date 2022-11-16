CREATE SEQUENCE vote_stats_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "vote_stats"
(
    "id"              integer DEFAULT nextval('vote_stats_id_seq') NOT NULL,
    "vote_id"         integer                                      NOT NULL,
    "answer_counters" json                                         NOT NULL,
    "createdAt"       timestamptz                                  NOT NULL,
    "updatedAt"       timestamptz                                  NOT NULL,
    CONSTRAINT "vote_stats_pkey" PRIMARY KEY ("id")
) WITH (oids = false);
