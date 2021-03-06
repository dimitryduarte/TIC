import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoTelefoneDto from "../../2.Domain/TipoTelefone/Dtos/TipoTelefoneDto";

export default class TipoTelefoneRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idTipoTelefone: number): Promise<ReturnMessage<TipoTelefoneDto>>
    {
        await this.addProcedure("PR_TipoTelefoneGet");
        await this.addParameter([
            idTipoTelefone ? idTipoTelefone : null
        ]);

        return await this.executeQuery<TipoTelefoneDto>();
    }

    public async Post(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoTelefonePost");
        await this.addParameter([
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoTelefonePut");
        await this.addParameter([
            dto.id_tipo_telefone,
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTipoTelefone: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoTelefoneDelete");
        await this.addParameter([ idTipoTelefone ]);

        return await this.executeNonQuery();
    }
}
