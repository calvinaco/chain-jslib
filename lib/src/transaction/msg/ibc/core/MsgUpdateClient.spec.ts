import 'mocha';
import { expect } from 'chai';
import Big from 'big.js';

import { fuzzyDescribe } from '../../../../test/mocha-fuzzy/suite';
import { Msg } from '../../../../cosmos/v1beta1/types/msg';
import { Secp256k1KeyPair } from '../../../../keypair/secp256k1';
import { Bytes } from '../../../../utils/bytes/bytes';
import { CroSDK } from '../../../../core/cro';
import { COSMOS_MSG_TYPEURL } from '../../../common/constants/typeurl';
import { google } from '../../../../cosmos/v1beta1/codec';

const cro = CroSDK({
    network: {
        defaultNodeUrl: '',
        chainId: 'testnet-croeseid-1',
        addressPrefix: 'tcro',
        validatorAddressPrefix: 'tcrocncl',
        validatorPubKeyPrefix: 'tcrocnclconspub',
        coin: {
            baseDenom: 'basetcro',
            croDenom: 'tcro',
        },
        bip44Path: {
            coinType: 1,
            account: 0,
        },
        rpcUrl: '',
    },
});

describe('Testing MsgUpdateClient', function () {
    fuzzyDescribe('should throw Error when options is invalid', function (fuzzy) {
        const anyValidOptions = {
            signer: 'tcro15sfupd26sp6qf37ll5q6xuf330k7df9tnvrqht',
        };

        const testRunner = fuzzy(fuzzy.ObjArg(anyValidOptions));

        testRunner(function (options) {
            if (options.valid) {
                return;
            }
            expect(() => new cro.ibc.MsgUpdateClient(options.value)).to.throw(
                'Expected `options` to be of type `object`',
            );
        });
    });

    it('Test MsgUpdateClient conversion', function () {
        const MsgUpdateClient = new cro.ibc.MsgUpdateClient({
            signer: 'tcro15sfupd26sp6qf37ll5q6xuf330k7df9tnvrqht',
            clientId: 'clientId',
            header: null,
        });

        const rawMsg: Msg = {
            typeUrl: COSMOS_MSG_TYPEURL.ibc.MsgUpdateClient,
            value: {
                signer: 'tcro15sfupd26sp6qf37ll5q6xuf330k7df9tnvrqht',
                clientId: 'clientId',
                header: null,
            },
        };

        expect(MsgUpdateClient.toRawMsg()).to.eqls(rawMsg);
    });

    it('Test appendTxBody MsgUpdateClient Tx signing', function () {
        const anyKeyPair = Secp256k1KeyPair.fromPrivKey(
            Bytes.fromHexString('66633d18513bec30dd11a209f1ceb1787aa9e2069d5d47e590174dc9665102b3'),
        );

        const MsgUpdateClient = new cro.ibc.MsgUpdateClient({
            signer: 'tcro15sfupd26sp6qf37ll5q6xuf330k7df9tnvrqht',
            header: google.protobuf.Any.create({
                type_url: '/some.valid.type.url',
                value: new Uint8Array([1, 2, 35, 5]),
            }),
            clientId: 'clientId',
        });

        const anySigner = {
            publicKey: anyKeyPair.getPubKey(),
            accountNumber: new Big(0),
            accountSequence: new Big(2),
        };

        const rawTx = new cro.RawTransaction();

        const signableTx = rawTx.appendMessage(MsgUpdateClient).addSigner(anySigner).toSignable();

        const signedTx = signableTx.setSignature(0, anyKeyPair.sign(signableTx.toSignDocumentHash(0))).toSigned();

        const signedTxHex = signedTx.encode().toHexString();
        expect(signedTxHex).to.be.eql(
            '0a7e0a7c0a232f6962632e636f72652e636c69656e742e76312e4d7367557064617465436c69656e7412550a08636c69656e744964121c0a142f736f6d652e76616c69642e747970652e75726c1204010223051a2b7463726f313573667570643236737036716633376c6c3571367875663333306b37646639746e767271687412580a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2103fd0d560b6c4aa1ca16721d039a192867c3457e19dad553edb98e7ba88b159c2712040a0208011802120410c09a0c1a40a3e29655c317f80832e34c978220cbd8d9f38a80353228b6d3b2db4a3d7eafe5717f449fa2ab5afacb0531ca63afb55b9088571248cf07876896595459487cd2',
        );
    });

    it('Should validate MsgUpdateClient provided addresses with network config', function () {
        const params1 = {
            signer: 'cosmos1vw4ucaeagtduv5ep4sa95e3aqzqpsk5meda08c',
            clientId: 'clientId',
        };

        expect(() => new cro.ibc.MsgUpdateClient(params1)).to.throw(
            'Provided `signer` does not match network selected',
        );
    });

    it('Should throw on getting toRawAminoMsg()', function () {
        const MsgUpdateClient = new cro.ibc.MsgUpdateClient({
            signer: 'tcro15sfupd26sp6qf37ll5q6xuf330k7df9tnvrqht',
            clientId: 'clientId',
        });

        expect(() => MsgUpdateClient.toRawAminoMsg()).to.throw('IBC Module not supported under amino encoding scheme');
    });
});
