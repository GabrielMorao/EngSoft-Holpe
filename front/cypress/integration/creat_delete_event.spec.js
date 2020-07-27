/// <reference types="Cypress" />

describe('Tests - Accessing Home, Sobre, Trabahlos e Contato', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

      it('Make login and creat an event', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('ong@testesong.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('.MuiIconButton-label > .MuiSvgIcon-root').click() //User Icon
        cy.get('.MuiList-root > [tabindex="0"]').should("have.text", "Criar Evento")
            .click()


        cy.contains('Criar Evento')
        cy.get('#name').type('Evento Teste')
        cy.get('#vancancies').type('3')
       // cy.get('#whatsapp').type('16912345678')
        cy.get('#facebook').type('htts://www.facebook.com')
        cy.get(':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').type('Lore')
        cy.get('.MuiGrid-grid-sm-7 > .MuiFormControl-root > .MuiInputBase-root > #street').type('Rua X')
        cy.get('#number').type('3')
        cy.get('#complement').type('3')
        cy.get('#postal').type('1233456789')
        cy.get('#city').type('Cidade')
        cy.get('#uf').type('SP')
    })

    it.only('Make login and delete an event', () =>{
        cy.contains('LOGIN').click()
        cy.get('#email').type('ong@testesong.com')
        cy.get('#password').type('123')
        cy.contains('Entrar').click()
        cy.get('.MuiIconButton-label > .MuiSvgIcon-root').click() //User Icon
        cy.contains('Eventos Criados')
            .click()


        cy.contains('SAIBA MAIS').click()
        cy.contains('CANCELAR EVENTO')
     //   cy.get('.MuiGrid-justify-xs-space-between > .MuiGrid-container').contains('.MuiAvatar-root > .MuiSvgIcon-root')
        //    .then(cy.get('.MuiAvatar-root > .MuiSvgIcon-root').click())
       // cy.get('.MuiAvatar-root > .MuiSvgIcon-root').click()
       // cy.contains('REMOVER')
    })
})