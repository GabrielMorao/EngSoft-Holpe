// <reference types="Cypress" />

describe('Tests - Logoff', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })


    it('Access Login Page, succeed to Login and then Logout', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testes.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Autenticado com sucesso!')
        cy.get('svg').click()
        cy.get('.Toastify__toast-body').should('not.exist')
        cy.wait(100)
        cy.get('.event-header').should("have.text", "Trabalhos") //Verify if it's in Trabalho's page
        cy.get('.MuiIconButton-label > .MuiSvgIcon-root').click() //User Icon
        cy.get('.MuiList-root > :nth-child(4)').should("have.text", "Sair")
        cy.get('.MuiList-root > :nth-child(4)').click();
        cy.contains('LOGIN')
    })
})