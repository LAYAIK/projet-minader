--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-27 09:25:23

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

--
-- TOC entry 6 (class 2615 OID 122889)
-- Name: assurance; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA assurance;


ALTER SCHEMA assurance OWNER TO postgres;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 865 (class 1247 OID 122891)
-- Name: enum_Clients_role; Type: TYPE; Schema: assurance; Owner: postgres
--

CREATE TYPE assurance."enum_Clients_role" AS ENUM (
    'client',
    'client 1',
    'client 2',
    'client 3'
);


ALTER TYPE assurance."enum_Clients_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 122915)
-- Name: Vehicules; Type: TABLE; Schema: assurance; Owner: postgres
--

CREATE TABLE assurance."Vehicules" (
    immatriculation bigint NOT NULL
);


ALTER TABLE assurance."Vehicules" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 122934)
-- Name: Vehicules_immatriculation_seq; Type: SEQUENCE; Schema: assurance; Owner: postgres
--

ALTER TABLE assurance."Vehicules" ALTER COLUMN immatriculation ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME assurance."Vehicules_immatriculation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 443813)
-- Name: Archives; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Archives" (
    id_archive uuid NOT NULL,
    date_archivage timestamp with time zone NOT NULL,
    raison_archivage text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Archives" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 443859)
-- Name: Clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clients" (
    id_client uuid NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    email character varying(100),
    telephone character varying(20),
    numero_identite character varying(50),
    numero_permis_conduire character varying(50),
    adresse character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_utilisateur uuid
);


ALTER TABLE public."Clients" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 443779)
-- Name: Compagnies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Compagnies" (
    id_compagnie uuid NOT NULL,
    nom_compagnie character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Compagnies" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 443906)
-- Name: Contrats_Assurance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Contrats_Assurance" (
    id_police uuid NOT NULL,
    id_contrat uuid NOT NULL,
    numero_contrat character varying(100) NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    montant_prime numeric(10,2) NOT NULL,
    statut_contrat character varying(50) DEFAULT 'Actif'::character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_client uuid,
    id_type_assurance uuid,
    id_compagnie uuid,
    id_utilisateur uuid
);


ALTER TABLE public."Contrats_Assurance" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 443954)
-- Name: Documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Documents" (
    id_document uuid NOT NULL,
    nom_fichier character varying(255) NOT NULL,
    chemin_fichier character varying(255) NOT NULL,
    type_fichier character varying(100),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_client uuid,
    id_police uuid,
    id_sinistre uuid,
    id_dossier uuid,
    id_utilisateur uuid
);


ALTER TABLE public."Documents" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 443820)
-- Name: Dossiers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dossiers" (
    id_dossier uuid NOT NULL,
    numero_dossier character varying(100) NOT NULL,
    titre character varying(255),
    description character varying(255),
    date_creation date NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_police uuid,
    id_etat_dossier uuid,
    id_archive uuid,
    id_contrat uuid
);


ALTER TABLE public."Dossiers" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 443804)
-- Name: Etats_Dossier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Etats_Dossier" (
    id_etat_dossier uuid NOT NULL,
    nom_etat character varying(100) NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Etats_Dossier" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 443874)
-- Name: Historique_Evenements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Historique_Evenements" (
    id_hist_event uuid NOT NULL,
    type_evenement character varying(100) NOT NULL,
    description text NOT NULL,
    entite_affectee character varying(50),
    id_entite_affectee uuid,
    valeurs_avant jsonb,
    valeurs_apres jsonb,
    date_evenement timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_police uuid,
    id_dossier uuid,
    id_sinistre uuid,
    id_utilisateur uuid,
    id_client uuid
);


ALTER TABLE public."Historique_Evenements" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 443981)
-- Name: Indemnisations_Sinistre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Indemnisations_Sinistre" (
    id_indemnisation uuid NOT NULL,
    montant numeric(10,2) NOT NULL,
    date_paiement date,
    mode_paiement character varying(50),
    statut character varying(50) DEFAULT 'En attente'::character varying NOT NULL,
    reference_paiement character varying(255),
    description_indemnisation text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_sinistre uuid
);


