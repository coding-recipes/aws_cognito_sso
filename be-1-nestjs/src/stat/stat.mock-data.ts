import { randomInt } from 'crypto';
import { Stat } from './stat.entity';

function* sequenceGenerator(): Generator<number> {
  let index = 1;
  while (true) {
    yield index++;
  }
}

const sequence = sequenceGenerator();

const generateStat = (kpi: string, year: number, month: number, mult: number = 1): Stat => {
  const id = sequence.next().value
  const period = "" + year + month.toString().padStart(2, '0');
  const value = randomInt(1000, 2000) * mult;
  const createdDate = new Date()
  const modifiedDate = new Date()
  const stat = Stat.create({ id, kpi, period, year, month, value, createdDate, modifiedDate })
  return stat
}

export const generateMockStats = (): Stat[] => {
  const data: Stat[] = [];

  ["sales", "cost", "reveue"].forEach(kpi => {
    const mult = randomInt(2, 10);
    [2019, 2020, 2021].forEach(year => {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(month => {
        data.push(generateStat(kpi, year, month, mult))
      })
    })
  })

  return data
}