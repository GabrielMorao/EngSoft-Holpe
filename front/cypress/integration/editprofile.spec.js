/// <reference types="Cypress" />

describe('Tests - Accessing Home, Sobre, Trabahlos e Contato', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

      it.only('Make login and acess the page', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testes.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Autenticado com sucesso!')
        cy.get('svg').click()
        cy.get('.Toastify__toast-body').should('not.exist')
        cy.wait(100)
        cy.get('.MuiIconButton-label > .MuiSvgIcon-root').click() //User Icon
        cy.get('.MuiList-root > :nth-child(3)').should("have.text", "Editar Perfil")
            .click()

        cy.contains('Configurações da Conta')
    //    cy.get('#name').type('Empresa')
     //   cy.get('#email').type('empresa@teste.com.br')
       // cy.get('#whatsapp').type('16912345678')
    //    cy.get('#instagram').type('www.instagram.com')
    //    cy.get('#facebook').type('www.facebook.com')
    //    cy.get(':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').type('Lore')
    //    cy.get('.MuiGrid-grid-sm-7 > .MuiFormControl-root > .MuiInputBase-root > #street').type('Rua X')
    //    cy.get('#number').type('3')
    //    cy.get('#complement').type('3')
    //    cy.get('#postal').type('1233456789')
    //    cy.get('#city').type('Cidade')
    //    cy.get('#uf').type('SP')
    //    cy.get('#cpf').type('2183812829') //CNPJ
        cy.get('.MuiAvatar-root')
        cy.get(':nth-child(4) > .MuiGrid-container > .MuiButtonBase-root > .MuiButton-label') //Botão editar Perfil
    })
})