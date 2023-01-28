CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    "login" character varying(255) NOT NULL UNIQUE,
	"password" character varying(255) NOT NULL,
	"age" integer NOT NULL,
	"is_deleted" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

INSERT INTO public.users(id, login, password, age, is_deleted) VALUES
('3e9d36a0-c349-4730-adc5-c4d7654956bc', 'user1', 'password1', 21, false),
('78e230c6-b00c-4b62-b068-a3b163440073', 'user2', 'password2', 22, false),
('2d44ebea-d445-4594-b888-8ebc63bbde53', 'user3', 'password3', 23, false),
('f46c8b21-f61c-411d-85ae-9f8e7f43f63b', 'user4', 'password4', 24, false);

CREATE TABLE IF NOT EXISTS public.groups
(
    id uuid NOT NULL,
    "name" character varying(255) NOT NULL UNIQUE,
	"permissions" character varying(255)[] NOT NULL,
	CONSTRAINT "groups_pk" PRIMARY KEY ("id")
);

INSERT INTO public.groups(id, name, permissions) VALUES
('3e9d36a0-c349-4730-adc5-c4d7654956bc', 'group1', ARRAY ['READ', 'WRITE']),
('78e230c6-b00c-4b62-b068-a3b163440073', 'group2', ARRAY ['READ', 'DELETE']);