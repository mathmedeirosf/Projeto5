import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import ContatoClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/Tarefa'

type Props = ContatoClass

const Contato = ({
  nome,
  email,
  numero,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)

    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={nome}>
        <input
          type="checkbox"
          id={nome}
          checked={status === enums.Status.DESBLOQUEADO}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {nome}
          <br />
          <br />
          {email}
          <br />
          <br />
          {numero}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
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

/*

====== Controlled components ======

[nome, setNome] = useState('')

<input value={nome} onChange={e => setNome{e.target.value}} />

====== Uncontrolled components ======

[nome, setNome] = useState('')

<input onChange={e => setNome{e.target.value}} />

*/
