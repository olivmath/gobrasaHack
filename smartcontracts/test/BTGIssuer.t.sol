// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "./BaseSetup.t.sol";
import {DCCToken} from "../src/DCCToken.sol";

contract BTGIssuerTest is BaseSetup {
    DCCToken dcc;
    string name;
    uint256 oneMilion;
    uint256 interestRate17percent;
    string symbol;
    string descriptionOfDCC;
    string dccIpfsLink;

    function setUp() public override {
        BaseSetup.setUp();
        descriptionOfDCC = "Dividas de cartoes de credito de bons pagadores";
        dccIpfsLink = "http://contract-of-dcc.docs";
        interestRate17percent = 17;
        oneMilion = 1_000_000;
        name = "Nova divida";
        symbol = "AAA";
    }

    function test_create_new_token() public {
        address dccAddress = btgIssuer.createDCC(
            name,
            dccIpfsLink,
            symbol,
            descriptionOfDCC,
            interestRate17percent,
            oneMilion
        );

        dcc = DCCToken(dccAddress);
    }
}
