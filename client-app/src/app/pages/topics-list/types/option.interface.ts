import { Voter } from './voter.interface';

export interface Option {
  id: string;
  optionDescription: string;
  voters: Voter[];
}
