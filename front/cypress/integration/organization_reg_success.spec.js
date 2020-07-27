/// <reference types="Cypress" />

describe('Tests - Succeed to register Organization', () => {

    beforeEach(() => {
        min = Math.ceil(1);
        max = Math.floor(100000)
        mincnpj = Math.ceil(11111111111);
        maxcnpj = Math.floor(99999999999)
        minphone = Math.ceil(11111111);
        maxphone = Math.floor(99999999)
        let count = Math.floor(Math.random() * (max - min))  + max;
        let ncpnj = Math.floor(Math.random() * (maxcnpj - mincnpj))  + mincnpj;
        let nphone = Math.floor(Math.random() * (maxphone - minphone))  + minphone;
        cy.visit('http://localhost:1234/')
      })

    it('Access Organization Register page from the Login page', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()
    })

    it('Access Organization Register page from Home page', () =>{
        cy.get('.MuiButton-containedSecondary > .MuiButton-label > .MuiGrid-container > .MuiGrid-grid-xs-12').click()
    })

    it.only('Fill form and move between pages: info should stay there', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong'+count)

        cy.get('#cnpj').type(ncnpj)

        cy.get('#email').type('ong'+count+'@testesong.com')
        
        cy.get('#telephone').type(nphone)

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()  //Muda para segunda página

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click() //Muda para a terceira página

        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")

        cy.get('.MuiPaper-root > [tabindex="0"] > .MuiButton-label').click() //Volta para a segunda página
        cy.get('#adress').should('have.value', 'Rua das flores')
        cy.get('#number').should('have.value', '123')
        cy.get('#complement').should('have.value', 'Bloco A')
        cy.get('#city').should('have.value', 'Sorocaba')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(1) > .MuiButton-label').click() //Volta para a primeira página
        cy.get('#name').should('have.value', 'Ong02')
        cy.get('#cnpj').should('have.value', '17828281821')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click() //Volta para a segunda página
        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click() //Volta para a terceira página
        cy.get('#password').should('have.value', "123")
        cy.get('#password-confirm').should('have.value', "123")
    })

    it('Fill form and sign up siwth success', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Cadastrado com sucesso!')
        cy.get('.Toastify__close-button > svg').click()
        cy.get('.Toastify__toast-body').should('not.exist')
        cy.contains('Help with Hope')
    })

   
})
