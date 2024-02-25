import { convertNumberToMoney } from '../money';

describe('money', () => {
  it('should return cents', () => {
    const returnValue = convertNumberToMoney(543.43);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('543,43');
  });

  it('should return integer', () => {
    const returnValue = convertNumberToMoney(643);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('643,00');
  });

  it('should return thousand', () => {
    const returnValue = convertNumberToMoney(454674.43);

    expect(returnValue).toContain('R$');
    expect(returnValue).toContain('454.674,43');
  });
});
