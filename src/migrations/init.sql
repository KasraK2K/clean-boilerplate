--======================================================================================================
--                                                                                                      
--  #####    ####           ####   #####   ###    ###  ###    ###    ###    ##     ##  ####     ####  
--  ##  ##  ##             ##     ##   ##  ## #  # ##  ## #  # ##   ## ##   ####   ##  ##  ##  ##     
--  #####   ##  ###        ##     ##   ##  ##  ##  ##  ##  ##  ##  ##   ##  ##  ## ##  ##  ##   ###   
--  ##      ##   ##        ##     ##   ##  ##      ##  ##      ##  #######  ##    ###  ##  ##     ##  
--  ##       ####           ####   #####   ##      ##  ##      ##  ##   ##  ##     ##  ####    ####   
--                                                                                                      
--======================================================================================================


CREATE DATABASE <db_name>;

GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <db_username>;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.trg_timestamp()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
  AS $BODY$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
    $BODY$;

ALTER FUNCTION public.trg_timestamp()
  OWNER TO postgres;