ALTER TABLE public."Indemnisations_Sinistre" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 443934)
-- Name: Personnels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Personnels" (
    id_personnel uuid NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    email character varying(100),
    numero_identite character varying(100),
    telephone character varying(20),
    poste character varying(100),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_compagnie uuid,
    id_utilisateur uuid
);


ALTER TABLE public."Personnels" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 443994)
-- Name: Primes_Assurance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Primes_Assurance" (
    id_prime uuid NOT NULL,
    montant numeric(10,2) NOT NULL,
    date_echeance date NOT NULL,
    date_paiement date,
    mode_paiement character varying(50),
    statut character varying(50) DEFAULT 'En attente'::character varying NOT NULL,
    reference_paiement character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_contrat uuid
);


ALTER TABLE public."Primes_Assurance" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 443770)
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    id_role uuid NOT NULL,
    nom_role character varying(50) NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 443839)
-- Name: Sinistres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sinistres" (
    id_sinistre uuid NOT NULL,
    numero_sinistre character varying(100) NOT NULL,
    date_declaration date NOT NULL,
    date_incident date NOT NULL,
    description_sinistre text NOT NULL,
    type_sinistre character varying(100),
    statut_sinistre character varying(50) DEFAULT 'Déclaré'::character varying,
    date_resolution date,
    montant_estime numeric(10,2),
    montant_regle numeric(10,2),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_dossier uuid,
    id_police uuid,
    id_utilisateur uuid,
    reference_sinistre character varying(150)
);


ALTER TABLE public."Sinistres" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 444000)
-- Name: Transactions_Bancaires; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transactions_Bancaires" (
    id_transaction uuid NOT NULL,
    date_transaction date NOT NULL,
    montant numeric(10,2) NOT NULL,
    description text,
    reference character varying(255),
    type character varying(50) NOT NULL,
    rapprochement_id uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_client uuid
);


ALTER TABLE public."Transactions_Bancaires" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 443763)
-- Name: Types_Assurance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Types_Assurance" (
    id_type_assurance uuid NOT NULL,
    nom character varying(100) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Types_Assurance" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 443784)
-- Name: Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateurs" (
    id_utilisateur uuid NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255),
    fonction character varying(100),
    direction character varying(100),
    justificatif character varying(255),
    is_actif boolean DEFAULT false NOT NULL,
    date_demande timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_compagnie uuid,
    id_role uuid
);


ALTER TABLE public."Utilisateurs" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 443901)
-- Name: Vehicules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vehicules" (
    immatriculation character varying(50) NOT NULL,
    marque character varying(100),
    modele character varying(100),
    annee_fabrication integer,
    couleur character varying(100),
    numero_chassis character varying(50),
    numero_carte_grise character varying(50),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_police uuid
);


ALTER TABLE public."Vehicules" OWNER TO postgres;

--
-- TOC entry 4940 (class 0 OID 122915)
-- Dependencies: 218
-- Data for Name: Vehicules; Type: TABLE DATA; Schema: assurance; Owner: postgres
--



--
-- TOC entry 4947 (class 0 OID 443813)
-- Dependencies: 225
-- Data for Name: Archives; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4950 (class 0 OID 443859)
-- Dependencies: 228
-- Data for Name: Clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Clients" (id_client, nom, prenom, email, telephone, numero_identite, numero_permis_conduire, adresse, created_at, updated_at, id_utilisateur) VALUES ('e1b2c3d4-e5f6-7890-1234-567890abcdef', 'NONO', 'careel', 'bsfdgssjh', '1234565432', '123456789098765', '1236654', 'vbmjuyrtresxcv', '2025-06-27 06:09:04.712+02', '2025-06-27 06:09:04.712+02', NULL);


--
-- TOC entry 4944 (class 0 OID 443779)
-- Dependencies: 222
-- Data for Name: Compagnies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Compagnies" (id_compagnie, nom_compagnie, created_at, updated_at) VALUES ('b1c2d3e4-f5a6-7890-1234-567890abcdef', 'GMC', '2025-06-27 06:21:53.79+02', '2025-06-27 06:21:53.79+02');


