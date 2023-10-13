import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { remover, editar } from '../../store/reducers/tarefas'
import ContatoClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/Tarefa'

type Props = ContatoClass

const Contato = ({
  nome: nomeOriginal,
  email: emailOriginal,
  numero: numeroOriginal,
  prioridade,
  status: statusOriginal,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [editado, setEditado] = useState(false)
  const [descricao, setDescricao] = useState('')
  const [email, setEmail] = useState('')
  const [numero, setNumero] = useState(numeroOriginal)
  const [nome, setNome] = useState(nomeOriginal)
  const [status, setStatus] = useState(statusOriginal)

  useEffect(() => {
    if (
      descricaoOriginal.length > 0 &&
      emailOriginal.length > 0 &&
      numeroOriginal.length > 0 &&
      nomeOriginal.length > 0
    ) {
      setDescricao(descricaoOriginal)
      setEmail(emailOriginal)
      setNumero(numeroOriginal)
      setNome(numeroOriginal)
    }
  }, [descricaoOriginal, emailOriginal, numeroOriginal, nomeOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
    setEmail(emailOriginal)
    setNumero(numeroOriginal)
    setStatus(statusOriginal || enums.Status.DESBLOQUEADO)
    setNome(nomeOriginal)
  }

  function bloquearContato() {
    setStatus(enums.Status.BLOQUEADO)
    setEditado(true)
  }

  return (
    <S.Card>
      <label htmlFor={nome}>
        <S.Titulo>
          Nome: {nome} <br />
          E-mail: {email} <br />
          Nome: {numero}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <div>
        <label htmlFor={`descricao-${nome}`}>Descrição:</label>
        <S.Infos
          id={`descricao-${nome}`}
          disabled={!estaEditando}
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
        />
      </div>
      {estaEditando && (
        <>
          <div>
            <label htmlFor={`nome-${nome}`}>Nome:</label>
            <S.Infos
              id={`nome-${nome}`}
              disabled={!estaEditando}
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`email-${nome}`}>E-mail:</label>
            <S.Infos
              id={`email-${nome}`}
              disabled={!estaEditando}
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`numero-${nome}`}>Número:</label>
            <S.Infos
              id={`numero-${nome}`}
              disabled={!estaEditando}
              value={numero}
              onChange={(evento) => setNumero(evento.target.value)}
            />
          </div>
        </>
      )}

      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    nome,
                    email,
                    numero,
                    prioridade,
                    status,
                    descricao,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
            {!editado && <Botao onClick={bloquearContato}>Bloquear</Botao>}
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contato
