import Big from 'big.js';
import { InitConfigurations } from '../../../core/cro';
import { Msg } from '../../../cosmos/v1beta1/types/msg';
import * as legacyAmino from '../../../cosmos/amino';
export declare enum VoteOption {
    VOTE_OPTION_UNSPECIFIED = 0,
    VOTE_OPTION_YES = 1,
    VOTE_OPTION_ABSTAIN = 2,
    VOTE_OPTION_NO = 3,
    VOTE_OPTION_NO_WITH_VETO = 4
}
export declare const msgVote: (config: InitConfigurations) => {
    new (options: MsgVoteOptions): {
        proposalId: Big;
        voter: string;
        option: VoteOption;
        toRawAminoMsg(): legacyAmino.Msg;
        toRawMsg(): Msg;
        validate(): void;
    };
};
export declare type MsgVoteOptions = {
    proposalId: Big;
    voter: string;
    option: VoteOption;
};
//# sourceMappingURL=MsgVote.d.ts.map