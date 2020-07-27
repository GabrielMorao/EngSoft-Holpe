const signUp = (name) => {
  return {
    subject: 'Bem-vindx ao Holpe',
    text: name ? `Olá ${name}, seu cadastro foi efetuado com sucesso` : `Olá, seu cadastro foi efetuado com sucesso!`
  }
}

const applyEventVolunteer = (name, initialDate, finalDate) => {
  return {
    subject: 'Inscrição confirmada!',
    text: `Olá, seu cadastro no evento ${name} foi efetuado com sucesso. Não se esqueça que ele acontecerá no dia ${initialDate} e irá até ${finalDate}`
  }
}

const applyEventSolicitant = (name) => {
  return {
    subject: 'Nova inscrição!',
    text: `Olá, alguém se inscreveu no ${name}. Acesse nossa plataforma para mais detalhes!`
  }
}

const unapplyEventVolunteer = (name) => {
  return {
    subject: 'Inscrição retirada!',
    text: `Olá, seu cadastro no evento ${name} foi removido com sucesso.`
  }
}

const unapplyEventtSolicitant = (name) => {
  return {
    subject: 'Desinscrição :(',
    text: `Olá, alguém se desinscreveu do evento ${name}. Acesse nossa plataforma para mais detalhes!`
  }
}

module.exports = {
  signUp,
  applyEventVolunteer,
  unapplyEventVolunteer,
  unapplyEventtSolicitant,
  applyEventSolicitant
}