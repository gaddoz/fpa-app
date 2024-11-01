
describe('user uppa, email to confirm, edit profile', () => {
  // note: full reset db to access auth.users email to reset the confirmed state, 
  // a little bit too much, looking for a quicker solution.
  // in the while you can use skip() tests until the desired stage (dev mode).
  before(() => {
    cy.exec("npx supabase db reset");
  });

  beforeEach(() => {
    cy.intercept('GET', '/en/user-profile/update?**').as('formSubmit');
  });

  it('user uppa logs in, confirm email, edit profile with empty fields', () => {
    cy.visit('/');
    cy.contains('a', "Login").click();
    cy.contains('label', "Email").click();
    cy.findByLabelText("Email").type("uppa@fpa.com");
    cy.findByLabelText("Password").type("123456");
    cy.findByRole('button', "Sign In").click();

    cy.contains("Complete your profile information to be able to create and attend to events.").should('be.visible');
    cy.contains("Events").click();
    cy.contains("Complete your profile information to be able to create and attend to events.").should('be.visible')
    cy.contains('a', "Finalise").click();

    cy.contains("h3","Avatar").should("be.visible");
    cy.contains("label","Current Avatar:").should("be.visible");

    cy.findByLabelText("First Name").clear();
    cy.findByLabelText("Last Name").clear();

    cy.contains('button', "Update user Profile").click();
    cy.findByLabelText("First Name").should("have.focus");
  });

  it('user uppa logs in, confirm email, edit profile with only first and last name', () => {
    cy.visit('/');
    cy.contains('a', "Login").click();
    cy.findByLabelText("Email").type("uppa@fpa.com");
    cy.findByLabelText("Password").type("123456");
    cy.findByRole('button', "Sign In").click();

    cy.contains("Complete your profile information to be able to create and attend to events.").should('be.visible');
    cy.contains('a', "Finalise").click();
    cy.contains("h3","Avatar").should("be.visible");
    cy.contains("label","Current Avatar:").should("be.visible");

    cy.findByLabelText("First Name").type("Uppa edited");
    cy.findByLabelText("Last Name").type("Lastname edited");
    cy.contains('button', "Update user Profile").click();

    cy.findByLabelText("Date of birth").should("have.focus");
    // cy.wait('@formSubmit').should("not.have.been.calledBefore");
  });

  it('user uppa logs in, confirm email, edit profile', () => {
    cy.visit('/');
    cy.contains('a', "Login").click();
    cy.contains('label', "Email").click();
    cy.findByLabelText("Email").type("uppa@fpa.com");
    cy.findByLabelText("Password").type("123456");
    cy.findByRole('button', {text:"Sign In"}).click();

    cy.contains("Complete your profile information to be able to create and attend to events.").should('be.visible');
    cy.contains('a', "Finalise").click();
    cy.contains("h3","Avatar").should("be.visible");
    cy.contains("label","Current Avatar:").should("be.visible");

    cy.findByLabelText("First Name").clear().type("Uppa edited 1");
    cy.findByLabelText("Last Name").clear().type("Lastname edited 1");
    cy.findByLabelText("Date of birth").type("2000-02-02",{force:true});
    cy.contains('button', "Update user Profile").click();

    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);
    cy.contains("Username: Uppa edited 1").should("be.visible");
  });

  it('user uppa logs in, email is confirmed, edit profile', () => {
    cy.visit('/');
    cy.contains('a', "Login").click();
    cy.contains('label', "Email").click();
    cy.findByLabelText("Email").type("uppa@fpa.com");
    cy.findByLabelText("Password").type("123456");
    cy.findByRole('button', {text:"Sign In"}).click();

    cy.findByRole('img', {alt:"avatar"}).click();
    cy.contains("Update Profile").click();
    cy.contains("label","Avatar").should("be.visible")

    cy.findByLabelText("First Name").clear().type("Uppa edited 3");
    cy.findByLabelText("Last Name").clear().type("Lastname edited 3");
    cy.findByLabelText("Date of birth").type("2000-02-02",{force:true});
    cy.contains('button', "Update user Profile").click();

    cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);
    cy.contains("Username: Uppa edited 3").should("be.visible");
  });
})