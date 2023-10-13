import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type ContatoState = {
  itens: Contato[]
}

const initialState: ContatoState = {
  itens: []
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoContato = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLowerCase()
      )

      if (contatoExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimaContato = state.itens[state.itens.length - 1]
        const contatoNovo = {
          ...action.payload,
          id: ultimaContato ? ultimaContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDoContato = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato].status = action.payload.finalizado
          ? enums.Status.BLOQUEADO
          : enums.Status.DESBLOQUEADO
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } =
  contatosSlice.actions

export default contatosSlice.reducer
