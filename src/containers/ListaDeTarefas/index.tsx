import { useSelector } from 'react-redux'

import Contato from '../../components/Tarefa'
import { MainContainer, Nome } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeContato = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraContatos = () => {
    let contatosFiltrados = itens
    if (termo !== undefined) {
      contatosFiltrados = contatosFiltrados.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        contatosFiltrados = contatosFiltrados.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        contatosFiltrados = contatosFiltrados.filter(
          (item) => item.status === valor
        )
      }

      return contatosFiltrados
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo?.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} contato(s) encontrado(s) como: todos ${complementacao}`
    } else {
      mensagem = `${quantidade} contato(s) encontrado(s) como: "${`${criterio} = ${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const contatos = filtraContatos()
  const mensagem = exibeResultadoFiltragem(contatos.length)

  return (
    <MainContainer>
      <Nome as="p">{mensagem}</Nome>
      <ul>
        {contatos.map((t) => (
          <li key={t.nome}>
            <Contato
              id={t.id}
              email={t.email}
              numero={t.numero}
              nome={t.nome}
              descricao={t.descricao}
              prioridade={t.prioridade}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeContato
