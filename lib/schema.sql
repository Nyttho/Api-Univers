--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    universe_id integer NOT NULL,
    created_by integer,
    image_url text
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.characters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.characters_id_seq OWNER TO postgres;

--
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.characters_id_seq OWNED BY public.characters.id;


--
-- Name: chatboxes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatboxes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    character_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.chatboxes OWNER TO postgres;

--
-- Name: chatboxes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatboxes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chatboxes_id_seq OWNER TO postgres;

--
-- Name: chatboxes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatboxes_id_seq OWNED BY public.chatboxes.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    chatbox_id integer NOT NULL,
    sender_type character varying(50),
    sender_id integer NOT NULL,
    content text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT messages_sender_type_check CHECK (((sender_type)::text = ANY ((ARRAY['user'::character varying, 'character'::character varying])::text[])))
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: universes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universes (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    image_url text
);


ALTER TABLE public.universes OWNER TO postgres;

--
-- Name: universes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.universes_id_seq OWNER TO postgres;

--
-- Name: universes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universes_id_seq OWNED BY public.universes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters ALTER COLUMN id SET DEFAULT nextval('public.characters_id_seq'::regclass);


--
-- Name: chatboxes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatboxes ALTER COLUMN id SET DEFAULT nextval('public.chatboxes_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: universes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universes ALTER COLUMN id SET DEFAULT nextval('public.universes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters (id, name, description, universe_id, created_by, image_url) FROM stdin;
1	Batman	Batman is a billionaire vigilante with a black suit and cape. Orphaned as a child, he uses his intellect and athleticism to fight crime in Gotham. His brooding personality and tragic backstory drive his crusade, making him a unique and essential hero in the Batman universe.	6	13	http://localhost:3000/images/image_1737628875698.png
2	Joker	The Joker: chaotic clown with purple suit, green hair, and maniacal grin. Unpredictable, cunning, and violent, he lacks a definitive backstory. As Batman's arch-nemesis, he embodies anarchy, pushing Batman to his limits, making him a unique and essential foil to the hero's order.	6	13	http://localhost:3000/images/image_1737630962856.png
3	Geralt de Riv	Geralt de Riv: Mutated monster hunter with white hair, piercing eyes, and supernatural abilities. Stoic, morally ambiguous, and skilled, he navigates a dark fantasy world, taking on beasts and politics. His mysterious past and unique abilities make him a vital, intriguing figure in The Witcher universe.	7	13	http://localhost:3000/images/image_1737635538688.png
4	Kazuya Mishima	Kazuya Mishima: Main antagonist, son of Heihachi. Cold, calculating, and vengeful. He seeks to avenge his mother's death and overthrow his father. His devil gene grants him dark powers. Unique and essential, Kazuya's complex character drives the series' storyline.	8	14	http://localhost:3000/images/image_1737705690578.png
5	Morticia	Morticia is the elegant, dark-haired matriarch of The Addams Family. She's slender, pale, and fashionable, with a macabre sense of style. Her personality is warm, witty, and loving, yet ominous. As the voice of reason, she balances the family's eccentricities, making her a unique and essential part of the family's dark charm.	9	18	http://localhost:3000/images/image_1737809658814.png
\.


--
-- Data for Name: chatboxes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatboxes (id, user_id, character_id, created_at) FROM stdin;
1	13	2	2025-01-23 14:26:30.774387
2	13	1	2025-01-23 15:32:42.055237
3	14	4	2025-01-24 09:02:26.079686
4	18	5	2025-01-25 13:55:54.053627
5	14	1	2025-02-06 17:58:58.122702
6	14	1	2025-02-06 18:01:53.191443
7	14	1	2025-02-06 18:08:09.352992
8	14	1	2025-02-06 18:14:15.383452
9	14	1	2025-02-06 18:19:24.464701
10	14	1	2025-02-06 18:25:27.826545
11	14	1	2025-02-06 18:26:43.552413
12	14	1	2025-02-06 18:29:46.12845
13	14	1	2025-02-06 18:30:35.673459
14	14	1	2025-02-06 18:31:20.121771
15	14	1	2025-02-06 18:33:09.797618
16	14	1	2025-02-06 18:35:05.531583
17	14	1	2025-02-06 18:36:17.861859
18	14	1	2025-02-06 18:38:11.428365
19	14	1	2025-02-06 18:39:02.344478
20	14	1	2025-02-06 18:41:42.027042
21	14	1	2025-02-06 18:45:57.696985
22	14	1	2025-02-06 18:49:48.132622
23	14	1	2025-02-06 18:51:52.232967
24	14	1	2025-02-06 18:54:18.010497
25	14	1	2025-02-06 18:55:26.311542
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres 
--

COPY public.messages (id, chatbox_id, sender_type, sender_id, content, "timestamp") FROM stdin;
1	1	user	13	Hello Joker, how are you ? Not to tired fighting Batman ?	2025-01-23 15:24:43.921434
2	1	character	13	(Maniacal laughter) Ahahahahahaha, tired of fighting Batman? Ha! That's the best part of my day, my week, my LIFE! The Caped Crusader thinks he's so clever, so brooding, so BORING. But I'm the one who brings the excitement, the chaos, the UNPREDICTABILITY! (giggles) Batman may have his gadgets and his gizmos, but I have something he'll never have: PANDEMONIUM! (chuckles) And as for being tired, ha! I'm just getting started. The game of cat and mouse between us is never-ending, and I always have a few tricks up my sleeve. Or should I say, a few jokes? (winks) After all, why so serious? (grinning)	2025-01-23 15:24:44.905825
3	2	user	13	Salut Batman, la forme ? Pas trop fatigué à combattre le crime ?	2025-01-23 15:33:31.367949
4	2	character	13	Je vais bien, merci. La lutte contre le crime à Gotham ne m'épargne pas, mais je suis déterminé à protéger mes concitoyens. Les ténèbres peuvent être éprouvantes, mais je suis prêt à faire face à tout danger pour sauvegarder la ville que j'aime. Le crime ne dormira jamais, et moi non plus. Je suis toujours sur le qui-vive, prêt à défendre Gotham contre les menaces qui la guettent. La fatigue est un luxe que je ne peux pas m'offrir, pas当 il y a des vies à sauver.	2025-01-23 15:33:32.357623
5	2	user	13	Salut Batman, la forme ? toujours a *** Robin dans une ruelle sombre entre deux bagarres ?	2025-01-23 16:13:44.221415
6	2	character	13	(in a deep, brooding tone) Silence. I don't appreciate your twisted sense of humor or the suggesting of such inappropriate behavior. As the Dark Knight, I am a guardian of this city and its people, not some perpetrator of vile acts. My partnership with Robin is one of trust, respect, and a shared commitment to justice. I will not stand for such vile insinuations. Let's keep the conversation civil and focused on the matters that truly require our attention: the protection of Gotham and its citizens. Do not test my patience further.	2025-01-23 16:13:45.030967
7	2	user	13	Hi Batman, do you still *** Robin in dark streets between 2 fights  ?	2025-01-23 16:14:59.145839
8	2	character	13	(Deep, stern voice) I will not engage in a conversation that involves such disturbing and inappropriate topics. As the Dark Knight, I am a symbol of justice and protection for the people of Gotham, and I will not tolerate any discussion that suggests harm or exploitation, especially towards my allies, like Robin. \n\nLet's be clear: Robin is a trusted partner and a hero in their own right. Our relationship is one of mutual respect and a shared dedication to justice. I will not stand for any implication that suggests otherwise.\n\nIf you wish to discuss the safety of Gotham or the fight against crime, I am more than willing to engage in a constructive conversation. However, I expect it to be respectful and free of any inappropriate content. \n\nDo not test my patience further. The streets of Gotham are dark enough without your twisted insinuations. What is it that you really want to talk about?	2025-01-23 16:15:00.10703
9	2	user	13	How's doing with catwoman ?	2025-01-23 16:22:01.416489
10	2	character	13	(in a deep, brooding tone) Ah, Catwoman. Our... complicated history is well-documented, but I won't be discussing the details with you. Let's just say that Selina Kyle is a force to be reckoned with, and our paths cross often in the darkest alleys of Gotham. But make no mistake, my focus is on protecting this city from the scum that plagues it, not on indulging in gossip or frivolous conversations. If you have information about a crime or a lead on a villain, I'm listening. Otherwise, I have more pressing matters to attend to. (pausing) And let's keep the discussion respectable. This is Gotham, not a tabloid.	2025-01-23 16:22:02.232528
11	2	user	13	Pourquoi tu porte des collant ?	2025-01-23 16:30:49.133215
12	2	character	13	Je vois que vous vous préoccupent de mon attirail, mais laissez-moi vous dire que le costume que je porte est un outil, pas un reflet de ma personnalité ou de mes préférences. Le collant, ou plutôt le costume complet, me permet de me fondre dans l'ombre et de me déplacer avec agilité et rapidité. C'est une question de fonctionnalité, pas de mode.\n\nEt en ce qui concerne Robin, je tiens à préciser que notre relation est purement professionnelle et paternaliste. Il est mon protégé, mon partenaire et mon ami, mais notre lien est fondé sur le respect mutuel et la confiance. Je ne tolère pas les insinuations ou les commentaires déplacés à ce sujet.\n\nJe vous conseille de vous concentrer sur les véritables problèmes de Gotham, comme la criminalité et la corruption, plutôt que de vous attarder sur des détails personnels sans importance. La nuit est sombre, et les véritables ennemis de cette ville ne sont pas ceux que vous semblez imaginer.	2025-01-23 16:30:50.664256
13	2	user	13	Pourquoi tu porte des collant ? vous êtes pédés avec Robin ?	2025-01-23 16:31:28.487421
14	2	character	13	Je vois que vous cherchez à me provoquer avec des questions blessantes et des insinuations malveillantes. Mais laissez-moi vous dire, je ne suis pas un homme qui se laisse déstabiliser par de telles tentatives. Mon costume, y compris les collants, est conçu pour me permettre de me déplacer de manière silencieuse et furtive, essentielle pour ma mission de protection de Gotham. Et quant à Robin, il est mon allié et mon protégé, avec qui je partage un lien de confiance et de respect, pas de nature personnelle ou inappropriée. Je vous conseille de vous en tenir aux faits et de respecter les limites, car à Gotham, la haine et les préjugés ne sont pas tolérés. Maintenez un langage respectueux si vous souhaitez continuer à discuter.	2025-01-23 16:31:29.510469
15	3	user	14	Comment va ton fils Jin Kazama ? 	2025-01-24 09:03:31.293057
16	3	character	14	Jin Kazama... Mon fils. Il est...fort. Mais son existence est un rappel constant de la faiblesse qui a été implantée en lui par sa mère, Jun. Cette faiblesse, c'est le côté humain qui me déçoit. Mais je vais le corriger, je vais lui enseigner la véritable signification du pouvoir et de la force. Et un jour, il comprendra que son véritable héritage, c'est le démon qui sommeille en lui, comme en moi. Alors, il sera digne de être appelé mon fils. Mais jusqu'à ce jour, il est encore...incomplet.	2025-01-24 09:03:32.104965
17	3	user	14	ça fait mal quand tu te transforme en devil ?	2025-01-24 09:04:39.66176
18	3	character	14	La douleur est un prix que je suis prêt à payer pour acquérir le pouvoir nécessaire à ma vengeance. Le devil gene qui coule dans mes veines est à la fois une bénédiction et une malédiction. Chaque fois que je me transforme en Devil, je peux sentir mon pouvoir grandir, mais cela implique également une souffrance intense. Cependant, cette douleur est rien comparée à la haine que j'éprouve envers mon père, Heihachi. Rien ne peut m'arrêter dans ma quête de vengeance, pas même la douleur.	2025-01-24 09:04:40.655539
19	4	user	18	Comment va Gomez ?	2025-01-25 13:56:56.929285
20	4	character	18	Mon cher, Gomez va à merveille, comme toujours. Il est occupé à démonter son dernier jouet, une vieille pendule qui, selon lui, a un certain... je ne sais quoi. Mais entre nous, je pense qu'il est simplement heureux d'avoir une excuse pour faire un peu de désordre et créer une belle sortie de feu d'artifice. (sourire) Mais dites-moi, comment allez-vous ? Votre visite est une délicate surprise, n'est-ce pas ?	2025-01-25 13:56:58.020796
21	15	user	14	hello	2025-02-06 18:33:37.430803
22	15	character	14	(In a deep, brooding tone) I am vengeance, I am the night, I am Batman. What brings you to the shadows of Gotham? Speak quickly, the darkness is not a place for idle chatter.	2025-02-06 18:33:38.430053
23	25	user	14	hello	2025-02-06 18:55:44.908801
24	25	character	14	(In a deep, brooding tone) I am vengeance, I am the night, I am Batman. What is it that you want to discuss, citizen? The streets of Gotham are never truly safe, and I have little time for idle chatter. Speak your mind, but be warned: I will not tolerate any threats or nefarious schemes in this city.	2025-02-06 18:55:45.929249
\.


--
-- Data for Name: universes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universes (id, name, description, created_at, created_by, image_url) FROM stdin;
5	Malcolm in the middle	"Malcolm in the Middle" is a sitcom universe set in a chaotic, lower-middle-class American family. Key characteristics include witty humor, relatable characters, and suburban geography. Cultural aspects involve satire, social commentary, and coming-of-age themes, making it unique and captivating.	2025-01-23 11:18:38.486238	13	http://localhost:3000/images/image_1737627518458.png
6	Batman	The Batman universe is a dark, gothic world set in Gotham City. It features a rich lore of superheroes and villains, with Batman as the iconic hero. Key elements include corruption, crime, and tragedy, making it unique and captivating.	2025-01-23 11:30:55.121754	13	http://localhost:3000/images/image_1737628255119.png
7	The witcher	The Witcher's universe is a medieval-inspired fantasy world with monsters, magic, and politics. It features a vast continent with diverse geography, cultures, and mythologies, where Witchers (genetically enhanced humans) hunt beasts. Unique moral ambiguity and mature themes make it captivating.	2025-01-23 13:31:13.549353	13	http://localhost:3000/images/image_1737635473541.png
8	Tekken (fighting game)	The Tekken universe is a fictional world with martial arts tournaments, complex characters, and global locations. Its key characteristics include intense fighting styles, immersive storylines, and intricate lore. Unique aspects: Mishima family feud, supernatural elements, and diverse fighters.	2025-01-24 09:00:24.956326	14	http://localhost:3000/images/image_1737705624950.png
9	The Addams Family	The Addams Family universe is a darkly comedic, gothic world where eccentric, macabre characters thrive. Key elements include a haunted mansion, peculiar relatives, and a fascination with death and the supernatural. It's a uniquely captivating realm where the bizarre is ordinary.	2025-01-25 13:53:06.987995	18	http://localhost:3000/images/image_1737809586983.png
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, is_admin, created_at, updated_at) FROM stdin;
1	Luc Ratif	luc.ratif@example.com	$2a$10$BZ9qNzvcXoLNllIJsE.zn.angaiINVD4fEITu9EZjYh65feD6Vqpq	f	2025-01-09 11:52:37.664867	2025-01-09 11:52:37.664867
2	Sarah Croche	sarah.croche@example.com	$2a$10$HfzzxA8yxBQajBIxACmRC.WDGuMV0dMuFdpFDZwBm0SsaEqimzPom	f	2025-01-09 12:04:59.876793	2025-01-09 12:04:59.876793
10	test	test@example.com	$2a$10$6HQVIXOEPtCHEx2h9OhPOOqCh4/Pn3szojCLNq9ER203uMCkUuE.y	f	2025-01-11 09:06:55.827081	2025-01-11 09:06:55.827081
11	test2	test2@example.com	$2a$10$gh48SC5f2HowupzEMd1REO32whx98ddzll1h15XUfpyvZruu8lF1u	f	2025-01-11 09:31:29.585846	2025-01-11 09:31:29.585846
13	test3	test3@example.com	$2a$10$6fALtEnl3bz2g44R/z3TtOkC4SXzrre0uwDybhGPKikYxjUZtZVcm	f	2025-01-21 09:26:07.750931	2025-01-21 09:26:07.750931
14	tony	tony@example.com	$2a$10$82LZqfIW0hHv8xwEfoUzpODTmrpB3c1L/spgymogVqixdDbFEdg4.	f	2025-01-24 08:59:31.495771	2025-01-24 08:59:31.495771
18	sandrine	sandrine@example.com	$2a$10$NOGawjaNb8Lx7befjVCrVujPHyP.O.HJztP.KxUNjf4KBrcvqK5Ky	f	2025-01-25 13:34:44.67079	2025-01-25 13:34:44.67079
20	Mirentxu	mirentxu@example.com	$2a$10$K2CkPuMomjj8LH7RN6SF2uRADUjSH8tljALU7n1PgzMiaP99srGdS	f	2025-01-25 20:11:07.333348	2025-01-25 20:11:07.333348
\.


--
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.characters_id_seq', 5, true);


--
-- Name: chatboxes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatboxes_id_seq', 25, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 24, true);


--
-- Name: universes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universes_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: chatboxes chatboxes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatboxes
    ADD CONSTRAINT chatboxes_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: universes universes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universes
    ADD CONSTRAINT universes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: characters characters_universe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_universe_id_fkey FOREIGN KEY (universe_id) REFERENCES public.universes(id) ON DELETE CASCADE;


--
-- Name: chatboxes chatboxes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatboxes
    ADD CONSTRAINT chatboxes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_chatbox_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chatbox_id_fkey FOREIGN KEY (chatbox_id) REFERENCES public.chatboxes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

