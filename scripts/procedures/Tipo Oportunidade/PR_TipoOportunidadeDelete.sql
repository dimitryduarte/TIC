CREATE OR REPLACE FUNCTION PR_TipoOportunidadeDelete (
	vIdTipoOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Tipo de Oportunidade deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoOportunidade" AS TOPOR
                WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
        THEN
        
            UPDATE public."tbTipoOportunidade"
                SET fg_status = 'false'
                WHERE id_tipo_oportunidade = vIdTipoOportunidade;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Tipo de Oportunidade não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
