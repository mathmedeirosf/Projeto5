import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FiltroCard from '../../components/FiltroCard'
import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { Botao, Campo } from '../../styles'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alteraTermo(evento.target.value))}
            />
            <S.Filtros>
              <FiltroCard
                valor={enums.Status.DESBLOQUEADO}
                criterio="status"
                legenda="desbloqueado"
              />
              <FiltroCard
                valor={enums.Status.BLOQUEADO}
                criterio="status"
                legenda="bloqueado"
              />
              <FiltroCard
                valor={enums.Prioridade.FAVORITO}
                criterio="prioridade"
                legenda="favorito"
              />
              <FiltroCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="normal"
              />
              <FiltroCard criterio="todas" legenda="todos" />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')} type="button">
            Voltar a lista de contatos
          </Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
