import ReturnMessage from "../../Commom/ReturnMessage";

export default class OportunidadeDto
{
    public id_oportunidade: number;
    public id_empresa: number;
    public id_tipo_oportunidade: number;
    public mon_remuneracao: number;
    public str_descricao: string;
    public dat_inicio: Date;
    public dat_fim: Date;
    public fg_supervisionado: boolean;
    public fg_status: boolean;
    
    private returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_oportunidade = 0;
        this.id_empresa = 0;
        this.id_tipo_oportunidade = 0;
        this.mon_remuneracao = 0;
        this.str_descricao = "";
        this.dat_inicio = new Date();
        this.dat_fim = new Date();
        this.fg_supervisionado = false;
        this.fg_status = false;
    }

    public isValid(isGet: boolean = false): ReturnMessage<boolean>
    {
        !isNaN(parseInt(`${this.id_oportunidade}`))
        ? this.id_oportunidade = parseInt(`${this.id_oportunidade}`)
        : this.id_oportunidade = 0;
        
        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.id_tipo_oportunidade}`))
        ? this.id_tipo_oportunidade = parseInt(`${this.id_tipo_oportunidade}`)
        : this.id_tipo_oportunidade = 0;

        this.mon_remuneracao
        ? this.mon_remuneracao = this.mon_remuneracao
        : this.mon_remuneracao = 0;

        !this.dat_inicio
        ? this.dat_inicio = new Date(this.dat_inicio)
        : this.dat_inicio = new Date("01/01/2000");

        !this.dat_fim
        ? this.dat_fim = new Date(this.dat_fim)
        : this.dat_fim = new Date("01/01/2000");

        this.fg_supervisionado
        ? this.fg_supervisionado = true
        : this.fg_supervisionado = false;

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;
        
        if(!isGet)
        {
            if(this.id_empresa == 0) 
                this.returnMessage.updateStatus(400, "Identificador da Empresa Inválido", false);

            if(this.id_tipo_oportunidade == 0)
                this.returnMessage.updateStatus(400, "Identificador do Tipo de Oportunidade Inválido", false);
            
            if(this.mon_remuneracao == 0)
                this.returnMessage.updateStatus(400, "Valor Remuneração Inválido", false);

            if(!this.str_descricao) 
                this.returnMessage.updateStatus(400, "Descrição Inválida", false);
        }

        return this.returnMessage;
    }
}