--
-- TOC entry 4953 (class 0 OID 443906)
-- Dependencies: 231
-- Data for Name: Contrats_Assurance; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Contrats_Assurance" (id_police, id_contrat, numero_contrat, date_debut, date_fin, montant_prime, statut_contrat, created_at, updated_at, id_client, id_type_assurance, id_compagnie, id_utilisateur) VALUES ('ab268298-b72d-486c-81ea-dfc7c36b50d3', 'fa50f1f1-ae5e-4f78-be42-cc3132522f85', 'POLICE-2024-0001', '2024-01-01', '2025-01-01', 1250.75, 'Actif', '2025-06-27 06:24:28.208+02', '2025-06-27 06:24:28.208+02', 'e1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'b1c2d3e4-f5a6-7890-1234-567890abcdef', NULL);
INSERT INTO public."Contrats_Assurance" (id_police, id_contrat, numero_contrat, date_debut, date_fin, montant_prime, statut_contrat, created_at, updated_at, id_client, id_type_assurance, id_compagnie, id_utilisateur) VALUES ('ab268298-b72d-486c-81ea-dfc7c36b50d4', 'd1e2f3a4-b5c6-7890-1234-567890abcdef', 'POLICE-2024-0002', '2024-01-01', '2025-01-01', 123467.43, 'Actif', '2025-06-27 06:24:28.208+02', '2025-06-27 06:24:28.208+02', 'e1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'b1c2d3e4-f5a6-7890-1234-567890abcdef', NULL);


--
-- TOC entry 4955 (class 0 OID 443954)
-- Dependencies: 233
-- Data for Name: Documents; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4948 (class 0 OID 443820)
-- Dependencies: 226
-- Data for Name: Dossiers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Dossiers" (id_dossier, numero_dossier, titre, description, date_creation, created_at, updated_at, id_police, id_etat_dossier, id_archive, id_contrat) VALUES ('6e8ac02c-f9e7-4f99-98d4-75484d40f9f5', 'DOSS-2024-0001', 'Dossier de sinistre voiture A. Dupont', 'Suivi du sinistre n°XYZ lié au contrat auto.', '2025-06-27', '2025-06-27 07:14:11.431+02', '2025-06-27 07:14:11.431+02', NULL, NULL, NULL, NULL);


--
-- TOC entry 4946 (class 0 OID 443804)
-- Dependencies: 224
-- Data for Name: Etats_Dossier; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Etats_Dossier" (id_etat_dossier, nom_etat, description, created_at, updated_at) VALUES ('f1e2d3c4-a5b6-7890-1234-567890abcdef', 'ouverture', 'automobile', '2025-06-27 04:06:53.705+02', '2025-06-27 04:06:53.705+02');


--
-- TOC entry 4951 (class 0 OID 443874)
-- Dependencies: 229
-- Data for Name: Historique_Evenements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Historique_Evenements" (id_hist_event, type_evenement, description, entite_affectee, id_entite_affectee, valeurs_avant, valeurs_apres, date_evenement, created_at, updated_at, id_police, id_dossier, id_sinistre, id_utilisateur, id_client) VALUES ('3cfaca2c-df6d-449d-8d64-e69c6e148daa', 'Création Contrat', 'Contrat de référence POLICE-2024-0001 créé.', 'ContratAssurance', 'ab268298-b72d-486c-81ea-dfc7c36b50d3', NULL, '{"date_fin": "2025-01-01", "createdAt": "2025-06-27T04:24:28.208Z", "id_client": "e1b2c3d4-e5f6-7890-1234-567890abcdef", "id_police": "ab268298-b72d-486c-81ea-dfc7c36b50d3", "updatedAt": "2025-06-27T04:24:28.208Z", "date_debut": "2024-01-01", "id_contrat": "fa50f1f1-ae5e-4f78-be42-cc3132522f85", "id_compagnie": "b1c2d3e4-f5a6-7890-1234-567890abcdef", "montant_prime": "1250.75", "id_utilisateur": null, "numero_contrat": "POLICE-2024-0001", "statut_contrat": "Actif", "id_type_assurance": "a1b2c3d4-e5f6-7890-1234-567890abcdef"}', '2025-06-27 06:24:28.227+02', '2025-06-27 06:24:28.227+02', '2025-06-27 06:24:28.227+02', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Historique_Evenements" (id_hist_event, type_evenement, description, entite_affectee, id_entite_affectee, valeurs_avant, valeurs_apres, date_evenement, created_at, updated_at, id_police, id_dossier, id_sinistre, id_utilisateur, id_client) VALUES ('c1d3eb2e-e186-477d-9b3a-00426ea18cf8', 'Création Dossier', 'Dossier de référence DOSS-2024-0001 créé.', 'Dossier', '6e8ac02c-f9e7-4f99-98d4-75484d40f9f5', NULL, '{"titre": "Dossier de sinistre voiture A. Dupont", "createdAt": "2025-06-27T05:14:11.431Z", "id_police": null, "updatedAt": "2025-06-27T05:14:11.431Z", "id_archive": null, "id_dossier": "6e8ac02c-f9e7-4f99-98d4-75484d40f9f5", "description": "Suivi du sinistre n°XYZ lié au contrat auto.", "date_creation": "2025-06-27", "numero_dossier": "DOSS-2024-0001", "id_etat_dossier": null}', '2025-06-27 07:14:11.454+02', '2025-06-27 07:14:11.454+02', '2025-06-27 07:14:11.454+02', NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 4956 (class 0 OID 443981)
-- Dependencies: 234
-- Data for Name: Indemnisations_Sinistre; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4954 (class 0 OID 443934)
-- Dependencies: 232
-- Data for Name: Personnels; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4957 (class 0 OID 443994)
-- Dependencies: 235
-- Data for Name: Primes_Assurance; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4943 (class 0 OID 443770)
-- Dependencies: 221
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Roles" (id_role, nom_role, description, created_at, updated_at) VALUES ('dbf29479-0eee-4b84-9f17-6b070591e7d3', 'admin', 'le develloper du projet', '2025-06-18 20:40:49.167+02', '2025-06-18 20:40:49.167+02');
INSERT INTO public."Roles" (id_role, nom_role, description, created_at, updated_at) VALUES ('00a88ddd-7f12-4392-b9ba-ec3578331186', 'gestionnaire', 'gerer les comptes', '2025-06-27 04:26:28.289+02', '2025-06-27 04:26:28.289+02');


--
-- TOC entry 4949 (class 0 OID 443839)
-- Dependencies: 227
-- Data for Name: Sinistres; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4958 (class 0 OID 444000)
-- Dependencies: 236
-- Data for Name: Transactions_Bancaires; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4942 (class 0 OID 443763)
-- Dependencies: 220
-- Data for Name: Types_Assurance; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Types_Assurance" (id_type_assurance, nom, created_at, updated_at) VALUES ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'automobile', '2025-06-27 06:09:04.712+02', '2025-06-27 06:09:04.712+02');


--
-- TOC entry 4945 (class 0 OID 443784)
-- Dependencies: 223
-- Data for Name: Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Utilisateurs" (id_utilisateur, nom, prenom, email, password, fonction, direction, justificatif, is_actif, date_demande, created_at, updated_at, id_compagnie, id_role) VALUES ('363f4155-77f9-41d1-b9a4-2de1590884e3', 'ADMIN', 'ADMIN', 'admin@admin.com', '$2b$10$TSYjQVT4AGLMVFXXdT3pO.w8tOxjwY9Z1bDK6kLJC3vi.H74xTHTa', 'admin', 'Finance', 'arrete du 3667788', true, '2025-06-18 20:33:42.259+02', '2025-06-18 20:32:20.336+02', '2025-06-18 20:33:42.259+02', NULL, 'dbf29479-0eee-4b84-9f17-6b070591e7d3');
INSERT INTO public."Utilisateurs" (id_utilisateur, nom, prenom, email, password, fonction, direction, justificatif, is_actif, date_demande, created_at, updated_at, id_compagnie, id_role) VALUES ('52a3b6b3-aefe-4db3-af63-0c445d80a6da', 'NYA', 'PASCALO', 'cabrelnya@gmail.com', '$2b$10$GEJXiI/DzHFavVbi6kFP/OLriAp1q379v5rt3r.VbMORubyPXiHoa', 'gestionnaire compte', 'Direction A', 'note 1242', true, '2025-06-27 04:17:04.856+02', '2025-06-27 04:06:53.705+02', '2025-06-27 05:33:06.65+02', NULL, '00a88ddd-7f12-4392-b9ba-ec3578331186');


--
-- TOC entry 4952 (class 0 OID 443901)
-- Dependencies: 230
-- Data for Name: Vehicules; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 219
-- Name: Vehicules_immatriculation_seq; Type: SEQUENCE SET; Schema: assurance; Owner: postgres
--

SELECT pg_catalog.setval('assurance."Vehicules_immatriculation_seq"', 1, false);


--
-- TOC entry 4737 (class 2606 OID 443819)
-- Name: Archives Archives_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Archives"
    ADD CONSTRAINT "Archives_pkey" PRIMARY KEY (id_archive);


--
-- TOC entry 4747 (class 2606 OID 443867)
-- Name: Clients Clients_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_email_key" UNIQUE (email);


--
-- TOC entry 4749 (class 2606 OID 443865)
-- Name: Clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id_client);


--
-- TOC entry 4727 (class 2606 OID 443783)
-- Name: Compagnies Compagnies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Compagnies"
    ADD CONSTRAINT "Compagnies_pkey" PRIMARY KEY (id_compagnie);


--
-- TOC entry 4756 (class 2606 OID 443913)
-- Name: Contrats_Assurance Contrats_Assurance_numero_contrat_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_numero_contrat_key" UNIQUE (numero_contrat);


--
-- TOC entry 4758 (class 2606 OID 443911)
-- Name: Contrats_Assurance Contrats_Assurance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_pkey" PRIMARY KEY (id_police, id_contrat);


--
-- TOC entry 4765 (class 2606 OID 443960)
-- Name: Documents Documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY (id_document);


--
-- TOC entry 4739 (class 2606 OID 443828)
-- Name: Dossiers Dossiers_numero_dossier_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dossiers"
    ADD CONSTRAINT "Dossiers_numero_dossier_key" UNIQUE (numero_dossier);


--
-- TOC entry 4741 (class 2606 OID 443826)
-- Name: Dossiers Dossiers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dossiers"
    ADD CONSTRAINT "Dossiers_pkey" PRIMARY KEY (id_dossier);


--
-- TOC entry 4733 (class 2606 OID 443812)
-- Name: Etats_Dossier Etats_Dossier_nom_etat_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etats_Dossier"
    ADD CONSTRAINT "Etats_Dossier_nom_etat_key" UNIQUE (nom_etat);


--
-- TOC entry 4735 (class 2606 OID 443810)
-- Name: Etats_Dossier Etats_Dossier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etats_Dossier"
    ADD CONSTRAINT "Etats_Dossier_pkey" PRIMARY KEY (id_etat_dossier);


--
-- TOC entry 4752 (class 2606 OID 443880)
-- Name: Historique_Evenements Historique_Evenements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historique_Evenements"
    ADD CONSTRAINT "Historique_Evenements_pkey" PRIMARY KEY (id_hist_event);


--
-- TOC entry 4767 (class 2606 OID 443988)
-- Name: Indemnisations_Sinistre Indemnisations_Sinistre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Indemnisations_Sinistre"
    ADD CONSTRAINT "Indemnisations_Sinistre_pkey" PRIMARY KEY (id_indemnisation);


--
-- TOC entry 4760 (class 2606 OID 443942)
-- Name: Personnels Personnels_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Personnels"
    ADD CONSTRAINT "Personnels_email_key" UNIQUE (email);


--
-- TOC entry 4762 (class 2606 OID 443940)
-- Name: Personnels Personnels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Personnels"
    ADD CONSTRAINT "Personnels_pkey" PRIMARY KEY (id_personnel);


--
-- TOC entry 4769 (class 2606 OID 443999)
-- Name: Primes_Assurance Primes_Assurance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Primes_Assurance"
    ADD CONSTRAINT "Primes_Assurance_pkey" PRIMARY KEY (id_prime);


--
-- TOC entry 4723 (class 2606 OID 443778)
-- Name: Roles Roles_nom_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_nom_role_key" UNIQUE (nom_role);


--
-- TOC entry 4725 (class 2606 OID 443776)
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id_role);


