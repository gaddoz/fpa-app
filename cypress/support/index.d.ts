declare namespace Cypress {
    interface Chainable {
      findByLabelText(
        label: string,
        options?: Partial<FindByOptions>
      ): Chainable<JQuery<HTMLElement>>;
  
      findByRole(
        role: string,
        options?: Partial<FindByOptions>
      ): Chainable<JQuery<HTMLElement>>;
  
      findByText(
        text: string | RegExp,
        options?: Partial<FindByOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
}
