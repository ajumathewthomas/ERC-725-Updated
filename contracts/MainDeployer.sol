// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.6.0;

import "./UserToken.sol";

/**
 * @title MainDeployer bundle
 *
 *  @author AMT
 */
contract MainDeployer {
    
    mapping(address => address) public userTokenMapping;

    constructor () public {}
    
    function createUserToken(
        string memory _name,
        string memory _dob,
        string memory _gender,
        uint256 _contact_no,
        string memory _email,
        string memory _blood_group,
        string memory _city,
        string memory _state,
        string memory _photoHash,
        string memory _ltHash,
        string memory _rtHash,
        string memory _leHash,
        string memory _reHash
    ) 
        external 
    {
        UserToken userToken = new UserToken(
            msg.sender,
            _name,
            _dob,
            _gender,
            _contact_no,
            _email,
            _blood_group
        );
        
        userToken.setFileDetails(
            _city,
            _state,
            _photoHash,
            _ltHash,
            _rtHash,
            _leHash,
            _reHash
        );
        
        userTokenMapping[msg.sender] = address(userToken);
    }
    
    function getUserTokenAddr() public view returns(address) {
        return userTokenMapping[msg.sender];
    }
}