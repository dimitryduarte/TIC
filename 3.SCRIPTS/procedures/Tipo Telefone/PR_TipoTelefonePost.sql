CREATE OR REPLACE FUNCTION PR_TipoTelefonePost (
    vStrDescricao TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMensagem TEXT := 'Tipo de Telefone cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
				FROM public."tbTipoTelefone" AS TTEL
				WHERE TTEL.str_descricao = vStrDescricao)
		THEN

			INSERT INTO public."tbTipoTelefone"
				(str_descricao)
				VALUES
					(vStrDescricao);

		ELSE

			vContent := 'false';
			vMensagem := 'Tipo de Telefone já cadastrado';
			
		END IF;
	
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
