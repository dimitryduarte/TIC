import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import CandidaturaDto from "../../2.Domain/Candidatura/Dtos/CandidaturaDto";

export default class CandidaturaRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idOportunidade: number, idContato: number ,idCandidatura: number): Promise<ReturnMessage<CandidaturaDto>>
    {
        await this.addProcedure("PR_CandidaturaGet");
        await this.addParameter([
            idOportunidade ? idOportunidade : null,
            idContato ? idContato : null,
            idCandidatura ? idCandidatura : null
        ]);

        return await this.executeQuery<CandidaturaDto>();
    }

    public async Post(dto: CandidaturaDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_CandidaturaPost");
        await this.addParameter([ 
            dto.id_oportunidade,            
            dto.id_contato
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idCandidatura: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_CandidaturaDelete");
        await this.addParameter([ idCandidatura ]);

        return await this.executeNonQuery();
    }
}
