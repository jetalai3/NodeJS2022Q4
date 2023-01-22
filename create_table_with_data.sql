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
('3e9d36a0-c349-4730-adc5-c4d7654956bc', 'user1', 'password1', 21, false);