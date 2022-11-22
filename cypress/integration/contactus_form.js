/// <reference types="Cypress" />

describe('Verify contact us functionality', function(){

    before(function(){
        cy.fixture('contactus_testdata').then(function(data){
            this.data = data;
        })
    })
    beforeEach(function(){
        cy.visit(Cypress.env('url'));
    })

    it('is verifying that user is able to send message after fill all the fields', function(){
        cy.get('input[name="firstname"]').type(this.data.FirstName);
        cy.get('input[name="lastname"]').type(this.data.LastName);
        cy.get('input[name="email"]').type(this.data.Email);
        cy.get('input[name="mobilephone"]').type(this.data.MobilePhone);
        cy.get('select[name="how_did_you_hear_about_us_"]').select(this.data.HowDidYouHearAboutUs);
        cy.get('textarea[name="message"]').type(this.data.Message);
        cy.get('input[type="submit"]').click();
        cy.clickRecaptcha();
        //cy.get('.hbspt-form>div>p').should('be.visible').should('have.text',this.data.SuccessMsg);
    })

    it('is verifying that validation message is showing with blank field', function(){
        cy.get('input[type="submit"]').click();
        cy.get('li>.hs-error-msg').should('have.length', 5).each(function($el, index, $list){
            cy.wrap($el).should('have.text', 'Please complete this required field.');
        })
    })
})