--
-- TOC entry 4743 (class 2606 OID 443848)
-- Name: Sinistres Sinistres_numero_sinistre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sinistres"
    ADD CONSTRAINT "Sinistres_numero_sinistre_key" UNIQUE (numero_sinistre);


--
-- TOC entry 4745 (class 2606 OID 443846)
-- Name: Sinistres Sinistres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sinistres"
    ADD CONSTRAINT "Sinistres_pkey" PRIMARY KEY (id_sinistre);


--
-- TOC entry 4771 (class 2606 OID 444006)
-- Name: Transactions_Bancaires Transactions_Bancaires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions_Bancaires"
    ADD CONSTRAINT "Transactions_Bancaires_pkey" PRIMARY KEY (id_transaction);


--
-- TOC entry 4719 (class 2606 OID 443769)
-- Name: Types_Assurance Types_Assurance_nom_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Types_Assurance"
    ADD CONSTRAINT "Types_Assurance_nom_key" UNIQUE (nom);


--
-- TOC entry 4721 (class 2606 OID 443767)
-- Name: Types_Assurance Types_Assurance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Types_Assurance"
    ADD CONSTRAINT "Types_Assurance_pkey" PRIMARY KEY (id_type_assurance);


--
-- TOC entry 4729 (class 2606 OID 443793)
-- Name: Utilisateurs Utilisateurs_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_email_key" UNIQUE (email);


