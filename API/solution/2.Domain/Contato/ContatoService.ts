import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import ContatoDto from "./Dtos/ContatoDto";
import TelefoneContatoService from "../TelefoneContato/TelefoneContatoService";
import EmailContatoService from "../EmailContato/EmailContatoService";
import ContatoRepository from "../../3.Infra/Repositories/ContatoRepository";
import EmailContatoDto from "../EmailContato/Dtos/EmailContatoDto";
import TelefoneContatoDto from "../TelefoneContato/Dtos/TelefoneContatoDto";

export default class ContatoService
{
    public async Get(dto: ContatoDto): Promise<ReturnMessage<ReturnResultDB<ContatoDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new ContatoRepository().Get(dto.id_contato);

        return new ReturnMessage<ReturnResultDB<ContatoDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<ContatoDto[]>([]));
    }

    public async Post(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if (!valid.Content)
            return valid;

        // Salva Informações Básicas do Contato
        let rContato = await new ContatoRepository().Post(dto);     
        if (!rContato.Content)
            return rContato;

        return await this.SaveAnotherInfo(dto);
    }

    public async Put(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if (!valid.Content)
            return valid;

        // Salva Informações Básicas do Contato
        let rContato = await new ContatoRepository().Put(dto);    
        if (!rContato.Content)
            return rContato;

        return await this.SaveAnotherInfo(dto);
    }

    public async Delete(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new ContatoRepository().Delete(dto.id_contato);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }

    private async SaveAnotherInfo(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        // Salva Email do Contato
        for (let i = 0; i < dto.emailContato.length; i++)
        {
            let email: EmailContatoDto =  new EmailContatoDto();

            Object.assign(email, dto.emailContato[i]);
            email.id_contato = dto.id_contato;

            let rEmail = await new EmailContatoService().Post(email);

            if (!rEmail.Content)
                return rEmail;
        }

        // Salva Telefone do Contato
        for (let i = 0; i < dto.telefoneContato.length; i++)
        {
            let telefone: TelefoneContatoDto =  new TelefoneContatoDto();

            Object.assign(telefone, dto.telefoneContato[i]);
            telefone.id_contato = dto.id_contato;
            
            let rTelefone = await new TelefoneContatoService().Post(telefone);

            if (!rTelefone.Content)
                return rTelefone;
        }

        return new ReturnMessage<boolean>(200, "SUCESSO !!!", true);
    }
}
