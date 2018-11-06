import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TelefoneEmpresaDto from "../../2.Domain/TelefoneEmpresa/Dtos/TelefoneEmpresaDto";
import TelefoneEmpresaService from "../../2.Domain/TelefoneEmpresa/TelefoneEmpresaService";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";

export default class TelefoneEmpresaController
{
    public async Get(dto: TelefoneEmpresaDto): Promise<ReturnMessage<ReturnResultDB<TelefoneEmpresaDto[]>>>
    {
        return await new TelefoneEmpresaService().Get(dto);
    }

    public async Post(dto: TelefoneEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new TelefoneEmpresaService().Post(dto);
    }

    public async Delete(dto: TelefoneEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new TelefoneEmpresaService().Delete(dto);
    }   
}
