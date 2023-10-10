import BarraLateral from '../../containers/BarraLateral'
import Formulario from '../../containers/Formulario'

const Cadastro = () => (
  <>
    {/* Barra lateral */}
    <BarraLateral mostrarFiltros={false} />

    <Formulario />
  </>
)

export default Cadastro
