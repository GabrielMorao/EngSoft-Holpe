/// <reference types="Cypress" />

describe('Tests - Fail to register Volunteer', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

    it('Access Volunteer Register page from Home page', () =>{
        cy.get('.MuiButton-containedPrimary > .MuiButton-label > .MuiGrid-container > .MuiGrid-grid-xs-12').click()
    })

    it('Fill form and do not register with success. Error message for already registered user', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/volunteer"]').click()

        cy.get('#name').type('Alberto')
        cy.get('#name').should('have.value', 'Alberto')

        cy.get('#email').type('teste@testes.com')
        cy.get('#email').should('have.value', "teste@testes.com")
        
        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Usuário já cadastrado!')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without email. Error message for email', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/volunteer"]').click()

        cy.get('#name').type('Alberto')
        cy.get('#name').should('have.value', 'Alberto')
        
        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Todos os campos são obrigatórios!')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without password. Error message for password', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/volunteer"]').click()

        cy.get('#name').type('Alberto')
        cy.get('#name').should('have.value', 'Alberto')
        
        cy.get('#email').type('teste@testes.com')
        cy.get('#email').should('have.value', "teste@testes.com")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Todos os campos são obrigatórios!')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form with no matching passwords. Error message for matching passwords', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/volunteer"]').click()

        cy.get('#name').type('Alberto')
        cy.get('#name').should('have.value', 'Alberto')

        cy.get('#email').type('teste@testes.com')
        cy.get('#email').should('have.value', "teste@testes.com")
        
        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('1234')
        cy.get('#password-confirm').should('have.value', "1234")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','As senhas estão diferentes.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

})
