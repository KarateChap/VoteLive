import { Injectable } from '@angular/core';
import { Option } from '../../pages/topics-list/types/option.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  getTotalVoteCounts(options: Option[]): number {
    return options.reduce((totalVoteCount, option) => {
      return totalVoteCount + option.voters.length;
    }, 0);
  }
}