--
-- TOC entry 4731 (class 2606 OID 443791)
-- Name: Utilisateurs Utilisateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_pkey" PRIMARY KEY (id_utilisateur);


--
-- TOC entry 4754 (class 2606 OID 443905)
-- Name: Vehicules Vehicules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicules"
    ADD CONSTRAINT "Vehicules_pkey" PRIMARY KEY (immatriculation);


--
-- TOC entry 4750 (class 1259 OID 443873)
-- Name: clients_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX clients_email ON public."Clients" USING btree (email);


--
-- TOC entry 4763 (class 1259 OID 443953)
-- Name: personnels_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX personnels_email ON public."Personnels" USING btree (email);


--
-- TOC entry 4778 (class 2606 OID 443868)
-- Name: Clients Clients_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4783 (class 2606 OID 443914)
-- Name: Contrats_Assurance Contrats_Assurance_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_id_client_fkey" FOREIGN KEY (id_client) REFERENCES public."Clients"(id_client) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4784 (class 2606 OID 443924)
-- Name: Contrats_Assurance Contrats_Assurance_id_compagnie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_id_compagnie_fkey" FOREIGN KEY (id_compagnie) REFERENCES public."Compagnies"(id_compagnie) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4785 (class 2606 OID 443919)
-- Name: Contrats_Assurance Contrats_Assurance_id_type_assurance_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_id_type_assurance_fkey" FOREIGN KEY (id_type_assurance) REFERENCES public."Types_Assurance"(id_type_assurance) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4786 (class 2606 OID 443929)
-- Name: Contrats_Assurance Contrats_Assurance_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contrats_Assurance"
    ADD CONSTRAINT "Contrats_Assurance_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4789 (class 2606 OID 443961)
