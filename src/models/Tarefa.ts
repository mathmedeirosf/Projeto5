import * as enums from '../utils/enums/Tarefa'

class Contato {
  nome: string
  email: string
  numero: string
  prioridade: enums.Prioridade
  status: enums.Status
  descricao: string
  id: number

  constructor(
    nome: string,
    email: string,
    numero: string,
    prioridade: enums.Prioridade,
    status: enums.Status,
    descricao: string,
    id: number
  ) {
    ;(this.nome = nome),
      (this.email = email),
      (this.numero = numero),
      (this.prioridade = prioridade),
      (this.status = status),
      (this.descricao = descricao),
      (this.id = id)
  }
}

export default Contato
