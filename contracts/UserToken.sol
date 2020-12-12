
// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.6.0;

// modules
import "./ERC725.sol";

/**
 * @title UserToken bundle
 * @dev Bundles ERC725X and ERC725Y together into one smart contract called ERC725
 *
 *  @author AMT
 */
contract UserToken is ERC725 {
    
    string name;
    string dob;
    string gender;
    uint256 contact_no;
    string email;
    address wallet;
    string blood_group;
    string city;
    string state;
    string photoHash;
    string ltHash;
    string rtHash;
    string leHash;
    string reHash;

    
    constructor(
        address _wallet,
        string memory _name,
        string memory _dob,
        string memory _gender,
        uint256 _contact_no,
        string memory _email,
        string memory _blood_group
    ) 
        ERC725(_wallet)  
        public
    {
        wallet = _wallet;
        name = _name;
        dob =  _dob;
        gender = _gender;
        contact_no = _contact_no;
        email = _email;
        blood_group = _blood_group;
    }
    
    modifier isOwner() {
        require(msg.sender == wallet, "Access is not allowed");
        _;
    }
    
    function setFileDetails(
        string memory _city,
        string memory _state,
        string memory _photoHash,
        string memory _ltHash,
        string memory _rtHash,
        string memory _leHash,
        string memory _reHash
    )
        public
    {
        city = _city;
        state = _state;
        photoHash = _photoHash;
        ltHash = _ltHash;
        rtHash = _rtHash;
        leHash = _leHash;
        reHash = _reHash;
    }
    
    function setDetails(
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
        public 
        isOwner
    {
        name = _name;
        dob =  _dob;
        gender = _gender;
        contact_no = _contact_no;
        email = _email;
        blood_group = _blood_group;
        city = _city;
        state = _state;
        photoHash = _photoHash;
        ltHash = _ltHash;
        rtHash = _rtHash;
        leHash = _leHash;
        reHash = _reHash;
    }

    function getuserDetails()
        public 
        view 
        returns(
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        return(
            name,
            dob,
            gender,
            contact_no,
            email,
            blood_group,
            city
        );
    }
    
    function getUserfileDetails() 
        public 
        view 
        returns(
            string memory,  
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return(
            state,
            photoHash,
            ltHash,
            rtHash,
            leHash,
            reHash
        );
    }
    
}