-- Name: Documents Documents_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_id_client_fkey" FOREIGN KEY (id_client) REFERENCES public."Clients"(id_client) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4790 (class 2606 OID 443971)
-- Name: Documents Documents_id_dossier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_id_dossier_fkey" FOREIGN KEY (id_dossier) REFERENCES public."Dossiers"(id_dossier) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4791 (class 2606 OID 443966)
-- Name: Documents Documents_id_sinistre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_id_sinistre_fkey" FOREIGN KEY (id_sinistre) REFERENCES public."Sinistres"(id_sinistre) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4792 (class 2606 OID 443976)
-- Name: Documents Documents_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4774 (class 2606 OID 443834)
-- Name: Dossiers Dossiers_id_archive_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dossiers"
    ADD CONSTRAINT "Dossiers_id_archive_fkey" FOREIGN KEY (id_archive) REFERENCES public."Archives"(id_archive) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4775 (class 2606 OID 443829)
-- Name: Dossiers Dossiers_id_etat_dossier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dossiers"
    ADD CONSTRAINT "Dossiers_id_etat_dossier_fkey" FOREIGN KEY (id_etat_dossier) REFERENCES public."Etats_Dossier"(id_etat_dossier) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4779 (class 2606 OID 443896)
-- Name: Historique_Evenements Historique_Evenements_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historique_Evenements"
    ADD CONSTRAINT "Historique_Evenements_id_client_fkey" FOREIGN KEY (id_client) REFERENCES public."Clients"(id_client) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4780 (class 2606 OID 443881)
