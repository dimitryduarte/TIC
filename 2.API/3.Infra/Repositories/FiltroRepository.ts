import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import FiltroDto from "../../2.Domain/Filtro/Dtos/FiltroDto";

export default class FiltroRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idFiltro: number): Promise<ReturnMessage<FiltroDto>>
    {
        await this.addProcedure("PR_FiltroGet");
        await this.addParameter([
            idFiltro ? idFiltro : null
        ]);

        return await this.executeQuery<FiltroDto>();
    }

    public async Post(dto: FiltroDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_FiltroPost");
        await this.addParameter([
            dto.id_contato,
            dto.id_empresa ? dto.id_empresa : null,
            dto.id_tipo_oportunidade ? dto.id_tipo_oportunidade : null,
            dto.num_remuneracao_max,
            dto.num_remuneracao_min
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: FiltroDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_FiltroPut");
        await this.addParameter([
            dto.id_filtro,
            dto.id_contato,
            dto.id_empresa ? dto.id_empresa : null,
            dto.id_tipo_oportunidade ? dto.id_tipo_oportunidade : null,
            dto.num_remuneracao_max,
            dto.num_remuneracao_min
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idFiltro: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_FiltroDelete");
        await this.addParameter([ idFiltro ]);

        return await this.executeNonQuery();
    }
}
