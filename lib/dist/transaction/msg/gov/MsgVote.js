"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgVote = exports.VoteOption = void 0;
var long_1 = __importDefault(require("long"));
var ow_1 = __importDefault(require("ow"));
var address_1 = require("../../../utils/address");
var typeurl_1 = require("../../common/constants/typeurl");
var ow_types_1 = require("../ow.types");
var VoteOption;
(function (VoteOption) {
    VoteOption[VoteOption["VOTE_OPTION_UNSPECIFIED"] = 0] = "VOTE_OPTION_UNSPECIFIED";
    VoteOption[VoteOption["VOTE_OPTION_YES"] = 1] = "VOTE_OPTION_YES";
    VoteOption[VoteOption["VOTE_OPTION_ABSTAIN"] = 2] = "VOTE_OPTION_ABSTAIN";
    VoteOption[VoteOption["VOTE_OPTION_NO"] = 3] = "VOTE_OPTION_NO";
    VoteOption[VoteOption["VOTE_OPTION_NO_WITH_VETO"] = 4] = "VOTE_OPTION_NO_WITH_VETO";
})(VoteOption = exports.VoteOption || (exports.VoteOption = {}));
exports.msgVote = function (config) {
    return (function () {
        function MsgVote(options) {
            ow_1.default(options, 'options', ow_types_1.owMsgVoteOptions);
            this.proposalId = options.proposalId;
            this.voter = options.voter;
            this.option = options.option;
            this.validate();
        }
        MsgVote.prototype.toRawAminoMsg = function () {
            throw new Error('Method not implemented.');
        };
        MsgVote.prototype.toRawMsg = function () {
            var proposal = long_1.default.fromNumber(this.proposalId.toNumber(), true);
            return {
                typeUrl: typeurl_1.COSMOS_MSG_TYPEURL.MsgVote,
                value: {
                    proposalId: proposal,
                    voter: this.voter,
                    option: this.option,
                },
            };
        };
        MsgVote.prototype.validate = function () {
            if (!address_1.validateAddress({
                address: this.voter,
                network: config.network,
                type: address_1.AddressType.USER,
            })) {
                throw new TypeError('Provided `voter` doesnt match network selected');
            }
        };
        return MsgVote;
    }());
};
//# sourceMappingURL=MsgVote.js.map