-- Name: Historique_Evenements Historique_Evenements_id_dossier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historique_Evenements"
    ADD CONSTRAINT "Historique_Evenements_id_dossier_fkey" FOREIGN KEY (id_dossier) REFERENCES public."Dossiers"(id_dossier) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4781 (class 2606 OID 443886)
-- Name: Historique_Evenements Historique_Evenements_id_sinistre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historique_Evenements"
    ADD CONSTRAINT "Historique_Evenements_id_sinistre_fkey" FOREIGN KEY (id_sinistre) REFERENCES public."Sinistres"(id_sinistre) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4782 (class 2606 OID 443891)
-- Name: Historique_Evenements Historique_Evenements_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Historique_Evenements"
    ADD CONSTRAINT "Historique_Evenements_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4793 (class 2606 OID 443989)
-- Name: Indemnisations_Sinistre Indemnisations_Sinistre_id_sinistre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Indemnisations_Sinistre"
    ADD CONSTRAINT "Indemnisations_Sinistre_id_sinistre_fkey" FOREIGN KEY (id_sinistre) REFERENCES public."Sinistres"(id_sinistre) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4787 (class 2606 OID 443943)
-- Name: Personnels Personnels_id_compagnie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Personnels"
    ADD CONSTRAINT "Personnels_id_compagnie_fkey" FOREIGN KEY (id_compagnie) REFERENCES public."Compagnies"(id_compagnie) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4788 (class 2606 OID 443948)
-- Name: Personnels Personnels_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Personnels"
    ADD CONSTRAINT "Personnels_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4776 (class 2606 OID 443849)
-- Name: Sinistres Sinistres_id_dossier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sinistres"
    ADD CONSTRAINT "Sinistres_id_dossier_fkey" FOREIGN KEY (id_dossier) REFERENCES public."Dossiers"(id_dossier) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4777 (class 2606 OID 443854)
-- Name: Sinistres Sinistres_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sinistres"
    ADD CONSTRAINT "Sinistres_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public."Utilisateurs"(id_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4794 (class 2606 OID 444007)
-- Name: Transactions_Bancaires Transactions_Bancaires_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions_Bancaires"
    ADD CONSTRAINT "Transactions_Bancaires_id_client_fkey" FOREIGN KEY (id_client) REFERENCES public."Clients"(id_client) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4772 (class 2606 OID 443794)
-- Name: Utilisateurs Utilisateurs_id_compagnie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_id_compagnie_fkey" FOREIGN KEY (id_compagnie) REFERENCES public."Compagnies"(id_compagnie) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4773 (class 2606 OID 443799)
-- Name: Utilisateurs Utilisateurs_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_id_role_fkey" FOREIGN KEY (id_role) REFERENCES public."Roles"(id_role) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-06-27 09:25:24

--
-- PostgreSQL database dump complete
--

