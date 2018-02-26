describe("isValidCard", () => {
  it("tarjeta válida", () => {
    expect(isValidCard('4416751039557911')).toEqual(true);
  });
});
