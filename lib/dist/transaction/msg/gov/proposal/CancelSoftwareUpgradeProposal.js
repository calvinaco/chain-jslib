"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSoftwareUpgradeProposal = void 0;
var ow_1 = __importDefault(require("ow"));
var codec_1 = require("../../../../cosmos/v1beta1/codec");
var ow_types_1 = require("../ow.types");
var typeurl_1 = require("../../../common/constants/typeurl");
exports.cancelSoftwareUpgradeProposal = function () {
    return (function () {
        function CancelSoftwareUpgradeProposal(options) {
            ow_1.default(options, 'options', ow_types_1.owCancelSoftwareUpgradeProposalOptions);
            this.title = options.title;
            this.description = options.description;
        }
        CancelSoftwareUpgradeProposal.prototype.getEncoded = function () {
            var cancelProposalOptions = {
                title: this.title,
                description: this.description,
            };
            var cancelProposal = codec_1.cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal.create(cancelProposalOptions);
            return codec_1.google.protobuf.Any.create({
                type_url: typeurl_1.COSMOS_MSG_TYPEURL.upgrade.CancelSoftwareUpgradeProposal,
                value: codec_1.cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal.encode(cancelProposal).finish(),
            });
        };
        return CancelSoftwareUpgradeProposal;
    }());
};
//# sourceMappingURL=CancelSoftwareUpgradeProposal.js.map