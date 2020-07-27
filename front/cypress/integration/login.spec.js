/// <reference types="Cypress" />

describe('Tests - Login', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

    it('Access website and verify title', () =>{
        cy.title().should('be.equal', 'HOLPE')
        cy.contains('Help with Hope')
    })

    it('Access Login Page and fail to Login. Error message closes when X is clicked', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testess.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('have.text', 'Email ou senha inválidos.')
        cy.get('svg').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('not.exist')
    })

    it('Access Login Page and fail to Login. Error message closes when going to another page', () =>{

        //Trabalhos
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testess.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('have.text', 'Email ou senha inválidos.')
        cy.wait(2000)
        cy.contains('Trabalhos').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('not.exist')

        //Home
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testess.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('have.text', 'Email ou senha inválidos.')
        cy.wait(2000)
        cy.contains('Home').click()
        cy.get('#1.Toastify__toast.Toastify__toast--error.toaster-error').should('not.exist')
    })

    it.only('Access Login Page and succeed  to Login', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('teste@testes.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
       // cy.get('.Toastify__toast-body').should('have.text','Autenticado com sucesso!')
      //  cy.get('svg').click()
      //  cy.get('.Toastify__toast-body').should('not.exist')
        cy.wait(100)
        cy.get('.event-header').should("have.text", "Trabalhos") //Verify if it's in Trabalho's page
        cy.get('.MuiIconButton-label > .MuiSvgIcon-root') //User Icon
    })

})