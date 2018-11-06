import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import FiltroDto from "../../2.Domain/Filtro/Dtos/FiltroDto";
import FiltroService from "../../2.Domain/Filtro/FiltroService";

export default class FiltroController
{
    public async Get(dto: FiltroDto): Promise<ReturnMessage<ReturnResultDB<FiltroDto[]>>>
    {
        return await new FiltroService().Get(dto);
    }

    public async Post(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        return await new FiltroService().Post(dto);
    }

    public async Put(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        return await new FiltroService().Put(dto);
    }

    public async Delete(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        return await new FiltroService().Delete(dto);
    }
}
