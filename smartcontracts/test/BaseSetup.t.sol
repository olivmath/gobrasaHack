// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BTGIssuer} from "../src/BTGIssuer.sol";
import {Utils} from "./Utils.t.sol";

contract BaseSetup is Utils {
    BTGIssuer btgIssuer;

    address[] _users;
    address btg;
    address alice;
    address bob;
    address zero;

    function setUp() public virtual {
        _users = createUsers(3);

        btg = _users[0];
        alice = _users[1];
        bob = _users[2];
        zero = address(0x0);

        vm.label(btg, "BTG");
        vm.label(alice, "ALICE");
        vm.label(bob, "BOB");
        vm.label(zero, "ZERO");

        vm.startPrank(btg);
        btgIssuer = new BTGIssuer();

        // 2. distruting yield to holders
        // payHolders()

        // 3. recue of tokens in expiration time
        // rescueTokens()

        // 4. burn tokens
        // burnHolders()
    }

    function test_basesetup_just_for_pass_in_converage() public {}
}
