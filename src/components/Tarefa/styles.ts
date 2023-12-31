import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

import * as enums from '../../utils/enums/Tarefa'
import { Botao } from '../../styles'

type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  parametro: 'status' | 'prioridade'
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.parametro === 'prioridade') {
    if (props.prioridade === enums.Prioridade.FAVORITO) return variaveis.amarelo
    return variaveis.verde
  } else {
    if (props.status === enums.Status.DESBLOQUEADO) return variaveis.verde
    if (props.status === enums.Status.BLOQUEADO) return variaveis.vermelho
  }
  return '#ccc'
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-itens: center;
    margin-bottom: 16px;
  }
`

export const Titulo = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
  line-height: 24px;
`

export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  background-color: ${(props) => retornaCorDeFundo(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
  margin-bottom: 12px;
`

export const Descricao = styled.textarea`
  color: #8b8b8b8;
  font-size: 14px;
  line-height: 24px;
  font-famaly: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const Infos = styled.textarea`
  color: #8b8b8b8;
  font-size: 14px;
  font-famaly: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  resize: none;
  border: none;
  background-color: transparent;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
`

export const BotaoCancelarRemover = styled(Botao)`
  background-color: ${variaveis.vermelho};
`
