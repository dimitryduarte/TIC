import ReturnMessage from "../Commom/ReturnMessage";
import EmailContatoDto from "./Dtos/EmailContatoDto";
import EmailContatoRepository from "../../3.Infra/Repositories/EmailContatoRepository";

export default class EmailContatoService
{
    public async Get(dto: EmailContatoDto): Promise<ReturnMessage<EmailContatoDto>>
    {
        if(dto.isValid("GET").Content)
            return await new EmailContatoRepository().Get(dto.id_contato, dto.id_email);
        
        return new ReturnMessage<EmailContatoDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            if (dto.id_email != 0)
                await this.Delete(dto);
            
            return await new EmailContatoRepository().Post(dto);
        }
        
        return valid;
    }

    public async Delete(dto: EmailContatoDto, isPost: boolean = false): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
        {
            if (!isPost)
            {
                let rEmail = await this.Get(dto);
                if(rEmail.List.length < 2)
                    return new ReturnMessage<null>(400, "O Contato deve possuir ao menos um E-mail cadastrado", false);
            }

            return await new EmailContatoRepository().Delete(dto.id_email);
        }

        return valid;
    }
}
