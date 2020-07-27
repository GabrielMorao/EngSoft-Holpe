/// <reference types="Cypress" />

describe('Tests - Succeed to register Volunteer', () => {

    beforeEach(() => {
        min = Math.ceil(1);
        max = Math.floor(100000)
        let count = Math.floor(Math.random() * (100000 - 1))  + 1;
        cy.visit('http://localhost:1234/')
      })

    it('Access Volunteer Register page from the Login page', () =>{
        cy.contains('LOGIN').click()
        cy.contains('cadastre-se').click()
    })

    it('Access Volunteer Register page from Home page', () =>{
        cy.get('.MuiButton-containedPrimary > .MuiButton-label > .MuiGrid-container > .MuiGrid-grid-xs-12').click()
    })

    it('Fill form and register with success', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/volunteer"]').click()

        cy.get('#name').type('Nome'+count)

        cy.get('#email').type('teste'+count+'@testes.com') 
        
        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Cadastrado com sucesso!')
        cy.get('svg').click()
        cy.get('.Toastify__toast-body').should('not.exist')
        cy.contains('Help with Hope')
    })
})