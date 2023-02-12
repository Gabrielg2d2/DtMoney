export function make(isEdit = false) {
  const title = isEdit ? 'Editar transação' : 'Cadastrar transação'
  const description = isEdit
    ? 'Edite os dados da transação'
    : 'Insira os dados para nova transação'

  return {
    title,
    description
  }
}
